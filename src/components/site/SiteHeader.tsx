"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, PhoneCall, X } from "lucide-react";
import { navIndustryLinks, navServiceAreaLinks } from "@/content/growth-system";
import { siteConfig } from "@/content/site";

const primaryLinks = [
  { label: "How it works", href: "/#how" },
  { label: "Demos", href: "/#demos" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

function Dropdown({
  label,
  links,
  wide,
}: {
  label: string;
  links: Array<{ label: string; href: string }>;
  wide?: boolean;
}) {
  return (
    <div className="growth-nav-dropdown">
      <button type="button" className="growth-nav-link" aria-haspopup="true">
        {label}
        <ChevronDown aria-hidden="true" size={14} />
      </button>
      <div className={wide ? "growth-dropdown-panel growth-dropdown-panel-wide" : "growth-dropdown-panel"}>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className={isHome ? "growth-header growth-header-home" : "growth-header"}>
      <div className="growth-header-inner">
        <Link href="/" className="growth-brand" onClick={() => setMenuOpen(false)}>
          <span>BL</span>
          <strong>Bartlett Labs</strong>
        </Link>

        <nav className="growth-nav" aria-label="Primary navigation">
          <Dropdown label="Industries" links={navIndustryLinks} />
          <Dropdown label="Service Areas" links={navServiceAreaLinks} wide />
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="growth-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="growth-header-actions">
          <a href={`tel:${siteConfig.phone.raw}`} className="growth-phone-link">
            <PhoneCall aria-hidden="true" size={15} />
            {siteConfig.phone.display}
          </a>
          <Link href={siteConfig.booking.path} className="growth-header-cta">
            Request Audit
          </Link>
        </div>

        <button
          type="button"
          className="growth-mobile-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      {menuOpen ? (
        <nav className="growth-mobile-nav" aria-label="Mobile navigation">
          <Link href="/#how" onClick={() => setMenuOpen(false)}>
            How it works
          </Link>
          <Link href="/#demos" onClick={() => setMenuOpen(false)}>
            Demos
          </Link>
          <Link href="/#pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="/work" onClick={() => setMenuOpen(false)}>
            Work
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <div>
            <span>Industries</span>
            <div>
              {navIndustryLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <span>Service Areas</span>
            <div>
              {navServiceAreaLinks.slice(0, 12).map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <a href={`tel:${siteConfig.phone.raw}`} onClick={() => setMenuOpen(false)}>
            {siteConfig.phone.display}
          </a>
          <Link href={siteConfig.booking.path} className="growth-header-cta" onClick={() => setMenuOpen(false)}>
            Request Audit
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
