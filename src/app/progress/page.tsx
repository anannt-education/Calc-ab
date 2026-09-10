import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { BreadcrumbJsonLd, breadcrumbsFor } from "@/lib/jsonld";
import { SITE } from "@/lib/site-config";
import { ProgressClient } from "./progress-client";

export const metadata = {
  title: "Progress",
  description: `Skill mastery, exam readiness, and review load for ${SITE.course}.`,
  alternates: { canonical: "/progress" },
};

export default function ProgressPage() {
  return (
    <AppShell>
      <JsonLd data={BreadcrumbJsonLd(breadcrumbsFor("/progress"))} />
      <ProgressClient />
    </AppShell>
  );
}
