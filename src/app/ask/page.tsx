"use client";

import { Suspense, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { PageTitle } from "@/components/AppShell";
import { MathText } from "@/components/MathText";
import { useStudent } from "@/components/StudentProvider";
import { LESSON_BY_ID } from "@/lib/content";
import { appPath } from "@/lib/gate";
import { Button } from "@/components/ui/button";

export default function AskPage() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <AskInner />
    </Suspense>
  );
}

function AskInner() {
  const params = useSearchParams();
  const path = usePathname();
  const { state, setState, log } = useStudent();
  const lessonId = params.get("lesson") ?? state.currentContext.lessonId;
  const lesson = lessonId ? LESSON_BY_ID[lessonId] : undefined;
  const mockActive = path.startsWith("/mock/sit");
  const [level, setLevel] = useState(0);
  const [messages, setMessages] = useState<{ role: "anannt" | "you"; text: string }[]>([]);
  const [pending, setPending] = useState(false);

  async function next(wantSolution = false) {
    if (mockActive) {
      setMessages((m) => [
        ...m,
        {
          role: "anannt",
          text: "Ask Anannt is off during a mock — that is exam isolation, not a refusal to help. After you submit the sitting, Exam Review can talk about what the parts asked of you. Protected answers stay withheld until then.",
        },
      ]);
      return;
    }
    const nextLevel = wantSolution ? level : Math.min(4, level + 1);
    setPending(true);
    const res = await fetch(appPath("/api/ask"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lessonId,
        itemId: state.currentContext.itemId,
        level: nextLevel || 1,
        mockActive,
        wantSolution,
      }),
    });
    const data = await res.json();
    setPending(false);
    setLevel(wantSolution ? level : nextLevel);
    setMessages((m) => [...m, { role: "anannt", text: data.text }]);
    setState((s) => ({
      ...s,
      askLog: [...s.askLog, { at: new Date().toISOString(), lessonId, level: nextLevel, text: data.text }],
    }));
    if (wantSolution) log("hint_used", { fullSolution: true, lessonId: lessonId ?? "" });
    else log("hint_used", { level: nextLevel, lessonId: lessonId ?? "" });
  }

  return (
    <div className="max-w-2xl">
      <PageTitle kicker="Ask Anannt" title="A faculty hint ladder, not a chatbot">
        Anannt faculty restates the difficulty, then asks a targeted question, then a strategic hint,
        then one step. A full solution is learning-mode only and marks the attempt assisted. This is
        not unrestricted chat, and it will not retrieve protected mock answers.
      </PageTitle>
      {lesson ? (
        <p className="mb-4 text-sm">
          Grounded in <strong>{lesson.title}</strong>. Objective: <MathText text={lesson.objective} />
        </p>
      ) : (
        <p className="mb-4 text-sm text-muted-foreground">
          Open a lesson first so the hints attach to an approved Concept Lens. You can still request
          the first ladder step in general form — we will not invent a new rubric.
        </p>
      )}
      <div className="space-y-3">
        {messages.map((m, i) => (
          <div key={i} className="rounded-md border p-3 text-sm">
            <p className="text-xs text-muted-foreground">{m.role === "anannt" ? "Anannt faculty" : "You"}</p>
            <MathText text={m.text} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" disabled={pending || mockActive} onClick={() => next(false)}>
          {["Restate the difficulty", "Ask a targeted question", "Strategic hint", "Explain a step"][Math.min(3, level)] ??
            "Next hint"}
        </Button>
        <Button type="button" variant="outline" disabled={pending || mockActive} onClick={() => next(true)}>
          Explain why — full solution (marks assisted)
        </Button>
      </div>
      {mockActive && (
        <p className="mt-3 text-sm">
          Mock isolation is on. Faculty hints stay off until the sitting is submitted — that is the
          same standard we would use in a rehearsal room.
        </p>
      )}
    </div>
  );
}
