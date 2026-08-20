import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Bartlett Labs",
  description:
    "Privacy Policy for Bartlett Labs. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Bartlett Labs",
    description:
      "Privacy Policy for Bartlett Labs. Learn how we collect, use, and protect your personal information.",
    url: "https://bartlettlabs.io/privacy",
    siteName: "Bartlett Labs",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@Bartlett_Labs",
    title: "Privacy Policy | Bartlett Labs",
    description: "Privacy Policy for Bartlett Labs. How we collect, use, and protect your information.",
  },
};

const privacyStructuredData = {
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
      name: "Privacy Policy",
      item: "https://bartlettlabs.io/privacy",
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <main className="relative pt-16 pb-16 px-6">
        <div className="container-bl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyStructuredData) }}
          />
          {/* Hero */}
          <div className="fade-in-section mb-16 pt-8 text-center max-w-3xl mx-auto">
            <p className="label-mono text-accent-blue mb-3">Legal</p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg leading-relaxed text-silver">
              Last updated: March 14, 2026
            </p>
          </div>

          {/* Policy Content */}
          <div className="max-w-3xl mx-auto">
            <div className="card-warm p-8 sm:p-12 space-y-10">

              {/* Introduction */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Introduction</h2>
                <p className="text-sm leading-relaxed text-silver">
                  Bartlett Labs (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is operated by Kyle Bartlett and is based in
                  Crosby, Texas. We are committed to protecting your privacy and being transparent about
                  how we handle your personal information. This Privacy Policy explains what data we
                  collect, how we use it, and your rights regarding that data.
                </p>
                <p className="text-sm leading-relaxed text-silver mt-3">
                  This policy applies to all services provided by Bartlett Labs, including our website
                  at bartlettlabs.io and any related services.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Information We Collect</h2>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  We collect information in the following ways:
                </p>

                <h3 className="font-heading text-base font-semibold text-navy mt-5 mb-2">
                  Information You Provide Directly
                </h3>
                <ul className="list-disc list-inside text-sm leading-relaxed text-silver space-y-1.5 ml-2">
                  <li>
                    <strong className="text-navy">Contact form submissions:</strong> When you fill out
                    a contact form on our website, we collect your name, email address, phone number
                    (if provided), and message content.
                  </li>
                  <li>
                    <strong className="text-navy">Email correspondence:</strong> When you email us
                    directly, we retain your email address and the content of your communication.
                  </li>
                  <li>
                    <strong className="text-navy">Consultation bookings:</strong> When you schedule a
                    strategy call or consultation, we collect the information you provide during the
                    booking process.
                  </li>
                  <li>
                    <strong className="text-navy">SMS/Text message opt-in:</strong> When you opt in to
                    receive text messages from Bartlett Labs, we collect your
                    mobile phone number and the consent choices connected to
                    that request. This information is used for inquiry
                    follow-up, scheduling, project communication, and support
                    that match the permission you gave in our{" "}
                    <a href="/sms-opt-in" className="text-cyan underline">SMS Opt-In Terms</a>.
                  </li>
                </ul>

                <h3 className="font-heading text-base font-semibold text-navy mt-5 mb-2">
                  Information Collected Automatically
                </h3>
                <ul className="list-disc list-inside text-sm leading-relaxed text-silver space-y-1.5 ml-2">
                  <li>
                    <strong className="text-navy">Website analytics:</strong> We use Google Analytics
                    to collect anonymized usage data, including pages visited, time on site, referring
                    URLs, browser type, device type, and approximate geographic location.
                  </li>
                  <li>
                    <strong className="text-navy">Server logs:</strong> Our hosting infrastructure
                    automatically records IP addresses, access times, and requested URLs for security
                    and performance monitoring.
                  </li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">How We Use Your Information</h2>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside text-sm leading-relaxed text-silver space-y-1.5 ml-2">
                  <li>To respond to your inquiries and provide the services you request</li>
                  <li>To improve our website, services, and customer experience</li>
                  <li>To send relevant updates about our services when you have opted in or expressed interest</li>
                  <li>To analyze website traffic and usage patterns to improve our content and offerings</li>
                  <li>To protect against fraud, abuse, and unauthorized access</li>
                  <li>To comply with legal obligations</li>
                </ul>
                <p className="text-sm leading-relaxed text-silver mt-3">
                  We do not sell, rent, or trade your personal information to third parties for
                  marketing purposes.
                </p>
              </section>

              {/* SMS Data & No Sharing Statement */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">SMS/Text Message Data</h2>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  When you opt in to receive text messages from Bartlett Labs,
                  we store the mobile number, consent record, and message
                  activity needed to manage that communication. We use this data
                  for inquiry follow-up, scheduling, project communication, and
                  direct support that match the permission you gave.
                </p>
                <p className="text-sm leading-relaxed text-silver mb-3 font-semibold">
                  Bartlett Labs does not use mobile opt-in data for outside
                  marketing lists, affiliate promotion, or unrelated resale.
                </p>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  Text-message opt-in data and consent stay limited to the
                  service providers needed to deliver and support the messaging
                  channel itself, and not for their separate marketing use.
                </p>
                <p className="text-sm leading-relaxed text-silver">
                  For details on how to opt in or opt out of our SMS program, visit our{" "}
                  <a href="/sms-opt-in" className="text-cyan underline">SMS Opt-In</a> and{" "}
                  <a href="/sms-opt-out" className="text-cyan underline">SMS Opt-Out</a> pages.
                </p>
              </section>

              {/* Third-Party Services */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Third-Party Services</h2>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  We use the following third-party services that may collect or process data on our behalf:
                </p>
                <ul className="list-disc list-inside text-sm leading-relaxed text-silver space-y-1.5 ml-2">
                  <li>
                    <strong className="text-navy">Google Analytics:</strong> Website traffic analysis
                    and usage statistics. Google&apos;s privacy policy is available at{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline transition-colors hover:text-navy"
                      style={{ color: "#06b6d4" }}
                    >
                      policies.google.com/privacy
                    </a>.
                  </li>
                  <li>
                    <strong className="text-navy">Shopify:</strong> Our online store at
                    shop.bartlettlabs.io is powered by Shopify. Shopify processes order and payment
                    information in accordance with their{" "}
                    <a
                      href="https://www.shopify.com/legal/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline transition-colors hover:text-navy"
                      style={{ color: "#06b6d4" }}
                    >
                      privacy policy
                    </a>.
                  </li>
                  <li>
                    <strong className="text-navy">Printful:</strong> We use Printful for print-on-demand
                    order fulfillment. When you place an order, Printful receives the shipping and
                    product information necessary to fulfill your order. Printful&apos;s privacy policy is
                    available at{" "}
                    <a
                      href="https://www.printful.com/policies/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline transition-colors hover:text-navy"
                      style={{ color: "#06b6d4" }}
                    >
                      printful.com/policies/privacy
                    </a>.
                  </li>
                  <li>
                    <strong className="text-navy">Cloudflare:</strong> We use Cloudflare for content
                    delivery, DDoS protection, and website security. Cloudflare may process IP addresses
                    and request data as part of their services. Their privacy policy is at{" "}
                    <a
                      href="https://www.cloudflare.com/privacypolicy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline transition-colors hover:text-navy"
                      style={{ color: "#06b6d4" }}
                    >
                      cloudflare.com/privacypolicy
                    </a>.
                  </li>
                </ul>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  Our website uses cookies and similar technologies to enhance your experience and
                  collect analytics data. Cookies are small text files stored on your device when you
                  visit our site.
                </p>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  We use the following types of cookies:
                </p>
                <ul className="list-disc list-inside text-sm leading-relaxed text-silver space-y-1.5 ml-2">
                  <li>
                    <strong className="text-navy">Essential cookies:</strong> Required for basic site
                    functionality such as theme preferences and session management.
                  </li>
                  <li>
                    <strong className="text-navy">Analytics cookies:</strong> Used by Google Analytics
                    to understand how visitors interact with our website. These cookies collect
                    information in an aggregated form.
                  </li>
                  <li>
                    <strong className="text-navy">Security cookies:</strong> Used by Cloudflare to
                    identify trusted web traffic and protect against malicious activity.
                  </li>
                </ul>
                <p className="text-sm leading-relaxed text-silver mt-3">
                  You can control cookie preferences through your browser settings. Disabling cookies
                  may affect some features of our website.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Data Retention</h2>
                <p className="text-sm leading-relaxed text-silver">
                  We retain your personal information only for as long as necessary to fulfill the
                  purposes described in this policy, unless a longer retention period is required or
                  permitted by law. Contact form submissions and email correspondence are retained for
                  up to 3 years to maintain client relationship history. Analytics data is retained
                  according to the default settings of each analytics platform (typically 14 months for
                  Google Analytics). You may request deletion of your data at any time by contacting us.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Your Rights</h2>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  You have the following rights regarding your personal data:
                </p>
                <ul className="list-disc list-inside text-sm leading-relaxed text-silver space-y-1.5 ml-2">
                  <li>
                    <strong className="text-navy">Access:</strong> You can request a copy of the
                    personal information we hold about you.
                  </li>
                  <li>
                    <strong className="text-navy">Deletion:</strong> You can request that we delete
                    your personal information. We will comply unless we have a legal obligation to
                    retain it.
                  </li>
                  <li>
                    <strong className="text-navy">Correction:</strong> You can request that we correct
                    any inaccurate personal information.
                  </li>
                  <li>
                    <strong className="text-navy">Opt-out:</strong> You can opt out of marketing
                    communications at any time by contacting us, using the unsubscribe link in
                    any email we send, or visiting our{" "}
                    <Link
                      href="/email-opt-out"
                      className="underline transition-colors hover:text-navy"
                      style={{ color: "#06b6d4" }}
                    >
                      Email Opt-Out
                    </Link>{" "}
                    page.
                  </li>
                </ul>
                <p className="text-sm leading-relaxed text-silver mt-3">
                  To exercise any of these rights, contact us at{" "}
                  <a
                    href="mailto:kyle@bartlettlabs.io"
                    className="underline transition-colors hover:text-navy"
                    style={{ color: "#06b6d4" }}
                  >
                    kyle@bartlettlabs.io
                  </a>.
                  We will respond to your request within 30 days.
                </p>
              </section>

              {/* Data Deletion */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Data Deletion Requests</h2>
                <p className="text-sm leading-relaxed text-silver">
                  You have the right to request the deletion of your personal data at any time. We
                  provide a dedicated process for submitting data deletion requests, including clear
                  instructions on how to contact us and what to expect. For full details on how to
                  submit a request, processing timeframes, and what data may be affected, please
                  visit our{" "}
                  <Link
                    href="/data-deletion"
                    className="underline transition-colors hover:text-navy"
                    style={{ color: "#06b6d4" }}
                  >
                    Data Deletion Request
                  </Link>{" "}
                  page.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Children&apos;s Privacy</h2>
                <p className="text-sm leading-relaxed text-silver">
                  Our services are not directed to children under the age of 13. We do not knowingly
                  collect personal information from children under 13. If we become aware that we have
                  collected personal information from a child under 13, we will take steps to delete
                  that information promptly. If you believe we may have collected information from a
                  child under 13, please contact us at{" "}
                  <a
                    href="mailto:kyle@bartlettlabs.io"
                    className="underline transition-colors hover:text-navy"
                    style={{ color: "#06b6d4" }}
                  >
                    kyle@bartlettlabs.io
                  </a>.
                </p>
              </section>

              {/* California Privacy Rights */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">California Privacy Rights (CCPA)</h2>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  If you are a California resident, you have additional rights under the California
                  Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc list-inside text-sm leading-relaxed text-silver space-y-1.5 ml-2">
                  <li>
                    <strong className="text-navy">Right to know:</strong> You have the right to
                    request information about the categories and specific pieces of personal
                    information we have collected about you, the categories of sources, the business
                    purpose for collecting it, and the categories of third parties with whom we share it.
                  </li>
                  <li>
                    <strong className="text-navy">Right to delete:</strong> You have the right to
                    request deletion of your personal information, subject to certain exceptions.
                  </li>
                  <li>
                    <strong className="text-navy">Right to non-discrimination:</strong> We will not
                    discriminate against you for exercising your CCPA rights.
                  </li>
                  <li>
                    <strong className="text-navy">No sale of personal information:</strong> We do not
                    sell personal information to third parties as defined by the CCPA.
                  </li>
                </ul>
                <p className="text-sm leading-relaxed text-silver mt-3">
                  To submit a CCPA request, contact us at{" "}
                  <a
                    href="mailto:kyle@bartlettlabs.io"
                    className="underline transition-colors hover:text-navy"
                    style={{ color: "#06b6d4" }}
                  >
                    kyle@bartlettlabs.io
                  </a>.
                  We will verify your identity before processing your request and respond within
                  45 days as required by law.
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Data Security</h2>
                <p className="text-sm leading-relaxed text-silver">
                  We implement reasonable technical and organizational security measures to protect
                  your personal information against unauthorized access, alteration, disclosure, or
                  destruction. Our website uses SSL/TLS encryption for all data transmitted between
                  your browser and our servers. However, no method of transmission over the internet
                  or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              {/* Changes to This Policy */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Changes to This Policy</h2>
                <p className="text-sm leading-relaxed text-silver">
                  We may update this Privacy Policy from time to time to reflect changes in our
                  practices, services, or applicable laws. When we make changes, we will update the
                  &quot;Last updated&quot; date at the top of this page. We encourage you to review this
                  policy periodically. Your continued use of our website after any changes constitutes
                  your acceptance of the updated policy.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="font-heading text-xl font-bold text-navy mb-4">Contact Us</h2>
                <p className="text-sm leading-relaxed text-silver mb-3">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or
                  our data practices, please contact us:
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
                  <p>
                    Phone:{" "}
                    <a
                      href="tel:+18307832470"
                      className="underline transition-colors hover:text-navy"
                      style={{ color: "#06b6d4" }}
                    >
                      (830) 783-2470
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
