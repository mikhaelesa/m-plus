import { UserRole } from "@/types/auth";
import { PATHS } from "./paths";

export const SIDEBAR_DATA = {
  navGroups: [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          href: PATHS.dashboard,
        },
        {
          label: "Vehicle Makes",
          href: PATHS.vehicleMakes,
          allowedRoles: [UserRole.ADMIN],
        },
        {
          label: "WMI",
          href: PATHS.wmi,
          allowedRoles: [UserRole.ADMIN],
        },
      ],
    },
  ],
  footerGroup: {
    items: [],
  },
};
