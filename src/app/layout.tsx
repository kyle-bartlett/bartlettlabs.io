import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Montserrat } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { MetaPixel } from "@/components/MetaPixel";
import { PostHogProvider } from "@/components/PostHogProvider";
import { siteConfig } from "@/content/site";
import "./globals.css";
import "./globals-demos.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bartlett Labs | AI Growth Systems for Houston Service Businesses",
  description:
    "Bartlett Labs builds practical AI systems for Houston-area service businesses: missed-call recovery, follow-up, scheduling, CRM, and review automation.",
  metadataBase: new URL(siteConfig.domain),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bartlett Labs | AI Growth Systems for Houston Service Businesses",
    description:
      "Founder-led missed-call recovery, AI follow-up, scheduling, CRM, and review automation for Houston-area service businesses.",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bartlett Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Bartlett_Labs",
    creator: "@Bartlett_Labs",
    title: "Bartlett Labs | AI Growth Systems for Houston Service Businesses",
    description:
      "Founder-led missed-call recovery, AI follow-up, scheduling, CRM, and review automation for Houston-area service businesses.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} ${montserrat.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://api.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://link.msgsndr.com" />
        <link rel="dns-prefetch" href="https://formspree.io" />
        <JsonLd />
      </head>
      <body>
        <MetaPixel />
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
