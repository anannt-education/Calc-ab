import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4, Geist_Mono, Playfair_Display } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StudentProvider } from "@/components/StudentProvider";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, courseJsonLd } from "@/lib/jsonld";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import { PUBLIC_DESCRIPTIONS } from "@/lib/seo";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const homeUrl = absoluteUrl("/");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Why a limit is not a function value | Anannt Study",
    template: "%s | Anannt Study",
  },
  description: PUBLIC_DESCRIPTIONS.home,
  applicationName: "Anannt Study · Calculus AB",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "AP Calculus AB 2027",
    "Anannt Education",
    "limits",
    "Fundamental Theorem of Calculus",
    "Dubai",
  ],
  alternates: { canonical: homeUrl },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: homeUrl,
    title: "Why a limit is not a function value | Anannt Study",
    description: PUBLIC_DESCRIPTIONS.home,
  },
  twitter: {
    card: "summary_large_image",
    title: "Why a limit is not a function value | Anannt Study",
    description: PUBLIC_DESCRIPTIONS.home,
  },
  robots: { index: true, follow: true },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#0F245C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${playfair.variable} ${mono.variable} h-full antialiased`}
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
