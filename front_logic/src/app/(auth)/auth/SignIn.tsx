"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SignedInUser } from "@/server_actions/(auth)/signIn";
import { signInForm } from "@/inferedTypes";
import { signInSchema } from "@/formSchemas";
import { useFormStatus } from "react-dom";

const SignIn = () => {
  const router = useRouter();

  const form = useForm<signInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const handleSubmit = async (values: signInForm) => {
    try {
      const date = new Date();
      const dateString = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      localStorage.setItem("CurrentDate", dateString);
      localStorage.setItem("username", values.username);
      localStorage.setItem("password", values.password);

      await SignedInUser(values);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-lg mx-auto space-y-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Remember me</FormLabel>
                  <FormControl>
                    <input type="checkbox" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          /> */}
          <Btn />
        </form>
      </Form>
    </main>
  );
};

export default SignIn;
const Btn = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full mt-4" disabled={pending} type="submit">
      {pending ? "Signing In" : "Sign In"}
    </Button>
  );
};
