import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import { PUBLIC_DESCRIPTIONS } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculus AB map · two public lessons",
  description: PUBLIC_DESCRIPTIONS.course,
  path: "/course",
});

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
