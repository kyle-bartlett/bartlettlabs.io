import type { Metadata } from "next";
import Link from "next/link";
import ROICalculator from "@/components/ROICalculator";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "ROI Calculator | Bartlett Labs",
  description:
    "Use this planning calculator to pressure-test what a stronger website, booking flow, or follow-up system could be worth for your business.",
  alternates: {
    canonical: "/calculator",
  },
  openGraph: {
    title: "ROI Calculator | Bartlett Labs",
    description:
      "A planning calculator for estimating the possible impact of website, lead-capture, and workflow improvements.",
    url: "https://bartlettlabs.io/calculator",
    siteName: "Bartlett Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Bartlett_Labs",
    title: "ROI Calculator | Bartlett Labs",
    description:
      "Use this planning calculator to estimate the possible impact of website and workflow improvements.",
  },
};

const calculatorStructuredData = [
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
        name: "ROI Calculator",
        item: "https://bartlettlabs.io/calculator",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://bartlettlabs.io/calculator#app",
    name: "Bartlett Labs ROI Calculator",
    description:
      "A free planning calculator that helps small businesses estimate the possible impact of better lead capture, booking, and follow-up systems.",
    url: "https://bartlettlabs.io/calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      "@id": "https://bartlettlabs.io/#organization",
      name: "Bartlett Labs",
    },
    featureList: [
      "Directional revenue increase estimate",
      "Traffic change estimate",
      "Directional ROI math",
      "Industry and online-presence assumptions",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How accurate is this calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This calculator is a directional planning tool, not a promise. It uses your inputs plus broad business assumptions so you can pressure-test what stronger lead capture, booking, and follow-up systems might be worth.",
        },
      },
      {
        "@type": "Question",
        name: "What kinds of improvements is this estimate meant to represent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The estimate is meant to represent a mix of practical upgrades such as a clearer website, stronger booking flow, better lead capture, and more consistent automation around follow-up.",
        },
      },
      {
        "@type": "Question",
        name: "Does using the calculator obligate me to book anything?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The calculator is free to use. If you want help turning the number into a concrete plan, you can book a strategy call or email Bartlett Labs directly.",
        },
      },
    ],
  },
] as const;

const planningHighlights = [
  {
    value: siteConfig.metrics.automations,
    label: "automations built across websites, chatbots, and workflow systems",
  },
  {
    value: `${siteConfig.metrics.experienceYears} years`,
    label: "across Sears, Belk, Apple, and Anker after Purdue",
  },
  {
    value: "Directional only",
    label: "Use the output as a planning estimate, not a guaranteed outcome",
  },
] as const;

const calculatorNotes = [
  "Your actual result depends on the offer, the sales process, local competition, and whether follow-up improves after launch.",
  "A better website alone is rarely the whole answer. The biggest lift often comes from pairing the site with booking, lead capture, and clearer follow-through.",
  "If the estimate looks interesting, the next step is figuring out which one useful system would move the needle first.",
] as const;

const faqCards = [
  {
    question: "What does this number actually help me decide?",
    answer:
      "It helps you decide whether the opportunity is small, meaningful, or worth a deeper conversation. It is a framing tool, not a contract.",
  },
  {
    question: "What kinds of businesses is this most useful for?",
    answer:
      "It is most useful for local service businesses that rely on inbound leads, scheduling, follow-up, and a first impression online.",
  },
  {
    question: "What happens if my inputs are rough guesses?",
    answer:
      "That is fine. Rough inputs still make the calculator useful because the goal is to estimate direction and magnitude, not pretend the math is perfect.",
  },
  {
    question: "What should I do after I use it?",
    answer:
      "Use the result to decide whether a short strategy call is worth it. From there, we can narrow the conversation to one practical system instead of a giant overhaul.",
  },
] as const;

export default function CalculatorPage() {
  return (
    <PageShell>
      <main>
        {calculatorStructuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        <PageHero
          eyebrow="Calculator"
          title="ROI Calculator"
          description="Use this planning tool to pressure-test what better lead capture, booking, and follow-up could be worth for your business. The output is directional by design so you can make a calmer decision about what to fix first."
          actions={
            <>
              <a href={siteConfig.booking.path} className="btn-primary">
                Book a Strategy Call
              </a>
              <Link href="/contact" className="btn-secondary">
                Email Your Numbers
              </Link>
            </>
          }
          aside={
            <div className="site-panel p-6 md:p-7">
              <span className="eyebrow">What It Covers</span>
              <h2
                className="mt-4 text-3xl"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Direction first, certainty later.
              </h2>
              <p
                className="mt-4 text-sm leading-7"
                style={{ color: "var(--color-text-muted)" }}
              >
                This estimate is meant to help you decide whether the problem is
                worth solving, not to lock you into a forecast. If the number
                looks meaningful, we can scope the real opportunity next.
              </p>
            </div>
          }
        />

        <section className="section-tight">
          <div className="container-bl">
            <SectionIntro
              eyebrow="Planning Tool"
              title="Run the estimate."
              description="Adjust the sliders, choose your industry, and use the result as a planning number for the next conversation."
            />
            <div className="site-panel p-6 md:p-8">
              <ROICalculator />
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-bl">
            <SectionIntro
              eyebrow="Context"
              title="A few things worth knowing before you trust the number."
              description="The goal here is useful direction, not fake precision."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {planningHighlights.map((item) => (
                <article key={item.value} className="site-panel p-6 md:p-7">
                  <p
                    className="text-4xl"
                    style={{
                      color: "var(--color-text-heading)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {item.value}
                  </p>
                  <p
                    className="mt-4 text-sm leading-7"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {item.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-bl grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <article className="site-panel p-6 md:p-7">
              <SectionIntro
                eyebrow="FAQ"
                title="Common questions about the estimate."
                description="Short answers for how to use the output without over-reading it."
              />
              <div className="grid gap-4">
                {faqCards.map((item) => (
                  <div key={item.question} className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/70 p-5">
                    <h3
                      className="text-xl"
                      style={{
                        color: "var(--color-text-heading)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {item.question}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-7"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="site-panel p-6 md:p-7">
              <span className="eyebrow">Good Next Step</span>
              <h2
                className="mt-4 text-3xl"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Use the result to pick one useful system.
              </h2>
              <ul className="mt-6 grid gap-4">
                {calculatorNotes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-7"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 rounded-full"
                      style={{ backgroundColor: "var(--color-cyan-dark)" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-secondary">
                  Contact Kyle
                </Link>
                <a href={siteConfig.booking.path} className="btn-primary">
                  Book a Strategy Call
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
