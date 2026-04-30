import type { PropsWithChildren } from "react";
import DashboardShell from "./components/DashboardShell";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return <DashboardShell>{children}</DashboardShell>;
};

export default DashboardLayout;
