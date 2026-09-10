import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  hasSessionCookieValue,
  isPublicLessonId,
  isPublicPath,
  studyStartUrl,
  unitFromPathname,
} from "@/lib/gate";

function hasSession(request: NextRequest): boolean {
  return hasSessionCookieValue((name) => request.cookies.get(name)?.value);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (hasSession(request)) {
    return NextResponse.next();
  }

  const lesson = pathname.match(/^\/lesson\/([^/]+)$/);
  if (lesson && isPublicLessonId(lesson[1])) {
    return NextResponse.next();
  }

  const unit = unitFromPathname(pathname);
  const intent = pathname.startsWith("/course/") ? "waitlist" : undefined;
  return NextResponse.redirect(studyStartUrl({ unit, intent }));
}

export const config = {
  matcher: [
    "/practice",
    "/practice/:path*",
    "/frq",
    "/frq/:path*",
    "/mock",
    "/mock/:path*",
    "/home",
    "/home/:path*",
    "/progress",
    "/progress/:path*",
    "/ask",
    "/ask/:path*",
    "/mistakes",
    "/mistakes/:path*",
    "/cms",
    "/cms/:path*",
    "/mentor",
    "/mentor/:path*",
    "/lesson/:path*",
  ],
};
