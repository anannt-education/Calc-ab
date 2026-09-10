import Link from "next/link";

const METHODS = [
  {
    href: "/about#concept-lens",
    name: "Concept Lens",
    body: "The idea in the form you should still be able to say on an unfamiliar paper — not a formula to copy from the last example.",
  },
  {
    href: "/about#method-choice",
    name: "Method Choice",
    body: "Which tool fits this structure, and when a shortcut fails. Named before the algebra starts.",
  },
  {
    href: "/about#error-clinic",
    name: "Error Clinic",
    body: "The mix-up we see most often, named kindly, with what to try next. Not a lecture about effort.",
  },
  {
    href: "/about#method-choice",
    name: "Reasoning Studio",
    body: "Handwritten arguments against a point-level rubric. Self-review is labelled; faculty review is separate. The studio itself sits behind the study gate.",
  },
  {
    href: "/exam/2027",
    name: "Exam Review",
    body: "After a sitting: what the four 2027 parts asked of you, pacing, and the next honest priority. No AP score prediction.",
  },
] as const;

export function AcademicMethod({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="method-heading">
      <h2 id="method-heading" className="text-lg font-semibold text-primary">
        How Anannt teaches Calculus AB
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Five editorial formats, not extra navigation. Expertise is the quality of the reasoning.
      </p>
      <ul className={`mt-4 grid gap-3 ${compact ? "sm:grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {METHODS.map((m) => (
          <li key={m.name} className="rounded-xl border bg-card p-4">
            <h3 className="font-medium text-primary">
              <Link href={m.href} className="underline-offset-2 hover:underline">
                Anannt {m.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm">{m.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
