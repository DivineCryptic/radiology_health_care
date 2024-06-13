import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log(request.url)
  const path = request.nextUrl.pathname;

  const isRootPath = path === "/";

  const isPublicPath = path === "/auth";
  const isTokenPresent = request.cookies.has("authToken");
  const token = request.cookies.get("authToken")?.value || "";

  if (isPublicPath && token) {
    //add the ranks path to show up after isPublic path and token is present

    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }
  if (isRootPath && !isTokenPresent) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }
  if (isRootPath && isTokenPresent) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/dashboard/:path*",
    "/ranks/:path*",
    "/services/:path*",
    "/units/:path*",
    "/employees/:path*",
    "/equipment-mappings/:path*",
    "/equipments/:path*",
    "/patient-tests/:path*",
    "/patients/:path*",
    "/rooms/:path*",
    "/test-categories/:path*",
  ],
};
