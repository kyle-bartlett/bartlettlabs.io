import type { Metadata } from "next";
import { workItems } from "@/content/work";
import { FinalCallout } from "@/components/site/FinalCallout";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import { WorkCard } from "@/components/site/WorkCard";

export const metadata: Metadata = {
  title: "Work | Bartlett Labs",
  description:
    "Demo sites and systems built for real local businesses to show what is possible with clearer websites and better business systems.",
};

export default function WorkPage() {
  return (
    <PageShell>
      <main>
        <section className="section-spacing">
          <div className="container-bl">
            <SectionIntro
              eyebrow="Demo Work"
              title="Honest proof beats invented metrics."
              description="The internet is full of fake agency dashboards and made-up statistics. These demo concepts are labeled honestly on purpose and built specifically for the types of trades and service businesses keeping the Houston area running."
            />
          </div>
        </section>

        <section className="section-tight">
          <div className="container-bl grid gap-8">
            {workItems.map((item) => (
              <WorkCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <FinalCallout
          eyebrow="Next Project"
          title="Want your business to be next?"
          description="If you want a site or system built around your actual business instead of a generic template, start with a short conversation."
          primaryHref="/book"
          primaryLabel="Book a Strategy Call"
          secondaryHref="/contact"
          secondaryLabel="Contact Bartlett Labs"
        />
      </main>
    </PageShell>
  );
}
