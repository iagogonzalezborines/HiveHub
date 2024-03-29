
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form";
import { SignupValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import{ Link }from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";

function SignupForm() {
  const isLoading = false;
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
   if(!newUser){
    return;
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
          <Button type="submit" className="shad-button_primary h-9 p-5 m-3 w-48">
            {isLoading ? (
              <div className="flex center gap-2"><Loader/></div>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="small-medioum md:base-regular">
            Already have an account?{" "}
            <Link to='/sign-in' className='text-yellow-500 text-small-semibold ml-1'>Log in</Link>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default SignupForm;
