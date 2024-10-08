"use client";

import { useCurrentRole } from "@/hooks/use-current-role";

import { Role } from "@prisma/client";
import { FormError } from "@/components/form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export const RoleGate = ({
  children,
  allowedRole,
}: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You are not authorized to view this page." />
    )
  }

  return (
    <>
      {children}
    </>
  );
};
