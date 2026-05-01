import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

export const metadata: Metadata = {
  title: "Terms of Service | Bartlett Labs",
  description:
    "Terms of Service for Bartlett Labs. Review the terms and conditions governing your use of our website and services.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | Bartlett Labs",
    description:
      "Terms of Service for Bartlett Labs.",
    url: "https://bartlettlabs.io/terms",
    siteName: "Bartlett Labs",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <PageShell>
      <main className="relative px-6 pb-16 pt-16">
        <div className="mx-auto max-w-3xl px-0 pt-8">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="mb-10 text-gray-500">
            Last updated: March 18, 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using the website at bartlettlabs.io (the &quot;Site&quot;) or any
                services provided by Bartlett Labs LLC (&quot;Bartlett Labs,&quot; &quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service
                (&quot;Terms&quot;). If you do not agree to these Terms, do not use our Site or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
              <p>
                Bartlett Labs provides AI automation consulting, web development, application
                development, and related technology services. Our services may include but are
                not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI automation and workflow development</li>
                <li>Custom web application design and development</li>
                <li>Data analysis and business intelligence solutions</li>
                <li>Technology consulting and advisory services</li>
                <li>Software-as-a-Service (SaaS) products</li>
              </ul>
              <p className="mt-4">
                Specific service terms, deliverables, and pricing are defined in individual
                agreements, proposals, or statements of work between Bartlett Labs and the client.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Use of the Site</h2>
              <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Site in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any portion of the Site or its systems</li>
                <li>Use automated tools to scrape, crawl, or extract data from the Site without permission</li>
                <li>Introduce viruses, malware, or other harmful code</li>
                <li>Impersonate Bartlett Labs or its representatives</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p>
                The Site and its original content, features, and functionality are owned by
                Bartlett Labs LLC and are protected by copyright, trademark, and other
                intellectual property laws. Our trademarks and trade dress may not be used
                in connection with any product or service without prior written consent.
              </p>
              <p className="mt-4">
                For client projects: ownership of deliverables is defined in individual
                service agreements. Unless otherwise specified, clients receive full ownership
                of custom work product upon final payment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Client Responsibilities</h2>
              <p>When engaging our services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information as needed for project delivery</li>
                <li>Respond to requests for feedback, approvals, or materials in a timely manner</li>
                <li>Make payments according to agreed-upon terms</li>
                <li>Not use deliverables for unlawful purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Payment Terms</h2>
              <p>
                Payment terms are specified in individual service agreements, proposals, or
                invoices. Unless otherwise agreed:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Invoices are due within 30 days of receipt</li>
                <li>Late payments may incur a fee of 1.5% per month on the outstanding balance</li>
                <li>Bartlett Labs reserves the right to suspend services for overdue accounts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. SMS/Text Messaging Program</h2>
              <p>
                Bartlett Labs may use text messaging for inquiry follow-up,
                scheduling, project communication, and direct support. By opting
                in, you consent to receive the category of messages tied to the
                path where you shared your number.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">7.1 Description of SMS Program and Messaging Use Cases</h3>
              <p>Text messages from Bartlett Labs may include:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Inquiry follow-up:</strong> A direct reply to a form submission or email conversation you started</li>
                <li><strong>Scheduling:</strong> Appointment confirmations, reminders, or reschedule coordination</li>
                <li><strong>Project or service updates:</strong> Status notes, delivery coordination, or next-step reminders for active work</li>
                <li><strong>Support:</strong> Responses to questions you asked Bartlett Labs to handle by text</li>
              </ul>
              <p className="mt-4">
                Bartlett Labs does not use this Terms page to bundle marketing
                consent together with operational text consent. If promotional
                or marketing texting is introduced later, it should be collected
                through a separate consent choice first.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">7.2 Instructions to Opt Out (&quot;Text STOP&quot;)</h3>
              <p>
                You may opt out of receiving text messages at any time by replying <strong>STOP</strong>,{" "}
                <strong>UNSUBSCRIBE</strong>, <strong>CANCEL</strong>, <strong>END</strong>, or{" "}
                <strong>QUIT</strong> to any message from Bartlett Labs. You will receive one final
                confirmation message and no further texts. Visit our{" "}
                <Link href="/sms-opt-out" className="text-cyan-600 dark:text-cyan-400 underline">
                  SMS Opt-Out page
                </Link>{" "}for additional opt-out methods.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">7.3 Support Contact Information</h3>
              <p>
                For help with our SMS program, reply <strong>HELP</strong> to any text message,
                or contact us at{" "}
                <a href="mailto:kyle@bartlettlabs.io" className="text-cyan-600 dark:text-cyan-400 underline">
                  kyle@bartlettlabs.io
                </a>. You may also visit{" "}
                <a href="https://bartlettlabs.io/contact" className="text-cyan-600 dark:text-cyan-400 underline">
                  bartlettlabs.io/contact
                </a>.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">7.4 Disclosures for Message and Data Rates</h3>
              <p>
                <strong>Message and data rates may apply.</strong> Bartlett Labs does not charge
                for text messages, but your mobile carrier&apos;s standard messaging and data rates
                may apply. Contact your wireless carrier for details about your messaging plan.
                Message frequency varies based on the inquiry, booking activity,
                and project work you asked Bartlett Labs to handle.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">7.5 Carrier Liability Disclaimer</h3>
              <p>
                Wireless carriers including AT&amp;T, Verizon, T-Mobile, Sprint, U.S. Cellular,
                and other participating carriers are not liable for delayed or undelivered
                messages. Bartlett Labs is not responsible for messages not received due to
                carrier issues, device incompatibility, changes to your phone number, or other
                factors outside our control.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">7.6 Rejoining After Opt-Out</h3>
              <p>
                If you opt out and later want text messages again, use a fresh
                consent path through the original form or booking flow, or
                contact Bartlett Labs directly for the right re-consent step.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">7.7 Links to Privacy Policy</h3>
              <p>
                Your phone number and SMS data are handled in accordance with our{" "}
                <Link href="/privacy" className="text-cyan-600 dark:text-cyan-400 underline">
                  Privacy Policy
                </Link>. Bartlett Labs does not use mobile opt-in data for
                outside marketing or affiliate promotion, and consent records
                stay limited to the messaging providers needed to deliver the
                text service itself.
              </p>
              <p className="mt-3">
                For full opt-in terms, visit our{" "}
                <Link href="/sms-opt-in" className="text-cyan-600 dark:text-cyan-400 underline">
                  SMS Opt-In page
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Bartlett Labs shall not be liable for
                any indirect, incidental, special, consequential, or punitive damages arising
                from your use of the Site or services. Our total liability for any claim
                related to our services shall not exceed the amount paid by you for the
                specific service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Disclaimer of Warranties</h2>
              <p>
                The Site and services are provided &quot;as is&quot; and &quot;as available&quot;
                without warranties of any kind, either express or implied. We do not warrant
                that the Site will be uninterrupted, error-free, or free of viruses or other
                harmful components.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Bartlett Labs LLC, its owners,
                employees, and agents from any claims, damages, losses, or expenses arising
                from your use of our Site or services, your violation of these Terms, or your
                violation of any rights of a third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
              <p>
                We reserve the right to terminate or suspend access to our Site or services
                at our sole discretion, without notice, for conduct that we believe violates
                these Terms or is harmful to us, other users, or third parties. Provisions
                that by their nature should survive termination shall survive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of Texas, without regard to
                conflict of law principles. Any disputes arising under these Terms shall be
                subject to the exclusive jurisdiction of the courts located in Harris County,
                Texas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
              <p>
                We reserve the right to update or modify these Terms at any time. Changes
                will be posted on this page with an updated &quot;Last updated&quot; date. Your
                continued use of the Site after changes are posted constitutes acceptance
                of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
              <p>
                For questions about these Terms of Service, contact us at:
              </p>
              <p className="mt-4">
                <strong>Bartlett Labs LLC</strong>
                <br />
                Email:{" "}
                <a href="mailto:kyle@bartlettlabs.io" className="text-cyan-600 dark:text-cyan-400 underline">
                  kyle@bartlettlabs.io
                </a>
                <br />
                Website:{" "}
                <a href="https://bartlettlabs.io" className="text-cyan-600 dark:text-cyan-400 underline">
                  bartlettlabs.io
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Related Policies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Link href="/privacy" className="text-cyan-600 dark:text-cyan-400 underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/email-opt-out" className="text-cyan-600 underline">
                    Email Opt-Out
                  </Link>
                </li>
                <li>
                  <Link href="/sms-opt-in" className="text-cyan-600 dark:text-cyan-400 underline">
                    SMS Opt-In Terms
                  </Link>
                </li>
                <li>
                  <Link href="/sms-opt-out" className="text-cyan-600 dark:text-cyan-400 underline">
                    SMS Opt-Out
                  </Link>
                </li>
                <li>
                  <Link href="/data-deletion" className="text-cyan-600 dark:text-cyan-400 underline">
                    Data Deletion
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
