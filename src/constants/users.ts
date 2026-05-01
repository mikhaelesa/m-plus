import { UserRole } from "@/types/auth";
import { PATHS } from "./paths";

export const USERS = [
  {
    id: "1",
    email: "admin@mail.com",
    password: "password123",
    name: "Admin",
    role: UserRole.ADMIN,
  },
  {
    id: "2",
    email: "user@mail.com",
    password: "password123",
    name: "Regular User",
    role: UserRole.USER,
  },
];

export const RBAC_RULES = [
  { path: PATHS.wmi, allowedRoles: [UserRole.ADMIN] },
  { path: PATHS.vehicleMakes, allowedRoles: [UserRole.ADMIN] },
  { path: PATHS.dashboard, allowedRoles: [UserRole.ADMIN, UserRole.USER] },
];
