import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site";
import { FinalCallout } from "@/components/site/FinalCallout";
import { PageShell } from "@/components/site/PageShell";
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/blog/posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Bartlett Labs Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.domain}/blog/${post.slug}`,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Bartlett_Labs",
      creator: "@Bartlett_Labs",
      title: post.title,
      description: post.excerpt,
      images: ["/og-image.png"],
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function normalizeBlogContent(content: string) {
  return content
    .replaceAll('href="/demos"', 'href="/work"')
    .replaceAll('href="/portfolio"', 'href="/work"')
    .replaceAll('href="/testimonials"', 'href="/work"')
    .replaceAll("#06b6d4", "var(--color-burnt-orange)");
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const content = normalizeBlogContent(post.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${siteConfig.domain}/about`,
      jobTitle: siteConfig.founder.title,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.domain}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.domain}/blog/${post.slug}`,
    },
    url: `${siteConfig.domain}/blog/${post.slug}`,
    image: `${siteConfig.domain}/og-image.png`,
    articleSection: post.category,
    wordCount: content.replace(/<[^>]*>/g, "").split(/\s+/).length,
    inLanguage: "en-US",
  };

  const faqRegex = /<h3>([^<]+\?)<\/h3>\s*<p>([^<]+(?:<[^>]+>[^<]*<\/[^>]+>[^<]*)*)<\/p>/g;
  const faqItems: Array<{ question: string; answer: string }> = [];
  const contentAfterFaq = post.content.includes("Frequently Asked Questions")
    ? post.content.split("Frequently Asked Questions")[1] || ""
    : "";

  let faqMatch: RegExpExecArray | null;
  while ((faqMatch = faqRegex.exec(contentAfterFaq)) !== null) {
    faqItems.push({
      question: faqMatch[1].trim(),
      answer: faqMatch[2].replace(/<[^>]*>/g, "").trim(),
    });
  }

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <PageShell>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        {faqJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        ) : null}

        <section className="section-spacing">
          <div className="container-bl max-w-4xl">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm"
              style={{ color: "var(--color-text-light)" }}
            >
              <Link href="/" style={{ color: "var(--color-text-muted)" }}>
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" style={{ color: "var(--color-text-muted)" }}>
                Blog
              </Link>
              <span>/</span>
              <span>{post.title}</span>
            </nav>

            <div className="mt-8 card-warm p-7 md:p-10">
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

              <h1
                className="mt-5 text-4xl leading-tight md:text-5xl"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {post.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8" style={{ color: "var(--color-text-muted)" }}>
                {post.excerpt}
              </p>

              <div
                className="mt-7 rounded-[1.5rem] border px-5 py-4 text-sm leading-7"
                style={{
                  borderColor: "rgba(215, 208, 196, 0.9)",
                  backgroundColor: "rgba(247, 242, 233, 0.8)",
                  color: "var(--color-text-muted)",
                }}
              >
                These articles are directional guidance, not a fixed quote.
                Exact scope, tooling, and delivery approach still depend on the
                business, the current stack, and the real bottleneck.
              </div>
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container-bl max-w-4xl">
            <article
              className="site-rich-text card-warm p-7 md:p-10"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </section>

        {relatedPosts.length > 0 ? (
          <section className="section-spacing">
            <div className="container-bl">
              <div className="max-w-3xl">
                <span className="eyebrow">Keep Reading</span>
                <h2
                  className="mt-4 text-4xl"
                  style={{
                    color: "var(--color-text-heading)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  More practical notes from the build side.
                </h2>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="card-warm flex h-full flex-col p-6"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="proof-badge">{related.category}</span>
                      <span
                        className="text-sm uppercase tracking-[0.14em]"
                        style={{
                          color: "var(--color-text-light)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {formatDate(related.date)} · {related.readTime}
                      </span>
                    </div>
                    <h3
                      className="mt-5 text-3xl leading-tight"
                      style={{
                        color: "var(--color-text-heading)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {related.title}
                    </h3>
                    <p className="mt-4 flex-1 leading-8" style={{ color: "var(--color-text-muted)" }}>
                      {related.excerpt}
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

              <div className="mt-10">
                <Link href="/blog" className="btn-secondary">
                  Back to blog
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        <FinalCallout
          eyebrow="Need The Build?"
          title="If the article points at a real bottleneck, we can talk through the fix."
          description="The next step is usually figuring out whether you need a website rebuild, a chatbot, an automation, or just a cleaner plan."
          primaryHref={siteConfig.booking.path}
          primaryLabel="See open times"
          secondaryHref="/contact"
          secondaryLabel="Send a note"
        />
      </main>
    </PageShell>
  );
}
