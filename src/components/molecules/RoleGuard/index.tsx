"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { useRole } from "@/providers/RoleProvider";
import type { UserRole } from "@/types/auth";

interface RoleGuardProps extends PropsWithChildren {
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

export const RoleGuard = ({
  allowedRoles,
  children,
  fallback = null,
}: RoleGuardProps) => {
  const role = useRole();

  if (!role || !allowedRoles.includes(role)) return fallback;
  return children;
};
