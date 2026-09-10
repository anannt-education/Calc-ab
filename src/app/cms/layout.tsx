import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Academic CMS",
  description: "Anannt academic CMS preview: authors cannot self-publish unapproved AP Calculus AB items.",
  path: "/cms",
  noIndex: true,
});

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
