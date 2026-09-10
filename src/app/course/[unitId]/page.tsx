import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MathHtml } from "@/components/MathHtml";
import { LESSON_BY_ID, SKILL_BY_ID, UNITS, UNIT_BY_ID } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/jsonld";
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
  if (!unit) return buildMetadata({ title: "Unit", description: "Unit not in this course.", path: `/course/${unitId}` });
  return buildMetadata({
    title: unit.number === "F" ? "Foundation bridge" : unitShortTitle(unit),
    description: plainText(`${unit.officialLabel}. ${unit.overview} MCQ weight ${unit.mcqWeight}.`),
    path: `/course/${unitId}`,
    keywords: ["AP Calculus AB 2027", unit.title, "Anannt Education", "limits", "FTC"],
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
            return (
              <li key={id} className="rounded-xl border bg-card p-4">
                <h3 className="font-medium">
                  <Link href={`/lesson/${id}`} className="text-primary underline-offset-2 hover:underline">
                    {lesson.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm">
                  <MathHtml text={lesson.objective} />
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Skills:{" "}
                  {lesson.skillIds
                    .map((s) => SKILL_BY_ID[s]?.title)
                    .filter(Boolean)
                    .join(" · ")}
                </p>
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
          Back to the eight-unit map
        </Link>
      </p>
    </article>
  );
}
