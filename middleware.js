import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

function isDashboardAuthEnabled() {
  const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "";

  return Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && authSecret
  );
}

export async function middleware(request) {
  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  if (request.nextUrl.searchParams.get("preview") === "1" || !isDashboardAuthEnabled()) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET
  });

  if (token) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  loginUrl.searchParams.set("callbackUrl", callbackUrl);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
