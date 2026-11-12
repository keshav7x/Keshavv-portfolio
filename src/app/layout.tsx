import Navbar from "@/components/navbar";
import SparkleBurst from "@/components/sparkle-burst";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

// Geist ships as a variable font (wght 100–900). Loading it as a variable
// font means one file per family instead of one file per weight.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "variable",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} — Software Developer`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  applicationName: DATA.name,
  keywords: [...DATA.keywords],
  category: "technology",
  authors: [{ name: DATA.fullName, url: DATA.url }],
  creator: DATA.fullName,
  publisher: DATA.fullName,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: `${DATA.name} — Blog RSS` }],
    },
  },
  openGraph: {
    title: `${DATA.name} — Software Developer`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name} — Software Developer`,
    description: DATA.description,
    card: "summary_large_image",
    site: "@keshavdotdev",
    creator: "@keshavdotdev",
  },
  appleWebApp: {
    capable: true,
    title: DATA.name,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ,
    yandex: process.env.YANDEX_VERIFICATION,
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
            <SparkleBurst />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
