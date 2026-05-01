import type { Metadata } from "next";
import { GrowthSystemHome } from "@/components/site/GrowthSystemHome";
import { PageShell } from "@/components/site/PageShell";

export const metadata: Metadata = {
  title: "Bartlett Labs | AI Growth System for Houston Service Businesses",
  description:
    "Bartlett Labs builds practical AI systems for Houston-area service businesses: missed-call recovery, follow-up, scheduling, CRM, and review automation.",
};

export default function HomePage() {
  return (
    <PageShell>
      <GrowthSystemHome />
    </PageShell>
  );
}
