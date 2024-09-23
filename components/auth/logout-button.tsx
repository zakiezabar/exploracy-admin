"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
  const onClick = () => {
    signOut();
  };

  return (
    <Button variant="ghost" onClick={onClick} className="w-full rounded-lg normal-case text-xl gap-2 justify-start">{children}</Button>
  );
};