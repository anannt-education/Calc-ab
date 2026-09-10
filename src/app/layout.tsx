import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StudentProvider } from "@/components/StudentProvider";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, courseJsonLd } from "@/lib/jsonld";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AP Calculus AB 2027 | Anannt AP Calculus AB",
    template: "%s | Anannt AP Calculus AB",
  },
  description:
    "Independent AP Calculus AB 2027 prep from Anannt Education: limits, FTC, FRQ practice, and an honest diagnostic. Not affiliated with College Board.",
  applicationName: "Anannt AP Calculus AB",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "AP Calculus AB 2027",
    "Anannt Education",
    "limits",
    "Fundamental Theorem of Calculus",
    "FRQ practice",
    "AP Calculus diagnostic",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: "AP Calculus AB 2027 | Anannt AP Calculus AB",
    description:
      "Independent AP Calculus AB preparation for the 2027 hybrid digital exam. Faculty-reviewed lessons. No score guarantees.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AP Calculus AB 2027 | Anannt AP Calculus AB",
    description:
      "Independent AP Calculus AB preparation. Limits, FTC, FRQ reasoning. Anannt Education — not affiliated with College Board.",
  },
  robots: { index: true, follow: true },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#1B3A5F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationJsonLd(), courseJsonLd()]} />
        <TooltipProvider>
          <StudentProvider>
            <AppShell>{children}</AppShell>
          </StudentProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
