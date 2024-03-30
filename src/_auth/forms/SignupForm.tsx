import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form";
import { SignupValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";

function SignupForm() {
  const { toast } = useToast();

  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } = useCreateUserAccount();

  const { mutateAsync: signInAccount, isLoading: isSigningIn } = useSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "Sign up failed. Please try again",
      });
    }
    const session = await signInAccount({ 
      email: values.email,
      password: values.password,
    })

    if(!session){
      return toast({
        title: "Sign in failed. Please try again",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full mt-4"
      >
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo2.svg" alt="logo" />
          <h2 className="h3-bold md:h2-bold sm:pt-12 pt-3">
            Create a new account
          </h2>
          <p className="text-yellow-500 small-medioum md:base-regular mt-12">
            To use Hivehub, please enter your details
          </p>

          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormItem>
          <Button
            type="submit"
            className="shad-button_primary h-9 p-5 m-3 w-48"
          >
            {isCreatingUser ? (
              <div className="flex center gap-2">
                <Loader />
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="small-medioum md:base-regular">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-yellow-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default SignupForm;
