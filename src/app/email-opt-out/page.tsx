import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Email Opt-Out | Bartlett Labs",
  description:
    "Stop receiving non-transactional emails from Bartlett Labs and review the available opt-out methods.",
  alternates: {
    canonical: "/email-opt-out",
  },
  openGraph: {
    title: "Email Opt-Out | Bartlett Labs",
    description:
      "Review the available email unsubscribe methods and contact Bartlett Labs directly if you need help.",
    url: "https://bartlettlabs.io/email-opt-out",
    siteName: "Bartlett Labs",
    type: "website",
  },
};

const unsubscribeOptions = [
  {
    title: "Use the unsubscribe link",
    body: "The fastest option is the unsubscribe link in any email from Bartlett Labs. That removes you from future non-transactional email updates.",
  },
  {
    title: "Email Kyle directly",
    body: "If the link is missing or you want written confirmation, send a short opt-out request directly and include the email address you want removed.",
  },
  {
    title: "Use the contact page",
    body: "If email is not convenient, you can also send the request through the contact form and note that it is an email opt-out request.",
  },
] as const;

const relatedLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "SMS Opt-Out", href: "/sms-opt-out" },
  { label: "Data Deletion", href: "/data-deletion" },
] as const;

export default function EmailOptOutPage() {
  return (
    <PageShell>
      <main>
        <PageHero
          eyebrow="Compliance"
          title="Email Opt-Out"
          description="If you want Bartlett Labs to stop sending non-transactional email updates, use any of the options below. This page exists so the opt-out path stays easy to find."
          actions={
            <>
              <a
                href={`mailto:${siteConfig.email}?subject=Email%20Opt-Out`}
                className="btn-primary"
              >
                Email Kyle
              </a>
              <Link href="/contact" className="btn-secondary">
                Use the Contact Page
              </Link>
            </>
          }
          aside={
            <div className="site-panel p-6 md:p-7">
              <span className="eyebrow">Direct Request</span>
              <h2
                className="mt-4 text-3xl"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Prefer a simple written request?
              </h2>
              <p
                className="mt-4 text-sm leading-7"
                style={{ color: "var(--color-text-muted)" }}
              >
                Send an email opt-out request to{" "}
                <a href={`mailto:${siteConfig.email}`} className="site-link">
                  {siteConfig.email}
                </a>{" "}
                and include the address you want removed from future email
                updates.
              </p>
            </div>
          }
        />

        <section className="section-tight">
          <div className="container-bl grid gap-6 lg:grid-cols-3">
            {unsubscribeOptions.map((option) => (
              <article key={option.title} className="site-panel p-6 md:p-7">
                <span className="eyebrow">Option</span>
                <h2
                  className="mt-4 text-3xl"
                  style={{
                    color: "var(--color-text-heading)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {option.title}
                </h2>
                <p
                  className="mt-4 text-sm leading-7"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {option.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-bl grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="site-panel p-6 md:p-7">
              <SectionIntro
                eyebrow="What This Covers"
                title="What you can expect after opting out."
                description="This page is for regular email updates and non-transactional communication. Transactional emails tied to an active project, account security, receipts, or direct one-to-one support may still be necessary."
              />
              <div
                className="grid gap-4 text-sm leading-7"
                style={{ color: "var(--color-text-muted)" }}
              >
                <p>
                  Use the unsubscribe link in any email if that is available.
                  If not, email{" "}
                  <a href={`mailto:${siteConfig.email}`} className="site-link">
                    {siteConfig.email}
                  </a>{" "}
                  with the subject line <strong>Email Opt-Out</strong>.
                </p>
                <p>
                  If you need text-message preferences instead, use the{" "}
                  <Link href="/sms-opt-out" className="site-link">
                    SMS Opt-Out
                  </Link>{" "}
                  page.
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
