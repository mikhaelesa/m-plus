import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PATHS } from "@/constants/paths";
import { LoginForm } from "./_components/LoginForm";

export default async function LoginPage() {
  const token = (await cookies()).get("auth_token")?.value;

  if (token) redirect(PATHS.dashboard);

  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
