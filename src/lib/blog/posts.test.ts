import { blogPosts } from "./posts";

const bannedPatterns = [
  { pattern: /\/portfolio\b/i, reason: "legacy /portfolio links" },
  { pattern: /\/demos\b/i, reason: "legacy /demos links" },
  { pattern: /\/testimonials\b/i, reason: "legacy /testimonials links" },
  { pattern: /\b15 years\b/i, reason: "stale experience count" },
  { pattern: /within 24 hours/i, reason: "24-hour turnaround promise" },
  { pattern: /within 48 hours/i, reason: "48-hour turnaround promise" },
  { pattern: /24hrs/i, reason: "24-hour turnaround shorthand" },
  { pattern: /\bfree website audit\b/i, reason: "unsupported website audit offer" },
  { pattern: /\bfree site review\b/i, reason: "unsupported site review offer" },
  { pattern: /\bAI agent team\b/i, reason: "AI-team framing" },
  { pattern: /\bmulti-agent orchestration\b/i, reason: "unsupported orchestration proof" },
  { pattern: /\b22 autonomous cron jobs\b/i, reason: "unsupported internal proof" },
  { pattern: /\bover 200 autonomous features\b/i, reason: "unsupported shipped-feature proof" },
  { pattern: /\btestimonials?\b/i, reason: "testimonial language from the old site" },
];

describe("blogPosts truth audit", () => {
  it("removes stale claims, fake-proof language, and legacy route references", () => {
    const failures: string[] = [];

    for (const post of blogPosts) {
      const haystack = `${post.title}\n${post.excerpt}\n${post.content}`;

      for (const banned of bannedPatterns) {
        if (banned.pattern.test(haystack)) {
          failures.push(`${post.slug}: ${banned.reason}`);
        }
      }
    }

    expect(failures).toEqual([]);
  });
});
