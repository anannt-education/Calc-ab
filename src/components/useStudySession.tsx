"use client";

import { useEffect, useState } from "react";
import { hasSessionCookie } from "@/lib/gate";

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const parts = document.cookie.split("; ");
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq) === name) return decodeURIComponent(part.slice(eq + 1));
  }
  return undefined;
}

/** `null` until cookies are read on the client. */
export function useStudySession(): boolean | null {
  const [gated, setGated] = useState<boolean | null>(null);
  useEffect(() => {
    setGated(hasSessionCookie(readCookie));
  }, []);
  return gated;
}
