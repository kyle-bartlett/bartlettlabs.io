import Link from "next/link";
import {
  footerComplianceLinks,
  footerPrimaryLinks,
  footerSecondaryLinks,
  siteConfig,
} from "@/content/site";

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="site-footer-link"
      >
        {label}
      </a>
    );
  }

  if (href === siteConfig.booking.path) {
    return (
      <a href={href} className="site-footer-link">
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className="site-footer-link">
      {label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-bl">
        <div className="site-footer-inner">
          <div className="site-footer-link-group">
            <span className="eyebrow">Bartlett Labs</span>
            <h2 className="site-footer-title">Useful systems. No AI theater.</h2>
            <p className="site-footer-copy">
              Bartlett Labs builds websites, AI chatbots, and workflow
              automation for local businesses that need better systems and
              clearer follow-through.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[rgba(245,239,232,0.72)]">
              <a href={`tel:${siteConfig.phone.raw}`} className="site-footer-link">
                {siteConfig.phone.display}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="site-footer-link"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            <div className="site-footer-link-group">
              <span className="eyebrow">Explore</span>
              {footerPrimaryLinks.map((item) => (
                <FooterLink key={item.label} {...item} />
              ))}
            </div>

            <div className="site-footer-link-group">
              <span className="eyebrow">Tools</span>
              {footerSecondaryLinks.map((item) => (
                <FooterLink key={item.label} {...item} />
              ))}
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-link"
              >
                LinkedIn
              </a>
            </div>

            <div className="site-footer-link-group">
              <span className="eyebrow">Compliance</span>
              {footerComplianceLinks.map((item) => (
                <FooterLink key={item.label} {...item} />
              ))}
            </div>
          </div>
        </div>

        <div className="divider-top flex flex-col gap-2 py-6 text-sm text-[rgba(245,239,232,0.55)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            Hand-built in {siteConfig.city}, {siteConfig.state}
          </span>
          <span>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </span>
        </div>
      </div>
    </footer>
  );
}
