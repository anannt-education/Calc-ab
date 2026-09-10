import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, PUBLIC_DESCRIPTIONS } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: PUBLIC_DESCRIPTIONS.privacy,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Anannt Education
      </p>
      <h1 className="mt-1 font-sans text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        Privacy (this demo)
      </h1>
      <p className="mt-3 text-base leading-relaxed">
        This public slice stores progress in your browser. There is no account wall on the two open
        lessons. Progress, attempts, and mistake notes live under the key{" "}
        <code>anannt-ab-student-v1</code>. Clearing site data removes them. After those two lessons,
        the study desk at study.anannt.ae asks for an email and a parent WhatsApp. That form is not
        on this Calculus AB app.
      </p>
      <section className="mt-8 space-y-3 text-sm">
        <h2 className="text-lg font-semibold text-primary">What we collect here</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Optional display name and study preferences you type in onboarding.</li>
          <li>Answers, confidence, and “not yet learned” marks needed to recommend a next task.</li>
          <li>Issue reports you choose to send from an item (stored locally in this demo).</li>
        </ul>
        <p>
          Marking requests go to this app’s own <code>/api/mark</code> route so answer keys stay off
          the page source. They are not sent to an advertising network.
        </p>
      </section>
      <section className="mt-8 text-sm">
        <h2 className="text-lg font-semibold text-primary">What a later product would add</h2>
        <p className="mt-2">
          A production course would define guardian and school consent, retention, deletion and
          export against the jurisdictions where it actually runs. Handwritten files would use private
          storage. Student work would not be used to train general models by default. This page is not
          a legal determination for that future deployment.
        </p>
      </section>
      <p className="mt-8 text-sm">
        <Link href="/" className="text-primary underline-offset-2 hover:underline">
          Home
        </Link>
        <span className="mx-2">·</span>
        <Link href="/faq" className="text-primary underline-offset-2 hover:underline">
          FAQ
        </Link>
      </p>
    </article>
  );
}
