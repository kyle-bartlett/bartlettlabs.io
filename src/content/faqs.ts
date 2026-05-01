export type FaqItem = {
  question: string;
  answer: string;
};

export const homepageFaqs = [
  {
    question: "What kinds of projects do you actually take on?",
    answer:
      "I focus on four areas: custom websites, AI chatbots and agents, workflow automation, and consulting. If it does not fit those lanes, I would rather say so clearly than oversell it.",
  },
  {
    question: "Do you work with local businesses only?",
    answer:
      "Most of the positioning is built for Houston-area businesses, but the work itself can be done remotely if the fit is right.",
  },
  {
    question: "How do projects usually start?",
    answer:
      "Most projects start with a short strategy call so we can understand what is actually slowing the business down and whether a website, automation, or AI workflow is the right move.",
  },
  {
    question: "Do you offer hourly work?",
    answer:
      "No. The goal is fixed-scope work with clear deliverables, a defined build, and 30 days of post-launch support.",
  },
  {
    question: "Do I own what you build?",
    answer:
      "Yes. The site, assets, and implementation materials are built for your business, not as a lock-in system.",
  },
  {
    question: "Are the work examples on the site client projects?",
    answer:
      "Not yet. The current work page is demo work built for real local businesses to show what is possible. As client projects go live, those can move to the top of the page.",
  },
] satisfies FaqItem[];
