"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PATHS } from "@/constants/paths";

export const NavbarBreadcrumb = ({ pathname }: { pathname: string }) => {
  const breadcrumbMap = new Map<string, string>([
    [PATHS.dashboard, "Dashboard"],
    [PATHS.vehicleMakes, "Vehicle Makes"],
    [PATHS.wmi, "WMI"],
  ]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink>Overview</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{breadcrumbMap.get(pathname)}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
