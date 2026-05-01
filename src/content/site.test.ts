import {
  footerComplianceLinks,
  footerSecondaryLinks,
  primaryNavLinks,
  siteConfig,
} from "./site";

describe("site content", () => {
  it("uses the approved canonical business facts", () => {
    expect(siteConfig.metrics.automations).toBe("300+");
    expect(siteConfig.metrics.experienceYears).toBe("13");
    expect(siteConfig.booking.path).toBe("/book");
    expect(siteConfig.booking.externalUrl).toContain("leadconnectorhq.com");
  });

  it("uses the approved audit-first primary navigation", () => {
    expect(primaryNavLinks.map((item) => item.label)).toEqual([
      "How It Works",
      "Demos",
      "Pricing",
      "Work",
      "About",
      "Contact",
    ]);
  });

  it("keeps low-priority links in the footer only", () => {
    expect(footerSecondaryLinks.map((item) => item.label)).toEqual([
      "Quiz",
      "Calculator",
      "Store",
    ]);
  });

  it("keeps compliance and opt-out links visible in the footer", () => {
    expect(footerComplianceLinks.map((item) => item.label)).toEqual([
      "Privacy Policy",
      "Terms of Service",
      "Email Opt-Out",
      "SMS Opt-In",
      "SMS Opt-Out",
      "Data Deletion",
    ]);
  });
});
