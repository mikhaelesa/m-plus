import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AuthService } from "@/services/auth";
import { PATHS } from "./constants/paths";
import { RBAC_RULES } from "./constants/users";
import type { UserRole } from "./types/auth";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;
  const payload = token ? await AuthService.verifyToken(token) : null;

  if (!payload && pathname !== PATHS.login && pathname !== PATHS.landingPage)
    return NextResponse.redirect(new URL(PATHS.login, request.url));

  if (payload && pathname.startsWith(PATHS.login))
    return NextResponse.redirect(new URL(PATHS.dashboard, request.url));

  const matchedRule = RBAC_RULES.find((rule) => pathname.startsWith(rule.path));
  if (
    payload &&
    matchedRule &&
    !matchedRule.allowedRoles.includes(payload.role as UserRole)
  )
    return NextResponse.redirect(new URL(PATHS.dashboard, request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)",
  ],
};
