import fs from "node:fs";
import path from "node:path";

const removedLegacyFiles = [
  "components/ui/DiagnosticAudit.tsx",
  "components/ui/ProofOfConcept.tsx",
  "components/ui/SecurityBadge.tsx",
  "components/ui/ServiceBentoGrid.tsx",
  "components/ui/WorkshopBaseplate.tsx",
  "src/components/AuditButton.tsx",
  "src/components/CalendlyButton.tsx",
  "src/components/CaseStudies.tsx",
  "src/components/ChatWidget.tsx",
  "src/components/ChatWidgetLoader.tsx",
  "src/components/ContactSection.tsx",
  "src/components/DiagnosticAudit.tsx",
  "src/components/Footer.tsx",
  "src/components/FAQ.tsx",
  "src/components/FinalCTA.tsx",
  "src/components/Founder.tsx",
  "src/components/Header.tsx",
  "src/components/Hero.tsx",
  "src/components/HeroCanvas.tsx",
  "src/components/HeroVisual.tsx",
  "src/components/HowItWorks.tsx",
  "src/components/Pricing.tsx",
  "src/components/Proof.tsx",
  "src/components/ScrollReveal.tsx",
  "src/components/Services.tsx",
  "src/components/ThemeToggle.tsx",
  "src/components/Testimonials.tsx",
  "src/components/TrustBanner.tsx",
] as const;

describe("legacy component cleanup", () => {
  it("removes orphaned pre-rebuild components that are no longer part of the live site", () => {
    const remaining = removedLegacyFiles.filter((file) =>
      fs.existsSync(path.join(process.cwd(), file)),
    );

    expect(remaining).toEqual([]);
  });
});
