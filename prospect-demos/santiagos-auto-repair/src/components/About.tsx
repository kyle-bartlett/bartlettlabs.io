import { Heart, Shield, ThumbsUp } from "lucide-react";
import ScrollFadeIn from "./ScrollFadeIn";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <ScrollFadeIn>
            <div>
              <span className="text-cyan font-semibold text-sm uppercase tracking-widest">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-3 mb-6">
                Your Neighborhood Auto Shop
              </h2>
              <div className="space-y-4 text-slate-secondary leading-relaxed">
                <p>
                  Santiago&apos;s Auto Repair is a family-owned shop right here in
                  the heart of Baytown. We opened our doors with a simple
                  mission: give our neighbors the honest, affordable auto repair
                  they deserve.
                </p>
                <p>
                  Too many shops try to upsell work you don&apos;t need. That&apos;s not
                  how we do things. When you bring your car to us, we&apos;ll tell
                  you exactly what&apos;s wrong, what it costs, and how long
                  it&apos;ll take. No surprises, no runaround.
                </p>
                <p>
                  We work on all makes and models, from daily drivers to work
                  trucks. Whether it&apos;s a quick oil change or a major engine
                  repair, we treat every vehicle like it&apos;s our own.
                </p>
              </div>
            </div>
          </ScrollFadeIn>

          {/* Values Cards */}
          <ScrollFadeIn delay={150}>
            <div className="space-y-4">
              {[
                {
                  icon: Heart,
                  title: "Family Values",
                  text: "We treat every customer like family. Your trust matters more to us than any upsell.",
                },
                {
                  icon: Shield,
                  title: "Honest Service",
                  text: "We'll never recommend work you don't need. Transparency is how we've earned 75+ five-star reviews.",
                },
                {
                  icon: ThumbsUp,
                  title: "Fair Pricing",
                  text: "Quality work doesn't have to break the bank. We keep our prices fair and competitive.",
                },
              ].map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="flex gap-4 bg-white border border-slate-border rounded-2xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy mb-1">
                        {value.title}
                      </h3>
                      <p className="text-slate-secondary text-sm leading-relaxed">
                        {value.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}
