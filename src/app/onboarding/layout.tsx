import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import { PUBLIC_DESCRIPTIONS } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculus AB diagnostic",
  description: PUBLIC_DESCRIPTIONS.onboarding,
  path: "/onboarding",
});

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
