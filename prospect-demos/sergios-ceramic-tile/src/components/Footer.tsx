import { MapPin, Phone, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-light border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <span className="text-white font-bold tracking-tight">
                  Sergio&apos;s
                </span>
                <span className="text-cyan text-xs block -mt-0.5 font-medium">
                  Ceramic Tile
                </span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Crosby&apos;s most trusted tile installer for over 40 years.
              Expert craftsmanship, fair pricing, and quality that lasts a
              lifetime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "#services", label: "Services" },
                { href: "#why-us", label: "Why Choose Us" },
                { href: "#reviews", label: "Reviews" },
                { href: "#about", label: "About" },
                { href: "#location", label: "Location" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-cyan text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Ceramic Tile Installation",
                "Bathroom Remodels",
                "Kitchen Backsplash",
                "Flooring",
                "Commercial Tile",
                "Tile Repair",
              ].map((service) => (
                <li key={service}>
                  <span className="text-white/40 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                <span className="text-white/40 text-sm">
                  Crosby, TX
                  <br />
                  Serving Greater Houston
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan shrink-0" />
                <a
                  href="tel:2812280025"
                  className="text-white/40 hover:text-cyan text-sm transition-colors"
                >
                  (281) 228-0025
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Sergio&apos;s Ceramic Tile. All
            rights reserved.
          </p>
          <a
            href="https://bartlettlabs.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/30 hover:text-cyan text-xs transition-colors"
          >
            Website by Bartlett Labs
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
