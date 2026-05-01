import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";
import { RoleProvider } from "@/providers/RoleProvider";
import { AuthService } from "@/services/auth";
import type { UserRole } from "@/types/auth";
import { DashboardShell } from "./_components/DashboardShell";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const token = (await cookies()).get("auth_token")?.value;
  const payload = token ? await AuthService.verifyToken(token) : null;

  return (
    <RoleProvider role={payload?.role as UserRole}>
      <DashboardShell>{children}</DashboardShell>
    </RoleProvider>
  );
};

export default DashboardLayout;
