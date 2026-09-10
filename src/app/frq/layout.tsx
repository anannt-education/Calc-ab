import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "FRQ Reasoning Studio",
  description:
    "Original Calculus AB free-response tasks, point-level rubrics, and labelled faculty review. Behind the two-lesson gate.",
  path: "/frq",
  noIndex: true,
});

export default function FrqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
