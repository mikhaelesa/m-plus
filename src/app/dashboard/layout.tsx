import type { PropsWithChildren } from "react";
import DashboardShell from "@/app/dashboard/_components/DashboardShell";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return <DashboardShell>{children}</DashboardShell>;
};

export default DashboardLayout;
