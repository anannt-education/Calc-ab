import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FacultyChrome } from "@/components/FacultyChrome";
import { JsonLd } from "@/components/JsonLd";
import { LessonActivity } from "@/components/LessonActivity";
import { LessonWorkspace } from "@/components/LessonWorkspace";
import { MathHtml } from "@/components/MathHtml";
import { LESSON_BY_ID, LESSONS, SKILL_BY_ID, UNIT_BY_ID } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { facultyById } from "@/lib/faculty";
import { isPublicLessonId, PUBLIC_LESSON_META, studyStartUrl } from "@/lib/gate";
import { buildMetadata, plainText, PUBLIC_DESCRIPTIONS } from "@/lib/site";

const SHORT_TITLE: Record<string, string> = {
  "u1-limit-vs-value": "Limit versus function value",
  "u1-continuity": "Continuity and IVT",
  "u2-derivative-limit": "Derivative as a rate",
  "u2-elementary-rules": "Product and quotient rules",
  "u3-chain": "Chain rule",
  "u3-implicit": "Implicit and inverse slopes",
  "u4-context": "Derivatives in context",
  "u4-related-rates": "Related rates",
  "u5-extrema": "Extrema and sign charts",
  "u5-from-derivative": "Reconstruct f from f'",
  "u6-ftc": "FTC and accumulation",
  "u6-antiderivatives": "Antiderivatives",
  "u7-slope-fields": "Slope fields",
  "u7-separation": "Separable DEs",
  "u8-avg-net": "Average value and net change",
  "u8-volume": "Disks and washers",
  "f-notation": "Function notation",
  "f-domain": "Domain and piecewise graphs",
  "f-slope": "Slope and units",
};

export function generateStaticParams() {
  return LESSONS.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const lesson = LESSON_BY_ID[id];
  if (!lesson) {
    return buildMetadata({
      title: "Lesson",
      description: "This Calculus AB lesson is not in the public slice.",
      path: `/lesson/${id}`,
      noIndex: true,
    });
  }
  if (id === "u1-limit-vs-value") {
    return buildMetadata({
      title: "Limit versus function value",
      description: PUBLIC_DESCRIPTIONS.lesson1,
      path: `/lesson/${id}`,
      type: "article",
    });
  }
  if (id === "u6-ftc") {
    return buildMetadata({
      title: "FTC and accumulation",
      description: PUBLIC_DESCRIPTIONS.lesson2,
      path: `/lesson/${id}`,
      type: "article",
    });
  }
  return buildMetadata({
    title: SHORT_TITLE[lesson.id] ?? lesson.title,
    description: plainText(`${lesson.title}. ${lesson.objective}`),
    path: `/lesson/${id}`,
    type: "article",
    noIndex: true,
  });
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = LESSON_BY_ID[id];
  if (!lesson) notFound();

  const unit = UNIT_BY_ID[lesson.unitId];
  const related = LESSONS.filter((l) => l.unitId === lesson.unitId && l.id !== lesson.id);
  const author = facultyById(lesson.approval.authorId);

  return (
    <article className="max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Course", path: "/course" },
          { name: unit?.title ?? "Unit", path: `/course/${lesson.unitId}` },
          { name: lesson.title, path: `/lesson/${id}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/course", label: "Course" },
          { href: `/course/${lesson.unitId}`, label: unit?.title ?? lesson.unitId },
          { href: `/lesson/${id}`, label: lesson.title },
        ]}
      />
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {lesson.unitId === "foundation" ? "Foundation bridge" : `Anannt lesson · ${unit?.officialLabel ?? ""}`}
      </p>
      <h1 className="mt-1 font-sans text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        {lesson.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        <MathHtml text={lesson.objective} />
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        About {lesson.estimatedMinutes} minutes. Reading this page is exposure, not mastery.
      </p>

      <FacultyChrome
        approval={lesson.approval}
        alignment={
          lesson.skillIds
            .map((s) => SKILL_BY_ID[s])
            .filter(Boolean)
            .map((s) => `${s!.cedTopic} / ${s!.cedObjective}`)
            .join(" · ") || undefined
        }
      />

      <section className="prose-math space-y-3 text-[1.05rem]">
        <h2 className="text-base font-semibold text-primary">Anannt Concept Lens</h2>
        <p>
          The idea in the form we want you to carry into an unfamiliar problem
          {author ? ` — ${author.name}’s faculty note.` : "."}
        </p>
        <p>
          <MathHtml text={lesson.conceptLens} />
        </p>
      </section>

      <LessonActivity id={id} />

      <section className="mt-8 space-y-2">
        <h2 className="text-base font-semibold text-primary">Worked example</h2>
        <p>
          <MathHtml text={lesson.workedExample.prompt} />
        </p>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          {lesson.workedExample.reasoning.map((r) => (
            <li key={r}>
              <MathHtml text={r} />
            </li>
          ))}
        </ol>
        <p className="text-sm font-medium">
          <MathHtml text={lesson.workedExample.conclusion} />
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="text-base font-semibold text-primary">Contrasting non-example</h2>
        <p className="text-sm">
          <MathHtml text={lesson.nonExample} />
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="text-base font-semibold text-primary">Anannt Error Clinic</h2>
        <p className="text-sm text-muted-foreground">
          The mix-up we see most often, named kindly, with what to try instead.
        </p>
        <p className="text-sm whitespace-pre-wrap">
          <MathHtml text={lesson.errorClinic} />
        </p>
      </section>

      {lesson.methodChoice && (
        <section className="mt-6 space-y-2">
          <h2 className="text-base font-semibold text-primary">Anannt Method Choice</h2>
          <p className="text-sm">
            <MathHtml text={lesson.methodChoice} />
          </p>
        </section>
      )}

      <LessonWorkspace id={id} />

      <nav aria-label="Related lessons" className="mt-10 border-t pt-6">
        <h2 className="text-base font-semibold text-primary">What is open next</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {isPublicLessonId(id) ? (
            <>
              {id === "u1-limit-vs-value" && (
                <li>
                  <Link
                    href={PUBLIC_LESSON_META["u6-ftc"].href}
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    Lesson 2: FTC accumulation
                  </Link>
                </li>
              )}
              {id === "u6-ftc" && (
                <li>
                  <a href={studyStartUrl({ unit: "u6" })} className="text-primary underline-offset-2 hover:underline">
                    Finish the two open lessons — study gate
                  </a>
                </li>
              )}
              <li>
                <Link href="/" className="text-primary underline-offset-2 hover:underline">
                  Calculus AB home
                </Link>
              </li>
            </>
          ) : (
            related.filter((l) => isPublicLessonId(l.id)).map((l) => (
              <li key={l.id}>
                <Link href={`/lesson/${l.id}`} className="text-primary underline-offset-2 hover:underline">
                  {l.title}
                </Link>
              </li>
            ))
          )}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Later lessons in this unit are unpublished until faculty signs them. They go to a waitlist,
          not a missing page.
        </p>
      </nav>
    </article>
  );
}
