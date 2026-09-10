import type { Metadata } from "next";
import { gatedMetadata } from "@/lib/seo";

export const metadata: Metadata = gatedMetadata(
  "2027 mock centre",
  "Self-administered Calculus AB 2027 mock. Internal practice composite, not an AP score. Session required.",
  "/mock"
);

export default function MockLayout({ children }: { children: React.ReactNode }) {
  return children;
}
