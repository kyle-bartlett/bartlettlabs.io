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
                A Family Legacy in Tile
              </h2>
              <div className="space-y-4 text-slate-secondary leading-relaxed">
                <p>
                  Sergio&apos;s Ceramic Tile started over 40 years ago with a
                  simple belief: do the job right, treat people fair, and the
                  work will speak for itself. That philosophy hasn&apos;t changed.
                  What started as one man with a trowel and a truck has grown
                  into Crosby&apos;s go-to name for tile installation.
                </p>
                <p>
                  We&apos;re not a franchise. We&apos;re not a big corporate
                  operation with salespeople who never touch a tile. When you
                  hire Sergio&apos;s, you get experienced installers who take
                  personal pride in every single project, whether it&apos;s a small
                  backsplash or a 3,000-square-foot commercial floor.
                </p>
                <p>
                  We&apos;ve built our reputation one bathroom, one kitchen, one
                  entryway at a time. Neighbors recommend us to neighbors.
                  Builders call us back project after project. That kind of
                  trust takes decades to earn, and we protect it every day.
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
                  title: "Family Owned & Operated",
                  text: "We treat your home like it's our own. Every project gets our full attention, from the first measurement to the final grout line.",
                },
                {
                  icon: Shield,
                  title: "40+ Years of Trust",
                  text: "Four decades of consistent quality work in the same community. Our reputation is our most valuable asset, and we earn it on every job.",
                },
                {
                  icon: ThumbsUp,
                  title: "Quality That Lasts",
                  text: "We use proper techniques, quality materials, and take the time to do it right. Our tile work doesn't crack, pop, or need replacing in a few years.",
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
