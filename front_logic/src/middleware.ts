import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log(request.url)
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/auth";
  const token = request.cookies.get("authToken")?.value || "";

  if (isPublicPath && token) {
    //add the ranks path to show up after isPublic path and token is present

    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/signin", "/dashboard/:path*" , "/ranks/:path*"],
};
