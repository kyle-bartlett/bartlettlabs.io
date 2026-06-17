import type { Metadata } from "next";
import Script from "next/script";
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
      {/*
        LeadConnector chat widget — HOMEPAGE ONLY (A2P / SMS compliance).
        COMPLIANCE RULE: do NOT move this to app/layout.tsx (global) or add it to
        any page that has a form collecting a phone number or SMS consent
        (e.g. /contact, /book, /sms-opt-in, /calculator). On this page the widget
        must remain the ONLY SMS opt-in method — the homepage has no forms.
      */}
      <Script
        src="https://beta.leadconnectorhq.com/loader.js"
        data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="69f82390cc1c63b25b23ba6f"
        strategy="afterInteractive"
      />
    </PageShell>
  );
}
