import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AuthService } from "@/lib/auth";
import { PATHS } from "./constants/paths";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const payload = token ? await AuthService.verifyToken(token) : null;

  if (pathname.startsWith(PATHS.dashboard) && !payload) {
    const loginUrl = new URL(PATHS.login, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith(PATHS.login) && payload) {
    return NextResponse.redirect(new URL(PATHS.dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
