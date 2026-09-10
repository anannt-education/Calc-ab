"use client";

import Link from "next/link";
import { PageTitle } from "@/components/AppShell";
import { useStudent } from "@/components/StudentProvider";
import { UNITS, LESSON_BY_ID, SKILL_BY_ID } from "@/lib/content";
import { lessonCompletionFrom } from "@/lib/mastery";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CoursePage() {
  const { state } = useStudent();
  return (
    <div>
      <PageTitle kicker="Course map" title="Eight AP units plus a foundation bridge">
        MCQ weights are official ranges for the multiple-choice section, not lesson time. Completion
        (opened, studied, practised) is not mastery. Independent demonstration and retention are
        separate. Challenge checks let you skip instruction, not independent evidence. Each unit page
        is written so the idea is visible before you log any attempts.
      </PageTitle>
      <ol className="space-y-4">
        {UNITS.map((unit) => (
          <li key={unit.id} className="rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold text-primary">
                <Link href={`/course/${unit.id}`} className="underline-offset-2 hover:underline">
                  {unit.number === "F" ? "Foundation" : `Unit ${unit.number}`}: {unit.title}
                </Link>
              </h2>
              <p className="text-xs text-muted-foreground">MCQ weight {unit.mcqWeight}</p>
            </div>
            <p className="mt-2 text-sm">{unit.overview}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Signature activity: {unit.signatureActivity}
            </p>
            <ul className="mt-3 space-y-2">
              {unit.lessonIds.map((id) => {
                const lesson = LESSON_BY_ID[id];
                if (!lesson) return null;
                const completion = lessonCompletionFrom(state, id, lesson.skillIds);
                const missing = lesson.prerequisites.filter((p) => {
                  const m = state.mastery[p];
                  return !m || m.state === "unknown";
                });
                return (
                  <li key={id} className="rounded-md border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Link href={`/lesson/${id}`} className="font-medium hover:underline">
                        {lesson.title}
                      </Link>
                      <span className={cn("text-xs", completion === "independently_demonstrated" || completion === "retained" ? "text-primary" : "text-muted-foreground")}>
                        completion: {completion.replaceAll("_", " ")}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Mastery of skills:{" "}
                      {lesson.skillIds
                        .map((s) => `${SKILL_BY_ID[s]?.title}: ${state.mastery[s]?.state ?? "unknown"}`)
                        .join(" · ")}
                    </p>
                    {missing.length > 0 && (
                      <p className="mt-1 text-xs text-amber-foreground">
                        Before this lesson I would usually check{" "}
                        {missing.map((p) => SKILL_BY_ID[p]?.title ?? p).join(", ")}. Evidence is still
                        insufficient there. You may still open the lesson.
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Link href={`/lesson/${id}`} className={buttonVariants({ size: "sm" })}>
                        Open lesson
                      </Link>
                      <Link
                        href={`/practice?mode=challenge&lesson=${id}`}
                        className={buttonVariants({ size: "sm", variant: "outline" })}
                      >
                        Challenge check
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
