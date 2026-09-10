import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Onboarding diagnostic",
  description:
    "Anannt prerequisite diagnostic for AP Calculus AB 2027. “I have not learned this yet” is a placement fact, not a mistake.",
  path: "/onboarding",
});

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
