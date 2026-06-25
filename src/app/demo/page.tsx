import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { DemoCallWidget } from "@/components/DemoCallWidget";

export const metadata: Metadata = {
  title: "Live Demo | Bartlett Labs",
  description:
    "Hear the Bartlett Labs AI receptionist answer a call and book an appointment. Call our demo line, or have it call you and book you by name.",
  alternates: {
    canonical: "/demo",
  },
};

export default function DemoPage() {
  return (
    <PageShell>
      <main className="section-spacing">
        <div className="container-bl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Live Demo</span>
            <h1
              className="mt-4 text-4xl md:text-5xl"
              style={{ color: "var(--color-text-heading)", fontFamily: "var(--font-display)" }}
            >
              Hear your phone get answered — right now.
            </h1>
            <p className="mt-5 text-base leading-8" style={{ color: "var(--color-text-muted)" }}>
              This is the same AI receptionist Bartlett Labs installs for service businesses. Call our
              demo line, or have it call you and book you an appointment by name — exactly how it
              answers for your customers.
            </p>
          </div>
          <div className="mt-12">
            <DemoCallWidget />
          </div>
        </div>
      </main>
    </PageShell>
  );
}
