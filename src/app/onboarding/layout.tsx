import type { Metadata } from "next";
import { buildMetadata, PUBLIC_DESCRIPTIONS } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Onboarding diagnostic",
  description: PUBLIC_DESCRIPTIONS.onboarding,
  path: "/onboarding",
});

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
