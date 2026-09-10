"use client";

import Link from "next/link";
import { PageTitle } from "@/components/AppShell";
import { useStudent } from "@/components/StudentProvider";
import { SKILL_BY_ID } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button";
import { nowISO } from "@/lib/storage";

export default function MistakesPage() {
  const { state, setState } = useStudent();
  return (
    <div>
      <PageTitle kicker="Mistake notebook" title="Errors, named kindly and scheduled">
        Each row keeps the source skill, a likely mix-up, what to try next, and a retry time. Repeating
        the same item family will not independently satisfy mastery. Nothing here is a character
        judgement.
      </PageTitle>
      {state.mistakes.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No error notes yet. When a check misses, we will name the likely mix-up and give you a
          different example — not a lecture about trying harder. Your next step is still the
          recommended task on Home.
        </p>
      ) : (
        <ul className="space-y-3">
          {state.mistakes.map((m) => (
            <li key={m.id} className="rounded-xl border bg-card p-4">
              <p className="text-sm font-medium">
                {SKILL_BY_ID[m.skillId]?.title ?? m.skillId} · {m.errorClass.replaceAll("_", " ")}
              </p>
              <p className="mt-1 text-sm">{m.explanation}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.correction}</p>
              <p className="mt-1 text-xs text-muted-foreground" suppressHydrationWarning>
                Retry after {new Date(m.retryAfter).toLocaleString()}{" "}
                {m.resolved ? "· resolved" : "· open"}
              </p>
              <div className="mt-2 flex gap-2">
                <Link
                  href={`/practice?mode=review&skill=${m.skillId}`}
                  className={buttonVariants({ size: "sm" })}
                >
                  Try a fresh question
                </Link>
                <button
                  type="button"
                  className={buttonVariants({ size: "sm", variant: "outline" })}
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      mistakes: s.mistakes.map((x) => (x.id === m.id ? { ...x, resolved: true } : x)),
                    }))
                  }
                >
                  Mark resolved
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-xs text-muted-foreground" suppressHydrationWarning>
        Clock now (with demo offset): {nowISO(state)}
      </p>
    </div>
  );
}
