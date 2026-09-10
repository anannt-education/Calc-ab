"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { PageTitle } from "@/components/AppShell";
import { MathText } from "@/components/MathText";
import { useStudent } from "@/components/StudentProvider";
import { FRQ_BY_ID } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FeedbackLevel, FrqSubmission, PageMap } from "@/lib/types";
import { nowISO } from "@/lib/storage";

const SAMPLE_PAGES = [
  { id: "s1", label: "Photo 1", note: "Simulated upload: working for (a)–(b)" },
  { id: "s2", label: "Photo 2", note: "Simulated upload: working for (c)" },
];

export default function FrqStudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const frq = FRQ_BY_ID[id];
  if (!frq) notFound();
  return <Studio frqId={id} />;
}

function Studio({ frqId }: { frqId: string }) {
  const frq = FRQ_BY_ID[frqId]!;
  const { state, setState, log } = useStudent();
  const [pages, setPages] = useState(SAMPLE_PAGES);
  const [map, setMap] = useState<PageMap[]>([
    { pageIndex: 0, partId: "a" },
    { pageIndex: 1, partId: "c" },
  ]);
  const [level, setLevel] = useState<FeedbackLevel>("self-review");
  const [awarded, setAwarded] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");

  function save() {
    const sub: FrqSubmission = {
      id: `sub-${Date.now()}`,
      frqId,
      studentLabel: state.profile?.displayName ?? "Demo student",
      uploadedAt: nowISO(state),
      pages: pages.map((p) => ({ ...p, kind: "simulated" })),
      pageMap: map,
      feedbackLevel: level,
      awarded,
      reviewerNotes: notes,
      appealHistory: [],
      provisionalScore:
        level === "self-review"
          ? undefined
          : frq.rubric.filter((r) => awarded[r.id]).reduce((s, r) => s + r.points, 0),
    };
    setState((s) => ({ ...s, frqSubmissions: [sub, ...s.frqSubmissions] }));
    if (level === "faculty-reviewed") log("grade_reviewed", { frqId });
  }

  const earned = frq.rubric.filter((r) => awarded[r.id]).reduce((s, r) => s + r.points, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <PageTitle kicker="Anannt Reasoning Studio" title={frq.title}>
          Calculator {frq.calculator === "required" ? "required" : "not permitted"}. Upload is simulated
          in this slice; original files would be stored privately. Write the justification you would
          actually put on paper.
        </PageTitle>
        <div className="prose-math text-sm">
          <MathText text={frq.stem} />
        </div>
        <ol className="mt-4 space-y-3">
          {frq.parts.map((p) => (
            <li key={p.id} className="rounded-md border p-3 text-sm">
              <span className="font-medium">{p.label}</span> <MathText text={p.prompt} />
            </li>
          ))}
        </ol>
        <h2 className="mt-6 text-sm font-semibold">Pages</h2>
        <ul className="mt-2 space-y-2">
          {pages.map((p, i) => (
            <li key={p.id} className="flex flex-wrap items-center gap-2 rounded-md border p-2 text-sm">
              <span className="font-medium">{p.label}</span>
              <span className="text-muted-foreground">{p.note}</span>
              <label className="ml-auto text-xs">
                Maps to part{" "}
                <select
                  className="rounded border bg-background px-1"
                  value={map.find((m) => m.pageIndex === i)?.partId ?? ""}
                  onChange={(e) => {
                    const partId = e.target.value;
                    setMap((m) => {
                      const rest = m.filter((x) => x.pageIndex !== i);
                      return partId ? [...rest, { pageIndex: i, partId }] : rest;
                    });
                  }}
                >
                  <option value="">—</option>
                  {frq.parts.map((part) => (
                    <option key={part.id} value={part.id}>
                      {part.label}
                    </option>
                  ))}
                </select>
              </label>
            </li>
          ))}
        </ul>
        <Button type="button" variant="outline" className="mt-2" onClick={() => setPages((p) => [...p, { id: `s${p.length + 1}`, label: `Photo ${p.length + 1}`, note: "Simulated extra page" }])}>
          Add another page
        </Button>
      </div>
      <aside className="space-y-4">
        <section className="rounded-xl border p-4">
          <h2 className="font-semibold">Feedback level</h2>
          <p className="text-xs text-muted-foreground">
            Labels must stay honest. Faculty-reviewed means a named Anannt reviewer; self-review is
            your reading of the rubric.
          </p>
          <div className="mt-2 flex flex-col gap-1 text-sm">
            {(["self-review", "provisional", "faculty-reviewed"] as const).map((l) => (
              <label key={l} className="flex items-center gap-2">
                <input type="radio" name="lvl" checked={level === l} onChange={() => setLevel(l)} />
                {l}
              </label>
            ))}
          </div>
        </section>
        <section className="rounded-xl border p-4">
          <h2 className="font-semibold">Point-level rubric</h2>
          <ul className="mt-2 space-y-2">
            {frq.rubric.map((r) => (
              <li key={r.id}>
                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(awarded[r.id])}
                    onChange={(e) => setAwarded((a) => ({ ...a, [r.id]: e.target.checked }))}
                  />
                  <span>
                    {r.part} · {r.points} pt · {r.description}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm">
            {level === "self-review" ? "Self-review ticks" : level === "provisional" ? "Provisional marks" : "Faculty-reviewed"}
            : {earned}/{frq.totalPoints}.{" "}
            {level !== "faculty-reviewed" && "This is not a faculty result."}
          </p>
        </section>
        <section className="rounded-xl border p-4">
          <Label htmlFor="notes">Notes / appeal trail</Label>
          <Textarea id="notes" className="mt-1" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <p className="mt-2 text-xs text-muted-foreground">Appeals would retain previous awarded points.</p>
          <Button type="button" className="mt-3" onClick={save}>
            Save submission locally
          </Button>
        </section>
        <details className="rounded-xl border p-4 text-sm">
          <summary className="font-semibold">Model solution (learning mode)</summary>
          <p className="mt-2 whitespace-pre-wrap">
            <MathText text={frq.modelSolution} />
          </p>
        </details>
      </aside>
    </div>
  );
}
