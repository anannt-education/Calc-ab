import type { Metadata } from "next";
import { buildMetadata, PUBLIC_META } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: PUBLIC_META.onboarding.title,
  description: PUBLIC_META.onboarding.description,
  path: PUBLIC_META.onboarding.path,
});

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
