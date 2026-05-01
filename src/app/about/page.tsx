import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { FinalCallout } from "@/components/site/FinalCallout";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { PhotoPlaceholder } from "@/components/site/PhotoPlaceholder";
import { SectionIntro } from "@/components/site/SectionIntro";

export const metadata: Metadata = {
  title: "About | Bartlett Labs",
  description:
    "Meet Kyle Bartlett, the founder behind Bartlett Labs: a Purdue-trained engineer with 13 years across Sears, Belk, Apple, and Anker.",
  alternates: {
    canonical: "/about",
  },
};

const careerStops = [
  {
    name: "Purdue",
    title: "Engineering foundation",
    description:
      "Purdue gave me the systems mindset that still drives how I scope, simplify, and build today.",
  },
  {
    name: "Sears",
    title: "Planning at scale",
    description:
      "I learned how fragile big operations become when the underlying process is messy or unclear.",
  },
  {
    name: "Belk",
    title: "Retail rhythm",
    description:
      "Belk reinforced how much better decisions get when the data, process, and operators are finally in sync.",
  },
  {
    name: "Apple",
    title: "High-standard execution",
    description:
      "Apple sharpened my bias toward detail, clear ownership, and building systems that people can actually trust.",
  },
  {
    name: "Anker",
    title: "Current seat",
    description:
      "At Anker, I still work close to planning, automation, and process cleanup, which keeps the work practical and current.",
  },
] as const;

const workingPrinciples = [
  {
    title: "Founder-led communication",
    description:
      "If we work together, you talk to me directly. No account-layer confusion, no handoff maze.",
  },
  {
    title: "Useful over impressive",
    description:
      "I would rather ship one system that saves real time every week than sell a flashy idea that never sticks.",
  },
  {
    title: "Built to hand off cleanly",
    description:
      "The goal is not dependency. The goal is a site or workflow you can understand, use, and own.",
  },
] as const;

export default function AboutPage() {
  return (
    <PageShell>
      <main>
        <PageHero
          eyebrow="About"
          title="About"
          description="I'm Kyle Bartlett. Bartlett Labs is where I bring enterprise operations discipline into websites, AI chatbots, and workflow automation for local businesses."
          actions={
            <>
              <a href={siteConfig.booking.path} className="btn-primary">
                Book a Strategy Call
              </a>
              <Link href="/work" className="btn-secondary">
                See demo work
              </Link>
            </>
          }
          aside={<PhotoPlaceholder {...siteConfig.placeholders.aboutPhoto} />}
        />

        <section className="section-tight">
          <div className="container-bl grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <SectionIntro
                eyebrow="How I Got Here"
                title="I learned inside big systems, then brought that same rigor to small business work."
                description="The through line has always been operations: figuring out what is broken, what is manual, and what keeps causing the same avoidable mess."
              />
              <div className="site-rich-text space-y-5 text-base md:text-lg">
                <p>{siteConfig.founder.hometownStory} That shaped how I think about reputation, follow-through, and doing solid work for real people.</p>
                <p>
                  After Purdue, I went to Sears, then Belk, then Apple, and now
                  Anker. Across those roles, I built systems, planned
                  operations, and watched how small process fixes can ripple
                  through an entire business.
                </p>
                <p>
                  That is the lens behind Bartlett Labs. I am not interested in
                  AI theater or generic agency packaging. I care about useful
                  systems, clean execution, and work that helps an owner feel
                  less buried.
                </p>
              </div>
            </div>

            <aside className="site-panel p-6 md:p-7">
              <span className="eyebrow">What I Bring</span>
              <h2
                className="mt-4 text-3xl"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Operations-first thinking.
              </h2>
              <ul className="mt-6 grid gap-4">
                <li
                  className="flex items-start gap-3 text-sm leading-7"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 rounded-full"
                    style={{ backgroundColor: "var(--color-burnt-orange)" }}
                  />
                  <span>{siteConfig.metrics.experienceYears} years in post-college operations roles</span>
                </li>
                <li
                  className="flex items-start gap-3 text-sm leading-7"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 rounded-full"
                    style={{ backgroundColor: "var(--color-burnt-orange)" }}
                  />
                  <span>{siteConfig.metrics.automations} automations built across planning, reporting, and process workflows</span>
                </li>
                <li
                  className="flex items-start gap-3 text-sm leading-7"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 rounded-full"
                    style={{ backgroundColor: "var(--color-burnt-orange)" }}
                  />
                  <span>Direct founder communication from first call through launch</span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-bl">
            <SectionIntro
              eyebrow="Career Path"
              title="The job titles changed, but the core work stayed familiar."
              description="Planning, systems, process cleanup, and follow-through have been the common thread from Purdue onward."
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {careerStops.map((stop) => (
                <article key={stop.name} className="card-warm p-6">
                  <span className="proof-badge">{stop.name}</span>
                  <h3
                    className="mt-5 text-2xl"
                    style={{
                      color: "var(--color-text-heading)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {stop.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>
                    {stop.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container-bl">
            <SectionIntro
              eyebrow="How I Work"
              title="The relationship should feel clear before the build ever starts."
              description="A lot of web and automation work gets weird because the process feels vague. I try to make the working relationship simple."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {workingPrinciples.map((principle) => (
                <article key={principle.title} className="card-warm p-7">
                  <h3
                    className="text-2xl"
                    style={{
                      color: "var(--color-text-heading)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {principle.title}
                  </h3>
                  <p className="mt-4 leading-7" style={{ color: "var(--color-text-muted)" }}>
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FinalCallout
          eyebrow="Start Here"
          title="If the work sounds like the right fit, start with a short conversation."
          description="We can talk through what feels broken, what should wait, and what one useful system would actually look like for your business."
          primaryHref={siteConfig.booking.path}
          primaryLabel="Book a Strategy Call"
          secondaryHref="/work"
          secondaryLabel="See demo work"
        />
      </main>
    </PageShell>
  );
}
