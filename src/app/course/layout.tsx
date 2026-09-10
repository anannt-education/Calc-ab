import type { Metadata } from "next";
import { buildMetadata, PUBLIC_META } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: PUBLIC_META.course.title,
  description: PUBLIC_META.course.description,
  path: PUBLIC_META.course.path,
});

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
