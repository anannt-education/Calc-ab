import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPublicLessonId, SESSION_COOKIE, studyGateUrl, unitFromPathname } from "@/lib/gate";

/**
 * Gate lesson 3+, practice, FRQ, mocks, mentor, progress, and the student home
 * unless the study session cookie is present. Public lessons pass through.
 */
export function proxy(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/lesson/")) {
    const id = pathname.slice("/lesson/".length).split("/")[0] ?? "";
    if (isPublicLessonId(id)) return NextResponse.next();
  }

  return NextResponse.redirect(studyGateUrl(unitFromPathname(pathname)));
}

export const config = {
  matcher: [
    "/practice",
    "/practice/:path*",
    "/frq",
    "/frq/:path*",
    "/mock",
    "/mock/:path*",
    "/mentor",
    "/mentor/:path*",
    "/progress",
    "/progress/:path*",
    "/home",
    "/home/:path*",
    "/mistakes",
    "/mistakes/:path*",
    "/cms",
    "/cms/:path*",
    "/lesson/:path*",
  ],
};
