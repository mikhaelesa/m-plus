"use server";

import { cookies } from "next/headers";
import type { z } from "zod";
import { USERS } from "@/constants/users";
import { AuthService } from "@/services/auth";
import { loginSchema } from "./schema";

export type LoginDTO = z.infer<typeof loginSchema>;

export async function loginAction(data: LoginDTO) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Data yang dikirim tidak valid" };
  }

  const { email, password } = parsed.data;

  const user = USERS.find((u) => u.email === email);
  if (!user || user.password !== password) {
    return { error: "Email atau password salah" };
  }

  const token = await AuthService.generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 2,
  });

  return { success: true };
}
