import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";

export default async function LoginPage() {
  const token = (await cookies()).get("auth_token")?.value;

  if (token) redirect("/dashboard");

  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
