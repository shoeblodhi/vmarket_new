import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/ledger/Footer";
import { Header } from "@/components/ledger/Header";
import { site } from "@/lib/content";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "VMarket Digital | AI-Powered Growth Systems, Marketing & Software",
    // Future service and location pages only need to set their own short title.
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  category: "Digital growth and technology services",
  keywords: [
    "digital growth systems",
    "digital marketing agency",
    "AI voice agents",
    "AI chat agents",
    "CRM automation",
    "lead generation",
    "website development",
    "mobile app development",
    "custom software development",
    "business intelligence",
    "SEO services",
    "PPC",
    "pay per lead",
    "pay per sale",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "VMarket Digital | Growth Systems, Engineered",
    description:
      "One connected partner for demand, websites, apps, AI automation, CRM, software, and measurable growth.",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "VMarket Digital — Growth systems, engineered" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VMarket Digital | Growth Systems, Engineered",
    description:
      "Marketing, AI, CRM, websites, apps, software, and analytics—engineered as one growth system.",
    images: ["/opengraph-image"],
  },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Tracy",
    "geo.position": "37.7397;-121.4252",
    ICBM: "37.7397, -121.4252",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f4ee",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // Keeps route-change jumps instant while `scroll-behavior: smooth`
      // still applies to the in-page anchor navigation.
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper-50"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
