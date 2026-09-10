import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { FAQS } from "@/lib/faq-content";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata, PUBLIC_DESCRIPTIONS } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description: PUBLIC_DESCRIPTIONS.faq,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <article className="max-w-3xl">
      <JsonLd data={faqJsonLd()} />
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Anannt Education
      </p>
      <h1 className="mt-1 font-sans text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        Frequently asked questions
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Short answers we are willing to stand behind. If a claim is not here, we probably should not
        be making it.
      </p>
      <dl className="mt-8 space-y-6">
        {FAQS.map((f) => (
          <div key={f.q}>
            <dt className="font-medium text-primary">{f.q}</dt>
            <dd className="mt-1 text-sm leading-relaxed">{f.a}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-sm">
        <Link href="/about" className="text-primary underline-offset-2 hover:underline">
          Academic approach
        </Link>
        <span className="mx-2">·</span>
        <Link href="/privacy" className="text-primary underline-offset-2 hover:underline">
          Privacy
        </Link>
        <span className="mx-2">·</span>
        <Link href="/onboarding" className="text-primary underline-offset-2 hover:underline">
          Sample diagnostic
        </Link>
      </p>
    </article>
  );
}
