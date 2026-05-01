"use client";

import { Phone, Send } from "lucide-react";
import ScrollFadeIn from "./ScrollFadeIn";
import { useState, type FormEvent } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-navy relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollFadeIn>
          <div className="text-center mb-16">
            <span className="text-cyan font-semibold text-sm uppercase tracking-widest">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4">
              Ready to Transform
              <br className="hidden sm:block" /> Your Space?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Whether you need a bathroom remodel, a kitchen backsplash, or a
              full commercial tile job, we&apos;re here to help. Call us or fill
              out the form for a free estimate.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Call CTA */}
          <ScrollFadeIn>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full">
              <div className="w-16 h-16 rounded-2xl bg-cyan flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Call Us Now
              </h3>
              <p className="text-white/60 mb-6 max-w-sm">
                The fastest way to get your project started. We&apos;ll answer
                your questions, schedule a visit, and give you a free estimate
                on the spot.
              </p>
              <a
                href="tel:2812280025"
                className="inline-flex items-center gap-3 bg-cyan hover:bg-cyan-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-cyan/25"
              >
                <Phone className="w-5 h-5" />
                (281) 228-0025
              </a>
            </div>
          </ScrollFadeIn>

          {/* Quote Form */}
          <ScrollFadeIn delay={150}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Request a Free Estimate
              </h3>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-lg">
                    Estimate Request Sent!
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan/50 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="(281) 555-0123"
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan/50 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-1.5">
                      Project Type
                    </label>
                    <select className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan/50 transition-all text-sm appearance-none">
                      <option value="" className="bg-navy">
                        Select a project type...
                      </option>
                      <option value="bathroom" className="bg-navy">
                        Bathroom Remodel
                      </option>
                      <option value="kitchen" className="bg-navy">
                        Kitchen Backsplash
                      </option>
                      <option value="flooring" className="bg-navy">
                        Floor Tile Installation
                      </option>
                      <option value="shower" className="bg-navy">
                        Custom Shower
                      </option>
                      <option value="commercial" className="bg-navy">
                        Commercial Project
                      </option>
                      <option value="repair" className="bg-navy">
                        Tile Repair
                      </option>
                      <option value="other" className="bg-navy">
                        Other
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-1.5">
                      Tell us about your project
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe the tile work you need, approximate area size, timeline..."
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan/50 transition-all text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-cyan hover:bg-cyan-dark text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-cyan/25"
                  >
                    <Send className="w-4 h-4" />
                    Request Free Estimate
                  </button>
                  <p className="text-white/30 text-xs text-center">
                    This form is for demonstration purposes only.
                  </p>
                </form>
              )}
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}
