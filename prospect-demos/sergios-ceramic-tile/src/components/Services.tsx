import {
  Grid3x3,
  Home,
  Bath,
  CookingPot,
  Building2,
  Layers,
  Paintbrush,
  Hammer,
} from "lucide-react";
import ScrollFadeIn from "./ScrollFadeIn";

const services = [
  {
    icon: Grid3x3,
    name: "Ceramic Tile Installation",
    description:
      "Expert ceramic tile installation for floors, walls, and countertops. Precision cuts, level surfaces, and grouting that stands the test of time.",
  },
  {
    icon: Layers,
    name: "Flooring",
    description:
      "Complete flooring solutions including porcelain, natural stone, marble, and travertine. We handle everything from subfloor prep to the final seal.",
  },
  {
    icon: Bath,
    name: "Bathroom Remodels",
    description:
      "Full bathroom transformations with custom tile showers, tub surrounds, floor-to-ceiling tile work, and waterproof installations built to last.",
  },
  {
    icon: CookingPot,
    name: "Kitchen Backsplash",
    description:
      "Beautiful kitchen backsplashes that protect your walls and elevate your kitchen. Subway tile, mosaic patterns, and custom designs.",
  },
  {
    icon: Building2,
    name: "Commercial Tile",
    description:
      "Large-scale commercial tile projects for offices, retail, restaurants, and more. On-time, on-budget, built to handle heavy foot traffic.",
  },
  {
    icon: Home,
    name: "Custom Showers",
    description:
      "Walk-in showers, curbless designs, and frameless glass-ready tile work. Waterproofing done right so your shower lasts for decades.",
  },
  {
    icon: Paintbrush,
    name: "Decorative Tile Work",
    description:
      "Accent walls, fireplace surrounds, entryway medallions, and custom mosaic designs that make your space truly one of a kind.",
  },
  {
    icon: Hammer,
    name: "Tile Repair & Restoration",
    description:
      "Cracked, chipped, or outdated tile? We handle repairs, re-grouting, and full tear-outs. Bring your existing tile work back to life.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn>
          <div className="text-center mb-16">
            <span className="text-cyan font-semibold text-sm uppercase tracking-widest">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mt-3 mb-4">
              Our Services
            </h2>
            <p className="text-slate-secondary text-lg max-w-2xl mx-auto">
              From a simple backsplash to a complete commercial build-out, we bring
              40+ years of tile expertise to every project we touch.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollFadeIn key={service.name} delay={index * 80}>
                <div className="group bg-offwhite hover:bg-white border border-slate-border hover:border-cyan/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan/5 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 group-hover:bg-cyan/15 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-6 h-6 text-cyan" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">
                    {service.name}
                  </h3>
                  <p className="text-slate-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </ScrollFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
