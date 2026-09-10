import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { FACULTY, REVIEW_STANDARDS } from "@/lib/faculty";
import { facultyJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/site";
import { PUBLIC_DESCRIPTIONS } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculus AB faculty",
  description: PUBLIC_DESCRIPTIONS.faculty,
  path: "/faculty",
});

export default function FacultyPage() {
  return (
    <article className="max-w-3xl">
      <JsonLd data={facultyJsonLd()} />
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Anannt Education
      </p>
      <h1 className="mt-1 font-sans text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        Faculty and review standards
      </h1>
      <p className="mt-3 text-base leading-relaxed">
        Lessons and assessed items on this course carry named Anannt authors and approvers. The names
        below are Anannt academic staff for this Calculus AB programme. None of them are presented as
        College Board employees, AP readers-for-hire branding, or official endorsement.
      </p>

      <ul className="mt-8 space-y-6">
        {FACULTY.map((p) => (
          <li key={p.id} className="rounded-xl border bg-card p-4">
            <h2 className="text-lg font-semibold text-primary">{p.name}</h2>
            <p className="text-sm font-medium">{p.role}</p>
            <p className="mt-1 text-sm text-muted-foreground">{p.qualifications}</p>
            <p className="mt-2 text-sm">{p.bio}</p>
            <p className="mt-2 text-xs text-muted-foreground">Review focus: {p.focus}</p>
          </li>
        ))}
      </ul>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-primary">How a page reaches students</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm">
          {REVIEW_STANDARDS.map((s) => (
            <li key={s.title}>
              <strong>{s.title}.</strong> {s.body}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 text-sm">
        <h2 className="text-lg font-semibold text-primary">See the workflow</h2>
        <p className="mt-2">
          The academic CMS preview shows coverage against required AB skills and blocks
          self-publish. A demo mentor queue holds one faculty-reviewed handwritten FRQ with page
          mapping. These are product controls, not a claim that every item in a future full bank has
          already been through a paid marking cycle.
        </p>
        <p className="mt-3">
          <Link href="/cms" className="text-primary underline-offset-2 hover:underline">
            Academic CMS
          </Link>
          <span className="mx-2">·</span>
          <Link href="/mentor" className="text-primary underline-offset-2 hover:underline">
            Mentor review queue
          </Link>
          <span className="mx-2">·</span>
          <Link href="/lesson/u1-limit-vs-value" className="text-primary underline-offset-2 hover:underline">
            Sample lesson with faculty chrome
          </Link>
        </p>
      </section>
    </article>
  );
}
