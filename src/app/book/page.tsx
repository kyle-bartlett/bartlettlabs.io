import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Book | Bartlett Labs",
  description:
    "Book a strategy call with Bartlett Labs using the embedded calendar and review the related privacy and message-preference links.",
  alternates: {
    canonical: "/book",
  },
};

const complianceLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "SMS Opt-Out", href: "/sms-opt-out" },
  { label: "Email Opt-Out", href: "/email-opt-out" },
] as const;

const bookingNotes = [
  "This calendar is powered by HighLevel but stays embedded inside Bartlett Labs so the related compliance pages remain easy to reach.",
  "If you enter a mobile number, the consent language shown in the booking form governs text-message preferences for that scheduling flow.",
  "If the embedded calendar gives you trouble, open it directly in a new tab or email Kyle instead.",
] as const;

export default function BookPage() {
  return (
    <PageShell>
      <main>
        <PageHero
          eyebrow="Book"
          title="Pick a time without losing the context."
          description="Use the calendar below to book a strategy call with Bartlett Labs. The booking flow stays on a Bartlett Labs page so privacy, terms, and message-preference links remain visible while you schedule."
          actions={
            <>
              <a
                href={siteConfig.booking.externalUrl}
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Open Calendar in New Tab
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn-secondary">
                Email Kyle Instead
              </a>
            </>
          }
          aside={
            <div className="site-panel p-6 md:p-7">
              <span className="eyebrow">Before You Submit</span>
              <h2
                className="mt-4 text-3xl"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Compliance links stay visible here.
              </h2>
              <div className="mt-5 grid gap-3">
                {complianceLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="site-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          }
        />

        <section className="section-tight">
          <div className="container-bl">
            <SectionIntro
              eyebrow="Calendar"
              title="Book directly on the Bartlett Labs site."
              description="This keeps the booking experience simple while still giving you a direct path to the relevant compliance pages."
            />
            <div className="site-panel p-3 md:p-4">
              <iframe
                src={siteConfig.booking.externalUrl}
                title="Bartlett Labs booking calendar"
                className="min-h-[760px] w-full rounded-[1.6rem] border-0 bg-white"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-bl grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div className="site-panel p-6 md:p-7">
              <SectionIntro
                eyebrow="Notes"
                title="A few quick expectations."
                description="Nothing fancy here. Just the things worth knowing before you submit the form."
              />
              <ul className="grid gap-4">
                {bookingNotes.map((item) => (
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
            </div>

            <aside className="site-panel p-6 md:p-7">
              <span className="eyebrow">Need a Different Path?</span>
              <div
                className="mt-4 grid gap-4 text-sm leading-7"
                style={{ color: "var(--color-text-muted)" }}
              >
                <p>
                  If you would rather send context first, use the{" "}
                  <Link href="/contact" className="site-link">
                    contact page
                  </Link>
                  .
                </p>
                <p>
                  If you later want to change message preferences, use{" "}
                  <Link href="/sms-opt-out" className="site-link">
                    SMS Opt-Out
                  </Link>{" "}
                  or{" "}
                  <Link href="/email-opt-out" className="site-link">
                    Email Opt-Out
                  </Link>
                  .
                </p>
                <p>
                  Direct help is always available at{" "}
                  <a href={`mailto:${siteConfig.email}`} className="site-link">
                    {siteConfig.email}
                  </a>
                  .
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
