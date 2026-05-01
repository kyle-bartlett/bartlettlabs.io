import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "AI Readiness Quiz | Bartlett Labs | How Ready Is Your Business?",
  description:
    "Take our free 2-minute AI Readiness Quiz to find out if your business is ready for automation. Get a personalized score and actionable recommendations. Bartlett Labs, Crosby, TX.",
  alternates: {
    canonical: "/quiz",
  },
  openGraph: {
    title: "AI Readiness Quiz | Bartlett Labs",
    description:
      "Find out how ready your business is for AI automation. Free 2-minute quiz with personalized recommendations.",
    url: "https://bartlettlabs.io/quiz",
    siteName: "Bartlett Labs",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Readiness Quiz - Bartlett Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Bartlett_Labs",
    title: "AI Readiness Quiz | Bartlett Labs",
    description:
      "How ready is your business for AI? Take our free 2-minute quiz and find out.",
    images: ["/og-image.png"],
  },
};

const quizStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://bartlettlabs.io",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Readiness Quiz",
        item: "https://bartlettlabs.io/quiz",
      },
    ],
  },
];

export default function QuizPage() {
  return (
    <PageShell>
      <main className="relative pt-16 pb-20 px-6">
        <div className="mx-auto max-w-3xl">
          {quizStructuredData.map((schema, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))}

          {/* Page header */}
          <div className="fade-in-section mb-12 pt-8 text-center">
            <p
              className="label-mono mb-3 text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#06b6d4" }}
            >
              Free Assessment
            </p>
            <h1
              className="font-heading text-4xl font-bold tracking-tight sm:text-5xl dk-text-heading"
              style={{ color: "#0f172a" }}
            >
              AI Readiness Quiz
            </h1>
            <p
              className="mx-auto mt-4 max-w-2xl text-lg dk-text-muted"
              style={{ color: "#64748b" }}
            >
              Answer 7 quick questions about your operations and get a
              personalized score with actionable recommendations. Takes about 2
              minutes.
            </p>
          </div>

          <QuizClient />
        </div>
      </main>
    </PageShell>
  );
}
