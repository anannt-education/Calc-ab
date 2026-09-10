import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MathHtml } from "@/components/MathHtml";
import { LESSON_BY_ID, SKILL_BY_ID, UNITS, UNIT_BY_ID } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { cookies } from "next/headers";
import { isPublicLessonId, isPublicUnitId, studyStartUrl, hasSessionCookieValue } from "@/lib/gate";
import { buildMetadata, plainText } from "@/lib/site";

export function generateStaticParams() {
  return UNITS.map((u) => ({ unitId: u.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitId: string }>;
}): Promise<Metadata> {
  const { unitId } = await params;
  const unit = UNIT_BY_ID[unitId];
  if (!unit) {
    return buildMetadata({
      title: "Unit",
      description: "This Calculus AB unit is not in the public slice.",
      path: `/course/${unitId}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: unit.number === "F" ? "Foundation bridge" : unitShortTitle(unit),
    description: plainText(`${unit.officialLabel}. ${unit.overview}`),
    path: `/course/${unitId}`,
    noIndex: true,
  });
}

function unitShortTitle(unit: { number: number | "F"; title: string }) {
  const map: Record<string, string> = {
    "1": "Unit 1 Limits and Continuity",
    "2": "Unit 2 Differentiation basics",
    "3": "Unit 3 Chain and implicit",
    "4": "Unit 4 Contextual derivatives",
    "5": "Unit 5 Analytical applications",
    "6": "Unit 6 Integration and FTC",
    "7": "Unit 7 Differential equations",
    "8": "Unit 8 Integration applications",
  };
  return map[String(unit.number)] ?? unit.title;
}

export default async function UnitPage({ params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params;
  const unit = UNIT_BY_ID[unitId];
  if (!unit) notFound();

  const jar = await cookies();
  const unlocked = hasSessionCookieValue((name) => jar.get(name)?.value);
  const unpublished = !isPublicUnitId(unit.id) && !unlocked;

  if (unpublished) {
    return (
      <article className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Unpublished</p>
        <h1 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          {unit.number === "F" ? "Foundation" : `Unit ${unit.number}`}: {unit.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed">
          This unit is still being written. It is not missing — it is unpublished. Ask the study desk
          to tell you when the first lesson here is ready.
        </p>
        <p className="mt-4 text-sm">
          <a href={studyStartUrl({ unit: unit.id, intent: "waitlist" })} className="text-primary underline-offset-2 hover:underline">
            Ask to be told when this unit is ready
          </a>
        </p>
        <p className="mt-6 text-sm">
          <Link href="/" className="text-primary underline-offset-2 hover:underline">
            Back to the two open lessons
          </Link>
        </p>
      </article>
    );
  }

  return (
    <article className="max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Course", path: "/course" },
          { name: unit.title, path: `/course/${unit.id}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/course", label: "Course" },
          { href: `/course/${unit.id}`, label: unit.title },
        ]}
      />
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {unit.number === "F" ? "Anannt foundation" : `AP Calculus AB · Unit ${unit.number}`} · MCQ {unit.mcqWeight}
      </p>
      <h1 className="mt-1 font-sans text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        {unit.number === "F" ? "Foundation bridge" : `Unit ${unit.number}`}: {unit.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{unit.officialLabel}</p>
      <p className="mt-3 text-base leading-relaxed">{unit.overview}</p>
      <p className="mt-3 text-sm">
        <strong>Signature activity.</strong> {unit.signatureActivity}
      </p>
      {unit.isFoundation && (
        <p className="mt-3 text-sm text-muted-foreground">
          These modules are Anannt-designed prerequisites. They are required for AB work and are not
          AP units. You can test out of a module.
        </p>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-primary">Lessons in this unit</h2>
        <ul className="mt-3 space-y-4">
          {unit.lessonIds.map((id) => {
            const lesson = LESSON_BY_ID[id];
            if (!lesson) return null;
            const open = isPublicLessonId(id) || unlocked;
            return (
              <li key={id} className="rounded-xl border bg-card p-4">
                <h3 className="font-medium">
                  {open ? (
                    <Link href={`/lesson/${id}`} className="text-primary underline-offset-2 hover:underline">
                      {lesson.title}
                    </Link>
                  ) : (
                    lesson.title
                  )}
                </h3>
                <p className="mt-1 text-sm">
                  <MathHtml text={lesson.objective} />
                </p>
                {!open && (
                  <p className="mt-2 text-xs">
                    Unpublished.{" "}
                    <a
                      href={studyStartUrl({ unit: unit.id, intent: "waitlist" })}
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      Waitlist
                    </a>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-primary">Skills (CED-aligned)</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {unit.skillIds.map((id) => {
            const skill = SKILL_BY_ID[id];
            if (!skill) return null;
            return (
              <li key={id}>
                <span className="font-medium">{skill.title}</span>
                <span className="text-muted-foreground">
                  {" "}
                  · {skill.cedTopic} / {skill.cedObjective}
                </span>
                {skill.remediationLessonId && (
                  <>
                    {" "}
                    ·{" "}
                    <Link
                      href={`/lesson/${skill.remediationLessonId}`}
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      lesson
                    </Link>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-8 text-sm">
        <Link href="/course" className="text-primary underline-offset-2 hover:underline">
          Back to the course map
        </Link>
      </p>
    </article>
  );
}
