"use client";

import Link from "next/link";
import { PageTitle } from "@/components/AppShell";
import { useStudent } from "@/components/StudentProvider";
import { UNITS, LESSON_BY_ID } from "@/lib/content";
import { isPublicLessonId, isPublicUnitId, studyStartUrl } from "@/lib/gate";
import { lessonCompletionFrom } from "@/lib/mastery";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CoursePage() {
  const { state } = useStudent();
  return (
    <div>
      <PageTitle kicker="Course map" title="Two open lessons. The rest is still being written.">
        Calculus AB for May 2027. Lesson 1 and lesson 2 are public. Later units are unpublished —
        they send you to a waitlist, not a missing page. This is not a complete eight-unit studio
        yet.
      </PageTitle>
      <ol className="space-y-4">
        {UNITS.map((unit) => {
          const openUnit = isPublicUnitId(String(unit.id));
          return (
            <li key={unit.id} className="rounded-xl border bg-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold text-primary">
                  {unit.number === "F" ? "Foundation" : `Unit ${unit.number}`}: {unit.title}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {openUnit ? "Public lessons inside" : "Unpublished"}
                </p>
              </div>
              <p className="mt-2 text-sm">{unit.overview}</p>
              {!openUnit ? (
                <p className="mt-3 text-sm">
                  This unit is not published yet.{" "}
                  <a
                    href={studyStartUrl({ unit: String(unit.id), intent: "waitlist" })}
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    Ask to be told when lesson 1 in this unit is ready
                  </a>
                  .
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {unit.lessonIds.map((id) => {
                    const lesson = LESSON_BY_ID[id];
                    if (!lesson) return null;
                    const open = isPublicLessonId(id);
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
                              open ? "text-primary" : "text-muted-foreground"
                            )}
                          >
                            {open ? `open · ${completion.replaceAll("_", " ")}` : "unpublished"}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {open ? (
                            <Link href={`/lesson/${id}`} className={buttonVariants({ size: "sm" })}>
                              Open lesson
                            </Link>
                          ) : (
                            <a
                              href={studyStartUrl({ unit: String(unit.id), intent: "waitlist" })}
                              className={buttonVariants({ size: "sm", variant: "outline" })}
                            >
                              Waitlist this lesson
                            </a>
                          )}
                        </div>
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
