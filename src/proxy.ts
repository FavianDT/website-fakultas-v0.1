import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { listUsers } from "@/lib/services/master";
import type { UserRole } from "@/types/auth";

const SESSION_COOKIE_NAME = "uninus_session";

function matchesRoute(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`);
}

function getDashboardPath(role: UserRole): string {
  switch (role) {
    case "student":
      return "/dashboard/student";
    case "tendik":
      return "/dashboard/staff";
    case "prodi":
      return "/dashboard/executive/prodi";
    case "fakultas":
      return "/dashboard/executive/fakultas";
  }
}

function canAccessDashboard(pathname: string, role: UserRole): boolean {
  if (matchesRoute(pathname, "/dashboard/student")) {
    return role === "student";
  }

  if (matchesRoute(pathname, "/dashboard/staff")) {
    return role === "tendik";
  }

  if (matchesRoute(pathname, "/dashboard/executive/prodi")) {
    return role === "prodi";
  }

  if (matchesRoute(pathname, "/dashboard/executive/fakultas")) {
    return role === "fakultas";
  }

  if (
    pathname === "/dashboard/executive" ||
    matchesRoute(pathname, "/dashboard/executive/audit-log")
  ) {
    return role === "prodi" || role === "fakultas";
  }

  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieUserId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user =
    process.env.NODE_ENV === "production"
      ? undefined
      : cookieUserId
        ? (await listUsers()).find((candidate) => candidate.id === cookieUserId)
        : undefined;

  if (!user) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  }

  if (!canAccessDashboard(pathname, user.role)) {
    return NextResponse.redirect(
      new URL(getDashboardPath(user.role), request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
