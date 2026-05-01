import { Star, Clock, BadgeDollarSign, Award } from "lucide-react";
import ScrollFadeIn from "./ScrollFadeIn";

const trustSignals = [
  {
    icon: Clock,
    stat: "40+",
    title: "Years in Business",
    description:
      "Serving the Crosby and Greater Houston area since the mid-1980s. Four decades of hands-on tile experience you can trust with your home or business.",
  },
  {
    icon: Star,
    stat: "4.78★",
    title: "Google Rating",
    description:
      "One of the highest-rated tile installers in the Houston area. Our reputation is built on quality craftsmanship and honest service, one project at a time.",
  },
  {
    icon: Award,
    stat: "Expert",
    title: "Master Craftsmanship",
    description:
      "Every cut, every grout line, every layout is done with the precision that only comes from decades of experience. We don't cut corners on quality.",
  },
  {
    icon: BadgeDollarSign,
    stat: "Free",
    title: "Estimates & Fair Pricing",
    description:
      "We provide free, detailed estimates with no hidden fees. You'll know exactly what the job costs before we start. No surprises on your final bill.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 sm:py-28 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn>
          <div className="text-center mb-16">
            <span className="text-cyan font-semibold text-sm uppercase tracking-widest">
              Why Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mt-3 mb-4">
              Why Choose Sergio&apos;s?
            </h2>
            <p className="text-slate-secondary text-lg max-w-2xl mx-auto">
              When your home or business needs tile work, you want a team that&apos;s
              been doing this longer than most companies have existed.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustSignals.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollFadeIn key={item.title} delay={index * 100}>
                <div className="bg-white border border-slate-border rounded-2xl p-8 text-center hover:shadow-lg hover:shadow-cyan/5 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-navy mx-auto mb-5 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-cyan" />
                  </div>
                  <div className="text-3xl font-extrabold text-cyan mb-1">
                    {item.stat}
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-secondary text-sm leading-relaxed">
                    {item.description}
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
