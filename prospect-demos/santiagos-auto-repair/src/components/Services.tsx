import {
  Droplets,
  Disc3,
  Cpu,
  Cog,
  Snowflake,
  CircleDot,
  Zap,
  ClipboardCheck,
} from "lucide-react";
import ScrollFadeIn from "./ScrollFadeIn";

const services = [
  {
    icon: Droplets,
    name: "Oil Changes",
    description:
      "Conventional and synthetic oil changes to keep your engine running smooth and extend its life.",
  },
  {
    icon: Disc3,
    name: "Brake Repair",
    description:
      "Pads, rotors, calipers, and full brake system inspections. Your safety is our top priority.",
  },
  {
    icon: Cpu,
    name: "Engine Diagnostics",
    description:
      "Advanced computer diagnostics to pinpoint issues fast. Check engine light? We'll find the problem.",
  },
  {
    icon: Cog,
    name: "Transmission",
    description:
      "Transmission fluid services, repairs, and rebuilds. Manual and automatic transmissions.",
  },
  {
    icon: Snowflake,
    name: "AC Repair",
    description:
      "Stay cool in the Texas heat. Full AC diagnostics, recharging, and component replacement.",
  },
  {
    icon: CircleDot,
    name: "Tire Services",
    description:
      "Rotations, balancing, flat repair, and new tire installation. Keep your ride safe on the road.",
  },
  {
    icon: Zap,
    name: "Electrical",
    description:
      "Battery testing and replacement, alternator repair, starter issues, and wiring diagnostics.",
  },
  {
    icon: ClipboardCheck,
    name: "State Inspections",
    description:
      "Quick and easy Texas state vehicle inspections. Get in and out fast with no hassle.",
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
              From routine maintenance to complex repairs, we handle it all with
              the care and expertise your vehicle deserves.
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
