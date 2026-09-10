"use client";

import Link from "next/link";
import { PageTitle } from "@/components/AppShell";
import { useStudent } from "@/components/StudentProvider";
import { UNITS, LESSON_BY_ID } from "@/lib/content";
import { lessonCompletionFrom } from "@/lib/mastery";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LESSON_1_ID, LESSON_2_ID, isPublicLessonId, studyStartUrl } from "@/lib/gate";

const PUBLIC_LESSONS = [
  { id: LESSON_1_ID, kicker: "Lesson 1 · public" },
  { id: LESSON_2_ID, kicker: "Lesson 2 · public" },
];

export default function CoursePage() {
  const { state } = useStudent();
  return (
    <div>
      <PageTitle kicker="Honesty map" title="Two deep lessons. Eight-unit map still being written.">
        Limits and FTC are open without an account. Later units exist as faculty drafts in this
        studio; they are not a published eight-unit course. After lesson 2 we ask for email and a
        parent WhatsApp on study.anannt.ae.
      </PageTitle>

      <ol className="space-y-4">
        {PUBLIC_LESSONS.map(({ id, kicker }) => {
          const lesson = LESSON_BY_ID[id];
          if (!lesson) return null;
          const completion = lessonCompletionFrom(state, id, lesson.skillIds);
          return (
            <li key={id} className="rounded-xl border border-rule bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">{kicker}</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">
                <Link href={`/lesson/${id}`} className="underline-offset-2 hover:underline">
                  {lesson.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm">{lesson.objective.replace(/\$/g, "")}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                completion: {completion.replaceAll("_", " ")}
              </p>
              <Link href={`/lesson/${id}`} className={cn(buttonVariants({ size: "sm" }), "mt-3 inline-flex")}>
                Open lesson
              </Link>
            </li>
          );
        })}
      </ol>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl text-ink">Later units</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Not published as a live journey. Names below are the official unit titles so you can see
          what is still being written. They are not extra free lessons.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {UNITS.filter((u) => !u.isFoundation).map((unit) => {
            const openIds = unit.lessonIds.filter((id) => isPublicLessonId(id));
            return (
              <li key={unit.id} className="rounded-lg border border-rule p-3">
                <span className="font-medium">
                  Unit {unit.number}: {unit.title}
                </span>
                {openIds.length > 0 ? (
                  <span className="mt-1 block text-xs text-navy">
                    Public lesson in this unit. Other lessons wait until after lesson 2.
                  </span>
                ) : (
                  <span className="mt-1 block text-xs text-muted-foreground">Still being written.</span>
                )}
              </li>
            );
          })}
        </ul>
        <a href={studyStartUrl()} className={cn(buttonVariants({ variant: "outline" }), "mt-4 inline-flex")}>
          After two lessons — continue on study
        </a>
      </section>
    </div>
  );
}
