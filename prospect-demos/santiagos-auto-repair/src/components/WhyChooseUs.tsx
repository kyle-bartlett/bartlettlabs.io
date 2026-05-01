import { Star, Users, BadgeDollarSign, Wrench } from "lucide-react";
import ScrollFadeIn from "./ScrollFadeIn";

const trustSignals = [
  {
    icon: Star,
    stat: "4.9★",
    title: "Google Rating",
    description:
      "One of the highest-rated auto repair shops in Baytown. Our customers trust us with their vehicles, and our reviews prove it.",
  },
  {
    icon: Users,
    stat: "75+",
    title: "Happy Customers",
    description:
      "Over 75 five-star reviews from real Baytown residents. We earn every single one through honest, quality work.",
  },
  {
    icon: BadgeDollarSign,
    stat: "Fair",
    title: "Honest Pricing",
    description:
      "No hidden fees, no surprise charges. We explain the work upfront so you know exactly what you're paying for.",
  },
  {
    icon: Wrench,
    stat: "Expert",
    title: "Experienced Technicians",
    description:
      "Our team has years of hands-on experience across all makes and models. Your car is in skilled hands.",
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
              Why Choose Santiago&apos;s?
            </h2>
            <p className="text-slate-secondary text-lg max-w-2xl mx-auto">
              When your vehicle needs work, you want a shop you can trust. Here's
              why Baytown trusts us.
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
