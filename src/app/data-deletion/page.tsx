import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

export const metadata: Metadata = {
  title: "Request Data Deletion | Bartlett Labs",
  description:
    "Request deletion of your personal data from Bartlett Labs. Learn how to submit a data deletion request and what to expect.",
  alternates: {
    canonical: "/data-deletion",
  },
  openGraph: {
    title: "Request Data Deletion | Bartlett Labs",
    description:
      "Request deletion of your personal data from Bartlett Labs. Learn how to submit a data deletion request and what to expect.",
    url: "https://bartlettlabs.io/data-deletion",
    siteName: "Bartlett Labs",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@Bartlett_Labs",
    title: "Request Data Deletion | Bartlett Labs",
    description: "Request deletion of your personal data from Bartlett Labs.",
  },
};

const dataDeletionStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://bartlettlabs.io",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Request Data Deletion",
      item: "https://bartlettlabs.io/data-deletion",
    },
  ],
};

export default function DataDeletionPage() {
  return (
    <PageShell>
      <main className="relative pt-16 pb-16 px-6">
        <div className="container-bl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(dataDeletionStructuredData) }}
          />
          {/* Hero */}
          <div className="fade-in-section mb-16 pt-8 text-center max-w-3xl mx-auto">
            <p className="label-mono text-accent-blue mb-3">Legal</p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl mb-6">
              Request Data Deletion
            </h1>
            <p className="text-lg leading-relaxed text-silver">
              Last updated: March 14, 2026
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div className="card-warm p-8 sm:p-12 space-y-10">

              {/* Introduction */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Your Right to Data Deletion</h2>
                <p className="text-sm leading-relaxed text-silver">
                  At Bartlett Labs, we respect your privacy and your right to control your personal
                  data. If you would like us to delete the personal information we have collected
                  about you, you can submit a data deletion request at any time. We are committed
                  to processing your request promptly and transparently.
                </p>
              </section>

              {/* How to Request */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">How to Submit a Request</h2>
                <p className="text-sm leading-relaxed text-silver mb-4">
                  To request deletion of your personal data, send an email to:
                </p>
                <div
                  className="rounded-xl p-5 text-sm leading-relaxed text-silver"
                  style={{ backgroundColor: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.1)" }}
                >
                  <p className="font-semibold text-navy mb-2">Email Your Request</p>
                  <p>
                    Send to:{" "}
                    <a
                      href="mailto:kyle@bartlettlabs.io?subject=Data%20Deletion%20Request"
                      className="underline transition-colors hover:text-navy"
                      style={{ color: "#06b6d4" }}
                    >
                      kyle@bartlettlabs.io
                    </a>
                  </p>
                  <p className="mt-1">
                    Subject line: <strong className="text-navy">&quot;Data Deletion Request&quot;</strong>
                  </p>
                  <p className="mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Please include the email address associated with your account or interaction
                    with Bartlett Labs so we can locate your data.
                  </p>
                </div>
              </section>

              {/* What Data We May Hold */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">What Data We May Hold</h2>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  Depending on how you have interacted with Bartlett Labs, we may hold the following
                  types of personal data:
                </p>
                <ul className="list-disc list-inside text-sm leading-relaxed text-silver space-y-1.5 ml-2">
                  <li>
                    <strong className="text-navy">Contact form submissions:</strong> Name, email
                    address, phone number, and message content submitted through our website.
                  </li>
                  <li>
                    <strong className="text-navy">Email addresses:</strong> Email addresses collected
                    through direct correspondence, newsletter signups, or account creation.
                  </li>
                  <li>
                    <strong className="text-navy">Analytics data:</strong> Anonymized usage data
                    collected through website analytics, including pages visited, browser type,
                    and approximate location.
                  </li>
                </ul>
              </section>

              {/* Processing Timeframe */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Processing Timeframe</h2>
                <p className="text-sm leading-relaxed text-silver">
                  We will process your data deletion request within <strong className="text-navy">30 days</strong> of
                  receiving it. Once your data has been deleted, we will send a confirmation to the
                  email address you provided in your request.
                </p>
              </section>

              {/* What Happens After Deletion */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">What Happens After Deletion</h2>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  Upon processing your request:
                </p>
                <ul className="list-disc list-inside text-sm leading-relaxed text-silver space-y-1.5 ml-2">
                  <li>All identifiable personal data associated with your email will be permanently removed from our systems.</li>
                  <li>You will receive a confirmation email once the deletion is complete.</li>
                  <li>Any future interactions with Bartlett Labs will be treated as new, with no prior data on file.</li>
                </ul>
              </section>

              {/* Data Retention Exceptions */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Data Retention Exceptions</h2>
                <p className="text-sm leading-relaxed text-silver">
                  In certain cases, we may be required to retain some data even after a deletion
                  request. This includes situations where data retention is required by applicable
                  law, regulation, or legal proceeding, or where data is necessary to protect
                  against fraud or enforce our terms of service. If any of your data falls under
                  these exceptions, we will inform you in our response to your request.
                </p>
              </section>

              {/* Related Policies */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Related Policies</h2>
                <p className="text-sm leading-relaxed text-silver">
                  For more information about how we collect, use, and protect your personal data,
                  please review our{" "}
                  <Link
                    href="/privacy"
                    className="underline transition-colors hover:text-navy"
                    style={{ color: "#06b6d4" }}
                  >
                    Privacy Policy
                  </Link>.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Contact Us</h2>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  If you have questions about data deletion or our privacy practices, feel free
                  to reach out:
                </p>
                <div
                  className="rounded-xl p-5 text-sm leading-relaxed text-silver"
                  style={{ backgroundColor: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.1)" }}
                >
                  <p className="font-semibold text-navy mb-2">Bartlett Labs</p>
                  <p>Kyle Bartlett, Owner</p>
                  <p>Crosby, Texas 77532</p>
                  <p className="mt-2">
                    Email:{" "}
                    <a
                      href="mailto:kyle@bartlettlabs.io"
                      className="underline transition-colors hover:text-navy"
                      style={{ color: "#06b6d4" }}
                    >
                      kyle@bartlettlabs.io
                    </a>
                  </p>
                </div>
              </section>

            </div>

            {/* Back to Home */}
            <div className="mt-10 text-center">
              <Link
                href="/"
                className="text-sm transition-colors hover:text-navy"
                style={{ color: "#06b6d4" }}
              >
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
