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
        },
      ],
    },
  ],
  footerGroup: {
    items: [],
  },
};
