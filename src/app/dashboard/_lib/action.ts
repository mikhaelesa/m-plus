"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  const cookieStore = await cookies();

  // Karena cookie bernama "auth_token", kita hapus menggunakan nama yang sama
  cookieStore.delete("auth_token");

  return { success: true };
}
