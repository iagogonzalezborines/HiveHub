import { getCurrentUser } from '@/lib/appwrite/api'
import { IUser } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',  
    imageUrl: '',
    bio: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isAuthenticated: false,
    isLoading: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({children}: {children: React.ReactNode}) => { 
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const checkAuthUser =  async () => {
        try {
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser({
                    id: currentAccount.id,
                    name: currentAccount.name,
                    email: currentAccount.email,
                    username: currentAccount.username,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                });
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (
            localStorage.getItem('cookieFallBack') === '[]' ||
            localStorage.getItem('cookieFallBack') === null
        ) {
            navigate('/sign-in');
        } else {
            checkAuthUser();    
        }
    }, [navigate]);

    const value = {
        user, 
        setUser: () => {},
        isLoading,
        isAuthenticated,
        setIsAuthenticated: () => {}, // Update the type of setIsAuthenticated to match the expected type
        checkAuthUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
