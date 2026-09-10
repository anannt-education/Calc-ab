import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4, Geist_Mono, Playfair_Display } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StudentProvider } from "@/components/StudentProvider";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, courseJsonLd } from "@/lib/jsonld";
import { PUBLIC_DESCRIPTIONS, SITE_NAME, SITE_URL } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Calculus AB · two open lessons | Anannt Study",
    template: "%s | Anannt Study",
  },
  description: PUBLIC_DESCRIPTIONS.home,
  applicationName: "Anannt Study — Calculus AB",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Calculus AB 2027",
    "Anannt Education",
    "limits",
    "Fundamental Theorem of Calculus",
    "Anannt Study",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: "Calculus AB · two open lessons | Anannt Study",
    description: PUBLIC_DESCRIPTIONS.home,
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculus AB · two open lessons | Anannt Study",
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
