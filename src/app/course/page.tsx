"use client";

import Link from "next/link";
import { PageTitle } from "@/components/AppShell";
import { useStudent } from "@/components/StudentProvider";
import { useStudySession } from "@/components/useStudySession";
import { UNITS, LESSON_BY_ID } from "@/lib/content";
import { lessonCompletionFrom } from "@/lib/mastery";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gateStartUrl, isPublicLessonId } from "@/lib/gate";

export default function CoursePage() {
  const { state } = useStudent();
  const session = useStudySession();
  return (
    <div>
      <PageTitle kicker="What is open" title="Two public lessons. The rest of the map is still being written.">
        Limit versus function value, then FTC accumulation — those two work without an account.
        Later units stay behind the study gate. This is not a finished eight-unit product.
      </PageTitle>
      <ol className="space-y-4">
        {UNITS.map((unit) => {
          const publicInUnit = unit.lessonIds.filter((id) => isPublicLessonId(id));
          const unpublished = !session && publicInUnit.length === 0;
          return (
            <li key={unit.id} className="rounded-xl border bg-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold text-primary">
                  {unpublished ? (
                    <span>
                      {unit.number === "F" ? "Foundation" : `Unit ${unit.number}`}: {unit.title}
                    </span>
                  ) : (
                    <Link href={`/course/${unit.id}`} className="underline-offset-2 hover:underline">
                      {unit.number === "F" ? "Foundation" : `Unit ${unit.number}`}: {unit.title}
                    </Link>
                  )}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {unpublished ? "Still being written · after two lessons" : `MCQ weight ${unit.mcqWeight}`}
                </p>
              </div>
              <p className="mt-2 text-sm">{unit.overview}</p>
              {unpublished ? (
                <p className="mt-3 text-sm">
                  Not published for Wave A. After the two public lessons,{" "}
                  <a href={gateStartUrl(unit.id)} className="text-primary underline-offset-2 hover:underline">
                    continue at the study gate
                  </a>
                  .
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {unit.lessonIds.map((id) => {
                    const lesson = LESSON_BY_ID[id];
                    if (!lesson) return null;
                    const open = session || isPublicLessonId(id);
                    const completion = lessonCompletionFrom(state, id, lesson.skillIds);
                    return (
                      <li key={id} className="rounded-md border p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          {open ? (
                            <Link href={`/lesson/${id}`} className="font-medium hover:underline">
                              {lesson.title}
                            </Link>
                          ) : (
                            <span className="font-medium">{lesson.title}</span>
                          )}
                          <span
                            className={cn(
                              "text-xs",
                              completion === "independently_demonstrated" || completion === "retained"
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          >
                            {open ? `completion: ${completion.replaceAll("_", " ")}` : "after two lessons"}
                          </span>
                        </div>
                        {open && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Link href={`/lesson/${id}`} className={buttonVariants({ size: "sm" })}>
                              Open lesson
                            </Link>
                            {session && (
                              <Link
                                href={`/practice?mode=challenge&lesson=${id}`}
                                className={buttonVariants({ size: "sm", variant: "outline" })}
                              >
                                Challenge check
                              </Link>
                            )}
                          </div>
                        )}
                        {!open && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            <a href={gateStartUrl(unit.id)} className="text-primary underline-offset-2 hover:underline">
                              Continue at the study gate
                            </a>
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
