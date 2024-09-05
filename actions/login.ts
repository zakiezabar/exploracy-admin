"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import bcrypt from "bcryptjs";
// import { PrismaClient } from "@prisma/client";
import { generateVerificationToken } from "@/lib/tokens";
import { get } from "http";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

// const prisma = new PrismaClient();

// interface LoginResponse { // Change 1: Define LoginResponse interface
//   error?: string;
//   success?: string;
// }

export const login = async (values: z.infer<typeof LoginSchema>) => {
  
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.role !== "ADMIN") {
    return { error: "Unauthorized!" };
  }

  try {
    // const user = await prisma.user.findUnique({
    //   where: { email },
    // });

    // if (!user || !user.hashedPassword) {
    //   return { error: "Invalid credentials!" };
    // }

    // const isMatch = bcrypt.compareSync(password, user.hashedPassword);

    // if (!isMatch) {
    //   return { error: "Invalid credentials!" };
    // }

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login successful" };

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!"}
        default:
          return { error: "Something went wrong!"}
      }
    }

    throw error;
    // return { error: "An unexpected error occurred." }; // Change 9: Ensure consistent return type for unexpected errors
  }
};