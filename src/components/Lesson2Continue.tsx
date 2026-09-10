"use client";

import { useStudent } from "@/components/StudentProvider";
import { buttonVariants } from "@/components/ui/button";
import { LESSON_2_ID, studyStartUrl } from "@/lib/gate";
import { cn } from "@/lib/utils";

export function Lesson2Continue() {
  const { log, markLesson } = useStudent();

  function finish() {
    markLesson(LESSON_2_ID, "studied");
    log("lesson2_complete", { lessonId: LESSON_2_ID });
    window.location.assign(studyStartUrl({ unit: "u6" }));
  }

  return (
    <section className="mt-10 rounded-2xl border border-rule bg-paper-soft p-5">
      <h2 className="font-[family-name:var(--font-playfair)] text-xl text-ink">After this lesson</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Stay honest with the independent check if you can. When you are done — stuck or not — tell us
        where you are. Parent WhatsApp is required on the next page. Under 13: a parent should finish
        that form.
      </p>
      <button type="button" className={cn(buttonVariants(), "mt-4 bg-ink text-paper hover:bg-navy")} onClick={finish}>
        I’ve finished lesson 2
      </button>
    </section>
  );
}
