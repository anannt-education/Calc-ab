import type { Metadata } from "next";
import { buildMetadata, PUBLIC_SEO } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: PUBLIC_SEO.diagnostic.title,
  description: PUBLIC_SEO.diagnostic.description,
  path: PUBLIC_SEO.diagnostic.path,
});

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
