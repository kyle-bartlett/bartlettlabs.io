export type Service = {
  id: string;
  title: string;
  priceRange: string;
  summary: string;
  timeline: string;
  whoItsFor: string[];
  whatYouProvide: string[];
  whatIDeliver: string[];
  homepageBullets: string[];
};

export const services = [
  {
    id: "websites",
    title: "Missed Call Text-Back",
    priceRange: "$500 setup + $99/mo",
    summary: "If you don't answer, you don't get the job. Instantly text back missed calls and keep the lead warm while you finish your current job.",
    timeline: "Live in 48 hours",
    whoItsFor: ["Local businesses missing calls", "Owners on the job site"],
    whatYouProvide: ["Your phone number"],
    whatIDeliver: ["Automated response system"],
    homepageBullets: ["Instant response to missed calls", "Keeps leads from calling the next guy", "Works 24/7 without extra effort"],
  },
  {
    id: "chatbots",
    title: "Automated Follow-Ups",
    priceRange: "Included",
    summary: "Never let a quote go cold. Automated text sequences check in with customers so you don't have to play phone tag.",
    timeline: "Live in 48 hours",
    whoItsFor: ["Businesses losing un-followed up quotes"],
    whatYouProvide: ["Your typical follow up timeline"],
    whatIDeliver: ["Automated text sequences"],
    homepageBullets: ["Automatic follow-ups on open quotes", "Revive old leads effortlessly", "Consistent communication"],
  },
  {
    id: "automation",
    title: "Simple CRM Dashboard",
    priceRange: "Included",
    summary: "Ditch the sticky notes. See every lead, active quote, and booked job in one clean dashboard on your phone.",
    timeline: "Live in 48 hours",
    whoItsFor: ["Teams using whiteboards or sticky notes"],
    whatYouProvide: ["None"],
    whatIDeliver: ["Mobile and web app access"],
    homepageBullets: ["One place for all messages", "Mobile app for on-the-go access", "Clear view of your pipeline"],
  },
  {
    id: "consulting",
    title: "Consulting & Advisory",
    priceRange: "Contact for quote",
    summary:
      "For teams that need help thinking through the right system before they build. Good fit when the problem is clear but the best implementation path is not.",
    timeline: "Typical timeline: depends on scope",
    whoItsFor: [
      "Owners who need a plan before committing to a bigger build",
      "Operations teams untangling a messy process",
      "Businesses that want a technical partner to scope the right next move",
    ],
    whatYouProvide: [
      "Context on the business problem and current tools",
      "Stakeholders who can explain constraints and priorities",
      "Clarity on what outcome actually matters",
    ],
    whatIDeliver: [
      "A practical recommendation, not abstract AI jargon",
      "Scope, priorities, and implementation guidance",
      "A clear next-step decision instead of more confusion",
    ],
    homepageBullets: [
      "Strategy before building",
      "Clear recommendations and practical scope",
      "Contact for quote",
    ],
  },
] satisfies Service[];
