import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, isPublicPath, studyStartUrl, unitFromPath } from "@/lib/gate";

/**
 * After the two public lessons, remaining units, mocks, FRQ, and practice
 * require the study session cookie. Unauthenticated hits go to study /start.
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  if (session && session !== "0") {
    return NextResponse.next();
  }

  const unit = unitFromPath(pathname);
  return NextResponse.redirect(studyStartUrl({ unit }));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
