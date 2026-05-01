import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { FinalCallout } from "@/components/site/FinalCallout";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog | Bartlett Labs",
  description:
    "Practical notes from Kyle Bartlett on websites, AI chatbots, workflow automation, and small-business systems.",
  alternates: {
    canonical: "/blog",
  },
};

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageShell>
      <main>
        <PageHero
          eyebrow="Blog"
          title="Practical notes from the build side."
          description="What I learn building websites, AI chatbots, and workflow automation for small businesses. Some posts are newer than others, but the goal is always the same: useful systems and clearer operations."
          actions={
            <>
              <Link href="/work" className="btn-secondary">
                See demo work
              </Link>
            </>
          }
          aside={
            <div className="site-panel p-6 md:p-7">
              <span className="eyebrow">Before You Read</span>
              <h2
                className="mt-4 text-3xl"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Practical, current, and honest.
              </h2>
              <p className="mt-4 text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>
                These articles follow the same rule as the site itself: no
                invented proof, no inflated guarantees, just practical notes
                from the build side.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="proof-badge">{posts.length} articles</span>
                <span className="proof-badge">{siteConfig.metrics.automations} automations</span>
              </div>
            </div>
          }
        />

        <section className="section-tight">
          <div className="container-bl grid gap-6 lg:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-warm flex h-full flex-col p-6 md:p-7"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="proof-badge">{post.category}</span>
                  <span
                    className="text-sm uppercase tracking-[0.14em]"
                    style={{
                      color: "var(--color-text-light)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {formatDate(post.date)} · {post.readTime}
                  </span>
                </div>
                <h2
                  className="mt-5 text-3xl leading-tight"
                  style={{
                    color: "var(--color-text-heading)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {post.title}
                </h2>
                <p className="mt-4 flex-1 leading-8" style={{ color: "var(--color-text-muted)" }}>
                  {post.excerpt}
                </p>
                <span
                  className="mt-6 font-semibold"
                  style={{ color: "var(--color-burnt-orange)" }}
                >
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <FinalCallout
          eyebrow="Need The Real Build?"
          title="If the article helps you spot the problem, I can help build the fix."
          description="The blog can help you diagnose the bottleneck. The next step is figuring out whether the answer is a site rebuild, a chatbot, an automation, or something smaller."
          primaryHref={siteConfig.booking.path}
          primaryLabel="See open times"
          secondaryHref="/contact"
          secondaryLabel="Send a note"
        />
      </main>
    </PageShell>
  );
}
