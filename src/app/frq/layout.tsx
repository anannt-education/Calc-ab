import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "FRQ Reasoning Studio",
  description:
    "Anannt Reasoning Studio: original AP Calculus AB free-response tasks, point-level rubrics, and labelled faculty review.",
  path: "/frq",
});

export default function FrqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
