import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Format email tidak valid" }),
  password: z.string().min(1, { message: "Password wajib diisi" }),
});

export type LoginDTO = z.infer<typeof loginSchema>;
