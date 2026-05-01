import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "SMS Opt-Out | Bartlett Labs",
  description:
    "Stop receiving text messages from Bartlett Labs and review the available opt-out paths.",
  alternates: {
    canonical: "/sms-opt-out",
  },
  openGraph: {
    title: "SMS Opt-Out | Bartlett Labs",
    description:
      "Use reply STOP or one of the manual contact paths to change Bartlett Labs text-message preferences.",
    url: "https://bartlettlabs.io/sms-opt-out",
    siteName: "Bartlett Labs",
    type: "website",
  },
};

const optOutMethods = [
  {
    title: "Reply STOP",
    body: "The fastest option is to reply STOP to any Bartlett Labs text message. That opt-out path should take effect inside the messaging thread itself.",
  },
  {
    title: "Email Bartlett Labs",
    body: "If you want a written record, send a request directly by email and include the mobile number you want removed from future texting.",
  },
  {
    title: "Use the contact page",
    body: "You can also send an opt-out request through the contact page if that is easier than replying inside a text thread.",
  },
] as const;

const afterOptOut = [
  "You should no longer receive new text messages unless you complete a fresh consent flow later.",
  "A thread-based STOP request is the clearest path because it is tied directly to the message stream.",
  "Manual requests by email or contact form should still be honored, but they may require a short human review instead of an immediate automated response.",
] as const;

const relatedLinks = [
  { label: "SMS Opt-In", href: "/sms-opt-in" },
  { label: "Email Opt-Out", href: "/email-opt-out" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Data Deletion", href: "/data-deletion" },
] as const;

export default function SMSOptOutPage() {
  return (
    <PageShell>
      <main>
        <PageHero
          eyebrow="Compliance"
          title="SMS Opt-Out"
          description="If you want Bartlett Labs to stop sending text messages, reply STOP to any message first. The other paths on this page stay available if you need a manual update."
          actions={
            <>
              <a
                href={`mailto:${siteConfig.email}?subject=SMS%20Opt-Out`}
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
              <span className="eyebrow">Fastest Path</span>
              <h2
                className="mt-4 text-3xl"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Reply STOP.
              </h2>
              <p
                className="mt-4 text-sm leading-7"
                style={{ color: "var(--color-text-muted)" }}
              >
                That keeps the opt-out request connected to the same thread and
                is the cleanest path for future compliance records.
              </p>
            </div>
          }
        />

        <section className="section-tight">
          <div className="container-bl">
            <SectionIntro
              eyebrow="How To Opt Out"
              title="Use the path that matches the way you reached Bartlett Labs."
              description="The text-thread command is best, but manual requests are still available."
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {optOutMethods.map((item) => (
                <article key={item.title} className="site-panel p-6 md:p-7">
                  <span className="eyebrow">Option</span>
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
                eyebrow="After Opt-Out"
                title="What changes after you opt out."
                description="This page is about message preferences, not deleting the rest of your contact record."
              />
              <ul className="grid gap-4">
                {afterOptOut.map((item) => (
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
              <span className="eyebrow">Need To Rejoin?</span>
              <div
                className="mt-4 grid gap-4 text-sm leading-7"
                style={{ color: "var(--color-text-muted)" }}
              >
                <p>
                  If you want texts again later, use a fresh consent path
                  through the original contact or booking flow instead of relying
                  on an old thread.
                </p>
                <p>
                  If you are unsure which path applies, email{" "}
                  <a href={`mailto:${siteConfig.email}`} className="site-link">
                    {siteConfig.email}
                  </a>{" "}
                  and Bartlett Labs can point you to the right re-consent step.
                </p>
                <p>
                  For help inside a text thread, reply <strong>HELP</strong>.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-bl grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="site-panel p-6 md:p-7">
              <SectionIntro
                eyebrow="Manual Request"
                title="Prefer a written record outside the text thread?"
                description="Email works well if you want a copy of the request in your own inbox."
              />
              <p
                className="text-sm leading-7"
                style={{ color: "var(--color-text-muted)" }}
              >
                Send an email to{" "}
                <a
                  href={`mailto:${siteConfig.email}?subject=SMS%20Opt-Out&body=Please%20remove%20my%20mobile%20number%20from%20future%20Bartlett%20Labs%20text%20messages.%0A%0AMobile%20number:%20`}
                  className="site-link"
                >
                  {siteConfig.email}
                </a>{" "}
                with the mobile number you want removed from future text
                communication.
              </p>
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
