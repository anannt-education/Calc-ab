import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  gateStartUrl,
  hasSessionCookie,
  isPublicPath,
  unitFromPath,
} from "@/lib/gate";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }
  if (hasSessionCookie((name) => request.cookies.get(name)?.value)) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }
  return NextResponse.redirect(gateStartUrl(unitFromPath(pathname)));
}

export const config = {
  matcher: [
    "/practice/:path*",
    "/frq/:path*",
    "/mock/:path*",
    "/home/:path*",
    "/progress/:path*",
    "/mistakes/:path*",
    "/ask/:path*",
    "/cms/:path*",
    "/mentor/:path*",
    "/course/:path+",
    "/lesson/:path+",
  ],
};
