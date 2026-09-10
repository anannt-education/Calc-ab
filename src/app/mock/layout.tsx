import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "2027 mock centre",
  description:
    "Self-administered AP Calculus AB 2027 mock: 42 MCQ and 6 FRQ in four parts. Internal practice composite, not an AP score.",
  path: "/mock",
});

export default function MockLayout({ children }: { children: React.ReactNode }) {
  return children;
}
