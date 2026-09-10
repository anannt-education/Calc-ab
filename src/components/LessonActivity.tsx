"use client";

import { FtcLab } from "@/components/FtcLab";
import { LimitLab } from "@/components/LimitLab";
import { MathText } from "@/components/MathText";
import { LESSON_BY_ID } from "@/lib/content";

export function LessonActivity({ id }: { id: string }) {
  const lesson = LESSON_BY_ID[id];
  if (!lesson) return null;

  if (lesson.activity.kind === "limit-point" && lesson.id === "u1-limit-vs-value") {
    return (
      <div className="my-6">
        <LimitLab />
      </div>
    );
  }
  if (lesson.activity.kind === "ftc-accumulation") {
    return (
      <div className="my-6">
        <FtcLab />
      </div>
    );
  }
  return (
    <section className="my-6 rounded-xl border p-4 text-sm">
      <h2 className="font-semibold text-primary">{lesson.activity.title}</h2>
      <p className="mt-1">
        <MathText text={lesson.activity.prompt} />
      </p>
    </section>
  );
}
