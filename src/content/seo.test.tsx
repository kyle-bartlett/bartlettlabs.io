import fs from "node:fs";
import path from "node:path";
import JsonLd from "@/components/JsonLd";
import sitemap from "@/app/sitemap";
import { SYSTEM_PROMPT } from "@/lib/chatbot-prompt";
import { siteConfig } from "@/content/site";
import { renderWithProviders } from "@/test/render";

function readPublicFile(fileName: string) {
  return fs.readFileSync(path.join(process.cwd(), "public", fileName), "utf8");
}

describe("SEO truth layer", () => {
  it("removes fake review schema and keeps only the approved service set", () => {
    const { container } = renderWithProviders(<JsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script?.textContent).toBeTruthy();

    const serialized = script?.textContent ?? "";

    expect(serialized).toContain("300+");
    expect(serialized).toContain("13 years");
    expect(serialized).toContain("Belk");
    expect(serialized).toContain("Missed Call Text-Back");
    expect(serialized).toContain("Automated Follow-Ups");
    expect(serialized).toContain("Simple CRM Dashboard");
    expect(serialized).toContain("Consulting & Advisory");

    expect(serialized).not.toContain("AggregateRating");
    expect(serialized).not.toContain('"Review"');
    expect(serialized).not.toContain("Social Media Management");
    expect(serialized).not.toContain("Digital Products");
    expect(serialized).not.toContain("24 hours");
  });

  it("publishes the current information architecture in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(siteConfig.domain);
    expect(urls).toContain(`${siteConfig.domain}/services`);
    expect(urls).toContain(`${siteConfig.domain}/work`);
    expect(urls).toContain(`${siteConfig.domain}/calculator`);
    expect(urls).toContain(`${siteConfig.domain}/quiz`);
    expect(urls).toContain(`${siteConfig.domain}/privacy`);
    expect(urls).toContain(`${siteConfig.domain}/terms`);
    expect(urls).toContain(`${siteConfig.domain}/data-deletion`);
    expect(urls).toContain(`${siteConfig.domain}/email-opt-out`);
    expect(urls).toContain(`${siteConfig.domain}/sms-opt-in`);
    expect(urls).toContain(`${siteConfig.domain}/sms-opt-out`);
    expect(urls).toContain(`${siteConfig.domain}/blog`);
    expect(urls).toContain(`${siteConfig.domain}/industries/hvac`);
    expect(urls).toContain(`${siteConfig.domain}/industries/plumbing`);
    expect(urls).toContain(`${siteConfig.domain}/areas/houston`);
    expect(urls).toContain(`${siteConfig.domain}/areas/crosby`);

    expect(urls).not.toContain(`${siteConfig.domain}/portfolio`);
    expect(urls).not.toContain(`${siteConfig.domain}/testimonials`);
    expect(urls).not.toContain(`${siteConfig.domain}/industries/distribution`);
    expect(urls).not.toContain(`${siteConfig.domain}/industries/energy`);
    expect(urls).not.toContain(`${siteConfig.domain}/industries/healthcare`);
    expect(urls).not.toContain(
      `${siteConfig.domain}/industries/professional-services`,
    );
  });

  it("keeps llms files and chatbot prompt aligned with approved facts", () => {
    const llms = readPublicFile("llms.txt");
    const llmsFull = readPublicFile("llms-full.txt");

    for (const value of [llms, llmsFull, SYSTEM_PROMPT]) {
      expect(value).toContain("300+");
      expect(value).toContain("13 years");
      expect(value).toContain("/book");

      expect(value).not.toContain("24 hours");
      expect(value).not.toContain("Social Media Management");
      expect(value).not.toContain("Digital Products");
      expect(value).not.toContain("testimonials");
      expect(value).not.toContain("/testimonials");
      expect(value).not.toContain("/portfolio");
    }
  });
});
