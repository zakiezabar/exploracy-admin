"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";

// interface LoginResponse { // Change 1: Define LoginResponse interface
//   error?: string;
//   success?: string;
// }

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        })
        // .then((data: resetResponse) => { // Change 2: Add type annotation for data
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
      showLogo
      headerLabel="Hey 👋 did you forgot your password?"
      headerDescription="No worries, we got you covered. Just enter your email and password to login."
      backButtonLabel="Back to Login"
      backButtonHref="/login"
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
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button 
            disabled={isPending}
            type="submit"
            className="w-full"
            variant="primary"
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}