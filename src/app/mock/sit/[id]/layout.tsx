import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Mock sitting",
  description: "Timed AP Calculus AB mock sitting. Self-administered. Hints are off.",
  path: "/mock",
  noIndex: true,
});

export default function MockSitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
