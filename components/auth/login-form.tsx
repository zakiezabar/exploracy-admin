"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CardWrapper } from "./card-wrapper"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import Link from "next/link";

interface LoginResponse { // Change 1: Define LoginResponse interface
  error?: string;
  success?: string;
}

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "This account is already in use with different provider."
    : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        })
        // .then((data: LoginResponse) => { // Change 2: Add type annotation for data
        //   if (data.error) { // Change 3: Check if data.error exists
        //     setError(data.error);
        //     setSuccess(""); // Change 4: Clear success if there's an error
        //   } else {
        //     setSuccess(data.success);
        //     setError(""); // Change 5: Clear error if login is successful
        //   }
        // })
        // .catch((err) => {
        //   setError("An unexpected error occurred.");
        //   setSuccess(""); // Change 6: Clear success if there's an unexpected error
        //   console.error(err);
        // });
    });
  };

  return (
    <CardWrapper
      headerLabel="Please login to access to the dashboard."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="yourname@exploracy.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="••••••••"
                      type="password"
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/reset">
                      Forgot password?
                    </Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <FormError message={error || urlError}/>
          <FormSuccess message={success}/>
          <Button 
            disabled={isPending}
            type="submit"
            className="w-full"
            variant="primary"
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}