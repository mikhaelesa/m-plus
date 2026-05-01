"use client";

import { createContext, type PropsWithChildren, useContext } from "react";
import type { UserRole } from "@/types/auth";

const RoleContext = createContext<UserRole | null>(null);

interface RoleProviderProps extends PropsWithChildren {
  role?: UserRole | null;
}

export const RoleProvider = ({ role, children }: RoleProviderProps) => {
  return (
    <RoleContext.Provider value={role ?? null}>{children}</RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
