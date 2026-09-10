import Link from "next/link";
import type { Metadata } from "next";
import { AcademicMethod } from "@/components/AcademicMethod";
import { JsonLd } from "@/components/JsonLd";
import { programJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/site";
import { PUBLIC_DESCRIPTIONS } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How this Calculus AB studio teaches",
  description: PUBLIC_DESCRIPTIONS.about,
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="max-w-3xl">
      <JsonLd data={programJsonLd()} />
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Anannt Education
      </p>
      <h1 className="mt-1 font-sans text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        Academic approach
      </h1>
      <p className="mt-3 text-base leading-relaxed">
        Anannt’s authority on AP Calculus AB comes from explanations, assessment care, visible
        faculty review, and honest reporting. We do not claim to be the “#1 AP prep,” we do not
        invent pass-rate statistics, and we do not imply College Board endorsement. If the reasoning on
        a page is weak, the brand is weak — that is the standard we hold ourselves to.
      </p>

      <section className="mt-8" id="promise">
        <h2 className="text-lg font-semibold text-primary">The product promise</h2>
        <p className="mt-2 text-sm">
          Understand the idea, apply it independently, explain your reasoning, and demonstrate that
          you can still do it later. Every recommendation should answer four questions: What should I
          learn next? Why am I learning it? Can I do it without help? What should I do about the
          mistakes I am making?
        </p>
      </section>

      <div className="mt-8">
        <AcademicMethod />
      </div>

      <section className="mt-10 space-y-4" id="concept-lens">
        <h2 className="text-lg font-semibold text-primary">Original curriculum, CED-aligned language</h2>
        <p className="mt-2 text-sm">
          Lessons are original Anannt writing. Official topic codes (CED topics, learning objectives,
          essential knowledge) are mapped so coverage can be audited. Narrative topic lists are not
          treated as evidence of coverage.{" "}
          <Link href="/course" className="text-primary underline-offset-2 hover:underline">
            The course map
          </Link>{" "}
          uses current multiple-choice weight ranges from the{" "}
          <a
            className="text-primary underline-offset-2 hover:underline"
            href="https://apcentral.collegeboard.org/courses/ap-calculus-ab"
          >
            official course framework
          </a>
          ; those weights are not lesson-time quotas.
        </p>
      </section>

      <section className="mt-8" id="method-choice">
        <h2 className="text-lg font-semibold text-primary">AB scope protection</h2>
        <p className="mt-2 text-sm">
          Integration by parts, partial fractions, improper integrals, Euler’s method, logistic
          models, arc length, parametric/polar/vector calculus, and sequences/series are not required
          AB mastery. If an extension appears, it is labelled optional and kept out of default
          assignments. Shared unit numbers with BC are audited at objective level because a unit title
          can hide a BC-only topic.
        </p>
      </section>

      <section className="mt-8" id="error-clinic">
        <h2 className="text-lg font-semibold text-primary">Mastery is evidence, not login time</h2>
        <p className="mt-2 text-sm">
          Watching a lesson updates exposure. Independent demonstration needs fresh item families
          without hints. Delayed retrieval can move a skill to review due without erasing earlier
          achievement. Sparse evidence is reported as insufficient evidence — never a fabricated
          percentage. Parent-style summaries, when shown, describe the same evidence.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-primary">Who this is for</h2>
        <p className="mt-2 text-sm">
          English-medium students in India, the UAE, and other international settings, including those
          sitting AP independently of school. School learning is supported alongside AP preparation. We
          never imply that every school’s final paper uses the AP format.
        </p>
      </section>

      <p className="mt-8 text-sm">
        <Link href="/faculty" className="text-primary underline-offset-2 hover:underline">
          Faculty and review standards
        </Link>
        <span className="mx-2">·</span>
        <Link href="/exam/2027" className="text-primary underline-offset-2 hover:underline">
          2027 exam guide
        </Link>
        <span className="mx-2">·</span>
        <Link href="/privacy" className="text-primary underline-offset-2 hover:underline">
          Privacy
        </Link>
      </p>
    </article>
  );
}
