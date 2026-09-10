"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStudent } from "@/components/StudentProvider";

/** Students with a completed diagnostic continue to Home; crawlers still receive the landing HTML. */
export function RedirectIfOnboarded() {
  const { ready, state } = useStudent();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (state.profile?.diagnosticCompleted) router.replace("/home");
  }, [ready, router, state.profile?.diagnosticCompleted]);

  return null;
}
