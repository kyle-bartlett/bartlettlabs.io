import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/content/site";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Bartlett Labs",
  description:
    "Start a conversation with Bartlett Labs about websites, AI chatbots, workflow automation, or consulting for your business.",
  alternates: {
    canonical: "/contact",
  },
};

const fitSignals = [
  "You already know the process is messy, but you are not sure whether the fix is a website, automation, or both.",
  "Leads are slipping through because follow-up is slow, manual, or inconsistent.",
  "Your site looks outdated and you need a cleaner first impression online.",
  "You want one practical recommendation instead of a giant digital overhaul.",
] as const;

const contactNotes = [
  "What the business does",
  "What feels broken right now",
  "What outcome would actually help",
  "Any deadline or timing pressure",
] as const;

export default function ContactPage() {
  return (
    <PageShell>
      <main>
        <PageHero
          eyebrow="Contact"
          title="Start with one useful system."
          description="If you know exactly what is broken, tell me. If you only know the current process is wasting time, that is enough to start the conversation too."
          actions={
            <>
              <a href={siteConfig.booking.path} className="btn-primary">
                Book a Strategy Call
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn-secondary">
                Email Kyle
              </a>
            </>
          }
          aside={
            <div className="site-panel p-6 md:p-7">
              <span className="eyebrow">Direct Contact</span>
              <h2
                className="mt-4 text-3xl"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Reach out the simple way.
              </h2>
              <div className="mt-6 grid gap-4 text-sm leading-7">
                <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--color-text-heading)" }}>
                  {siteConfig.email}
                </a>
                <a href={`tel:${siteConfig.phone.raw}`} style={{ color: "var(--color-text-heading)" }}>
                  {siteConfig.phone.display}
                </a>
                <p style={{ color: "var(--color-text-muted)" }}>
                  {siteConfig.city}, {siteConfig.state}
                  {" · "}
                  {siteConfig.regionLabel}
                </p>
              </div>
              <a href={siteConfig.booking.path} className="btn-primary mt-7 w-fit">
                Book a Strategy Call
              </a>
            </div>
          }
        />

        <section className="section-tight">
          <div className="container-bl grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
            <ContactForm />

            <div className="grid gap-6">
              <article className="site-panel p-6 md:p-7">
                <span className="eyebrow">Good Fit</span>
                <h2
                  className="mt-4 text-3xl"
                  style={{
                    color: "var(--color-text-heading)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Usually a good time to reach out.
                </h2>
                <ul className="mt-6 grid gap-4">
                  {fitSignals.map((item) => (
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
              </article>

              <article className="site-panel p-6 md:p-7">
                <span className="eyebrow">Helpful Context</span>
                <h2
                  className="mt-4 text-3xl"
                  style={{
                    color: "var(--color-text-heading)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  A few things that help me scope faster.
                </h2>
                <ul className="mt-6 grid gap-4">
                  {contactNotes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-7"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 rounded-full"
                        style={{ backgroundColor: "var(--color-burnt-orange)" }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-bl">
            <SectionIntro
              eyebrow="Calendar"
              title="Prefer to grab a time now?"
              description="Use the calendar below if you would rather skip the back and forth and pick an open slot directly."
            />
            <div className="site-panel p-3 md:p-4">
              <iframe
                src={siteConfig.booking.externalUrl}
                title="Bartlett Labs booking calendar"
                className="min-h-[720px] w-full rounded-[1.6rem] border-0 bg-white"
                loading="lazy"
              />
            </div>
            <div className="site-panel mt-5 p-6 md:p-7">
              <span className="eyebrow">Calendar Note</span>
              <div className="mt-4 grid gap-4 text-sm leading-7">
                <p style={{ color: "var(--color-text-muted)" }}>
                  This booking flow is powered by HighLevel. If you enter a
                  mobile number there, message preferences are managed inside
                  that booking form and the related Bartlett Labs compliance
                  pages below stay available any time.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/privacy" className="site-link">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="site-link">
                    Terms of Service
                  </Link>
                  <Link href="/sms-opt-out" className="site-link">
                    SMS Opt-Out
                  </Link>
                  <Link href="/email-opt-out" className="site-link">
                    Email Opt-Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
