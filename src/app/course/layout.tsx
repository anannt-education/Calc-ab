import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Course map",
  description:
    "Eight AP Calculus AB units plus Anannt’s foundation bridge. CED-aligned lessons on limits, FTC, FRQ-ready reasoning. Completion is not mastery.",
  path: "/course",
});

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
