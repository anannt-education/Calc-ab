import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Course map",
  description:
    "Calculus AB map: two public lessons are open. Later units are unpublished and go to a waitlist, not a missing page.",
  path: "/course",
  noIndex: true,
});

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
