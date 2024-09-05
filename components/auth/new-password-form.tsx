"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { NewPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CardWrapper } from "./card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newPassword } from "@/actions/new-password";

// interface LoginResponse { // Change 1: Define LoginResponse interface
//   error?: string;
//   success?: string;
// }

export const NewPasswordForm = () => {
  const seachParams = useSearchParams();
  const token = seachParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token)
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
      headerLabel="Enter your new password"
      headerDescription="This will replace your current password."
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your new password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="••••••"
                      type="password"
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
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}