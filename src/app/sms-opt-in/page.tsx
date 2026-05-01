import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "SMS Opt-In | Bartlett Labs",
  description:
    "Review how Bartlett Labs collects SMS consent for inquiry follow-up, scheduling, project communication, and support.",
  alternates: {
    canonical: "/sms-opt-in",
  },
  openGraph: {
    title: "SMS Opt-In | Bartlett Labs",
    description:
      "See how Bartlett Labs handles non-marketing SMS consent and where to manage message preferences.",
    url: "https://bartlettlabs.io/sms-opt-in",
    siteName: "Bartlett Labs",
    type: "website",
  },
};

const collectionPaths = [
  {
    title: "Contact form",
    body: "If you share a mobile number on the contact page, Bartlett Labs only treats that as text-message permission when you explicitly check the SMS consent box.",
  },
  {
    title: "Booking calendar",
    body: "Calendar bookings run through HighLevel, where consent and message preferences are presented inside the booking flow itself.",
  },
  {
    title: "Direct written request",
    body: "You can also confirm text-message consent directly in writing by email when we are already coordinating an inquiry or active project.",
  },
] as const;

const messageUses = [
  "Follow up on a website or automation inquiry you sent to Bartlett Labs.",
  "Confirm, reschedule, or coordinate a booked strategy call.",
  "Send project, delivery, or service updates tied to active work.",
  "Reply to direct support questions that you asked us to handle by text.",
] as const;

const relatedLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "SMS Opt-Out", href: "/sms-opt-out" },
  { label: "Email Opt-Out", href: "/email-opt-out" },
  { label: "Contact", href: "/contact" },
] as const;

export default function SMSOptInPage() {
  return (
    <PageShell>
      <main>
        <PageHero
          eyebrow="Compliance"
          title="SMS Opt-In"
          description="This page explains how Bartlett Labs collects permission before sending text messages about inquiries, scheduling, project communication, or support. It is an explanation page, not a standalone sign-up form."
          actions={
            <>
              <Link href="/contact" className="btn-primary">
                Go to Contact
              </Link>
              <a href={siteConfig.booking.path} className="btn-secondary">
                Open the Booking Flow
              </a>
            </>
          }
          aside={
            <div className="site-panel p-6 md:p-7">
              <span className="eyebrow">Core Disclosure</span>
              <h2
                className="mt-4 text-3xl"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                The short version.
              </h2>
              <div
                className="mt-5 grid gap-3 text-sm leading-7"
                style={{ color: "var(--color-text-muted)" }}
              >
                <p>Message frequency varies.</p>
                <p>Message and data rates may apply.</p>
                <p>
                  Reply <strong>STOP</strong> to opt out or <strong>HELP</strong> for
                  help.
                </p>
                <p>
                  Review the{" "}
                  <Link href="/privacy" className="site-link">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="site-link">
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
            </div>
          }
        />

        <section className="section-tight">
          <div className="container-bl">
            <SectionIntro
              eyebrow="Where Consent Happens"
              title="Bartlett Labs uses specific intake points instead of a generic SMS signup page."
              description="That keeps consent tied to the actual conversation or booking request that triggered it."
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {collectionPaths.map((item) => (
                <article key={item.title} className="site-panel p-6 md:p-7">
                  <span className="eyebrow">Path</span>
                  <h2
                    className="mt-4 text-3xl"
                    style={{
                      color: "var(--color-text-heading)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="mt-4 text-sm leading-7"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-bl grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="site-panel p-6 md:p-7">
              <SectionIntro
                eyebrow="What Messages Cover"
                title="Bartlett Labs uses text messaging for operational communication, not vague list growth."
                description="If you opt in, texts are limited to the type of conversation you asked Bartlett Labs to handle."
              />
              <ul className="grid gap-4">
                {messageUses.map((item) => (
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
              <span className="eyebrow">Important Boundary</span>
              <h2
                className="mt-4 text-3xl"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                No bundled marketing consent here.
              </h2>
              <div
                className="mt-4 grid gap-4 text-sm leading-7"
                style={{ color: "var(--color-text-muted)" }}
              >
                <p>
                  Bartlett Labs does not use this page to collect promotional
                  SMS consent.
                </p>
                <p>
                  If marketing or promotional texting is ever introduced later,
                  it should be collected through a separate consent choice before
                  any such messages are sent.
                </p>
                <p>
                  If you need to stop texts, use the{" "}
                  <Link href="/sms-opt-out" className="site-link">
                    SMS Opt-Out
                  </Link>{" "}
                  page at any time.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-bl grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="site-panel p-6 md:p-7">
              <SectionIntro
                eyebrow="Contact Details"
                title="Need help managing message preferences?"
                description="You can handle changes directly by text, or contact Bartlett Labs in writing if you want a manual paper trail."
              />
              <div
                className="grid gap-3 text-sm leading-7"
                style={{ color: "var(--color-text-muted)" }}
              >
                <p>
                  Reply <strong>HELP</strong> to a text message for help or{" "}
                  <strong>STOP</strong> to opt out.
                </p>
                <p>
                  Email{" "}
                  <a href={`mailto:${siteConfig.email}`} className="site-link">
                    {siteConfig.email}
                  </a>{" "}
                  if you want written confirmation or need a manual update.
                </p>
              </div>
            </div>

            <aside className="site-panel p-6 md:p-7">
              <span className="eyebrow">Related Pages</span>
              <div className="mt-5 grid gap-3">
                {relatedLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="site-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
