import { workScreenshotAssets } from "./assets";

export type WorkItem = {
  id: string;
  name: string;
  label: "Demo";
  industry: string;
  location: string;
  summary: string;
  problem: string;
  whatIBuilt: string;
  before: string;
  after: string;
  liveDemoUrl?: string;
  screenshotLabel: string;
  screenshotAsset: (typeof workScreenshotAssets)[keyof typeof workScreenshotAssets];
};

export const workItems = [
  {
    id: "santiagos-auto-repair",
    name: "Santiago's Auto Repair",
    label: "Demo",
    industry: "Auto Repair",
    location: "Crosby, TX",
    summary:
      "A grounded, local-service website concept. Includes 5-Minute Booking Engine.",
    problem:
      "No strong online presence and no easy way for new customers to understand services or request an appointment.",
    whatIBuilt:
      "A custom service site concept with service pages, booking CTA placement, trust elements, and mobile-first structure.",
    before:
      "A referral-heavy shop with limited digital credibility and no modern way to capture off-hours inquiries.",
    after:
      "A clear, trustworthy online front door that makes the shop look established and streamlines quote requests.",
    screenshotLabel: "Homepage and service-page screenshots coming soon",
    screenshotAsset: workScreenshotAssets["santiagos-auto-repair"],
  },
  {
    id: "five-stars-electric",
    name: "5 Stars Electric",
    label: "Demo",
    industry: "Electrical",
    location: "Baytown, TX",
    summary:
      "A one-man electrical business concept. Includes 5-Minute Booking Engine.",
    problem:
      "Prospects had very little online proof that the business was active, professional, and worth calling.",
    whatIBuilt:
      "A lead-focused demo site with licensing trust cues, project examples, and clearer quote-request flow.",
    before:
      "Minimal online presence, relying entirely on scattered social media profiles to validate their work.",
    after:
      "A professional brand presence that builds immediate trust in local search and captures job details before the first call.",
    screenshotLabel: "Lead capture and project gallery screenshot coming soon",
    screenshotAsset: workScreenshotAssets["five-stars-electric"],
  },
  {
    id: "doggie-world-grooming",
    name: "Doggie World Grooming",
    label: "Demo",
    industry: "Pet Services",
    location: "Crosby, TX",
    summary:
      "A pet services concept focused on booking flow. Includes 5-Minute Booking Engine.",
    problem:
      "Phone-only booking creates friction when the team is busy and prospects want quick answers.",
    whatIBuilt:
      "A scheduling-focused website concept with service packaging, trust imagery, and mobile-first contact paths.",
    before:
      "Customers relied on phone tag and scattered Facebook messages to figure out pricing and availability.",
    after:
      "A friendly, friction-free digital presence built strictly to support online scheduling and reduce administrative headaches.",
    screenshotLabel: "Scheduling flow screenshot coming soon",
    screenshotAsset: workScreenshotAssets["doggie-world-grooming"],
  },
  {
    id: "lake-houston-fitness",
    name: "Lake Houston Fitness",
    label: "Demo",
    industry: "Fitness",
    location: "Huffman, TX",
    summary:
      "A local gym concept built to make class schedules, memberships, and trainer credibility easier to understand online.",
    problem:
      "The business needed a sharper digital experience for new prospects comparing local gyms.",
    whatIBuilt:
      "A demo site with class details, membership positioning, and stronger mobile conversion paths.",
    before:
      "Weak online presentation and limited clarity for new visitors.",
    after:
      "A clearer digital brand that helps explain the offer and reduce signup hesitation.",
    screenshotLabel: "Membership page screenshot coming soon",
    screenshotAsset: workScreenshotAssets["lake-houston-fitness"],
  },
  {
    id: "cycle-landscaping",
    name: "CYCLE Landscaping",
    label: "Demo",
    industry: "Landscaping",
    location: "Mont Belvieu, TX",
    summary:
      "A service-business concept focused on visual proof, package framing, and making quote requests easier.",
    problem:
      "The business needed a more professional way to show past work and turn visits into estimate requests.",
    whatIBuilt:
      "A gallery-forward demo site with seasonal service framing, stronger trust sections, and clearer CTA placement.",
    before:
      "A thin web presence with limited proof and little structure for new leads.",
    after:
      "A more premium presentation designed to support trust and quote intent.",
    screenshotLabel: "Gallery and estimate module screenshot coming soon",
    screenshotAsset: workScreenshotAssets["cycle-landscaping"],
  },
  {
    id: "straight-off-the-road-bbq",
    name: "Straight Off the Road BBQ",
    label: "Demo",
    industry: "Restaurant",
    location: "Houston, TX",
    summary:
      "A restaurant concept built to better match strong local reputation with an equally credible web presence.",
    problem:
      "The business had strong local awareness but not a website experience that reflected it.",
    whatIBuilt:
      "A restaurant demo with menu emphasis, location context, catering CTA structure, and brand-forward layout.",
    before:
      "Strong word-of-mouth and platform presence without a matching owned web destination.",
    after:
      "A more complete online presence that gives the brand a stronger home base.",
    screenshotLabel: "Menu and catering page screenshot coming soon",
    screenshotAsset: workScreenshotAssets["straight-off-the-road-bbq"],
  },
] satisfies WorkItem[];
