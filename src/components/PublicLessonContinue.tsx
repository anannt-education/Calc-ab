"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LESSON_1_ID, LESSON_2_ID, goToGate } from "@/lib/gate";
import { useStudent } from "@/components/StudentProvider";
import { useStudySession } from "@/components/useStudySession";

export function PublicLessonContinue({ id }: { id: string }) {
  const { state, log } = useStudent();
  const session = useStudySession();
  const progress = state.lessonProgress[id];
  const fired = useRef(false);

  const studied =
    progress?.completion === "studied" ||
    progress?.completion === "practised" ||
    progress?.completion === "independently_demonstrated" ||
    progress?.completion === "retained";
  const independent = progress?.completion === "independently_demonstrated" || progress?.completion === "retained";

  useEffect(() => {
    if (session !== false) return;
    if (id !== LESSON_2_ID) return;
    if (!independent || fired.current) return;
    fired.current = true;
    log("lesson2_complete", { lessonId: id });
    goToGate("u6");
  }, [id, independent, log, session]);

  if (id === LESSON_1_ID) {
    return (
      <p className="mt-8 rounded-xl border p-4 text-sm">
        When you have been honest with the check, continue to{" "}
        <Link href={`/lesson/${LESSON_2_ID}`} className="text-primary underline-offset-2 hover:underline">
          lesson 2 — FTC accumulation
        </Link>
        . No account yet.
      </p>
    );
  }

  if (id !== LESSON_2_ID || session) return null;

  return (
    <div className="mt-8 rounded-xl border p-4">
      <p className="text-sm">
        After this second lesson, the study desk asks for your email and a parent WhatsApp. That
        form lives on study.anannt.ae — we do not collect payment here.
      </p>
      {studied && (
        <button
          type="button"
          className={buttonVariants({ className: "mt-3" })}
          onClick={() => {
            log("lesson2_complete", { lessonId: id });
            goToGate("u6");
          }}
        >
          Two lessons done — continue at the study gate
        </button>
      )}
    </div>
  );
}
