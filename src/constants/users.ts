import { UserRole } from "@/types/auth";

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
