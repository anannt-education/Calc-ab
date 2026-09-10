import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StudentProvider } from "@/components/StudentProvider";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, courseJsonLd } from "@/lib/jsonld";
import { SITE_NAME, SITE_URL, PUBLIC_META, buildMetadata } from "@/lib/site";
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
  ...buildMetadata({
    title: PUBLIC_META.home.title,
    description: PUBLIC_META.home.description,
    path: PUBLIC_META.home.path,
  }),
  applicationName: "Anannt Study · Calculus AB",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
