import { MapPin, Clock, Phone } from "lucide-react";
import ScrollFadeIn from "./ScrollFadeIn";

const hours = [
  { day: "Monday", time: "8:00 AM - 6:00 PM" },
  { day: "Tuesday", time: "8:00 AM - 6:00 PM" },
  { day: "Wednesday", time: "8:00 AM - 6:00 PM" },
  { day: "Thursday", time: "8:00 AM - 6:00 PM" },
  { day: "Friday", time: "8:00 AM - 6:00 PM" },
  { day: "Saturday", time: "8:00 AM - 2:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function Location() {
  return (
    <section id="location" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn>
          <div className="text-center mb-16">
            <span className="text-cyan font-semibold text-sm uppercase tracking-widest">
              Find Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mt-3 mb-4">
              Location &amp; Hours
            </h2>
            <p className="text-slate-secondary text-lg max-w-2xl mx-auto">
              Conveniently located on N Main St in Baytown. Stop by or give us a
              call to schedule your appointment.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <ScrollFadeIn>
            <div className="rounded-2xl overflow-hidden border border-slate-border shadow-sm h-[400px] lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.1!2d-94.9667!3d29.7667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z911+N+Main+St%2C+Baytown%2C+TX+77520!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Santiago's Auto Repair Location"
              />
            </div>
          </ScrollFadeIn>

          {/* Info Cards */}
          <ScrollFadeIn delay={150}>
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-offwhite border border-slate-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-1 text-lg">
                      Address
                    </h3>
                    <p className="text-slate-secondary">
                      911 N Main St
                      <br />
                      Baytown, TX 77520
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-offwhite border border-slate-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-1 text-lg">Phone</h3>
                    <a
                      href="tel:8325802569"
                      className="text-cyan hover:text-cyan-dark font-semibold text-xl transition-colors"
                    >
                      (832) 580-2569
                    </a>
                    <p className="text-slate-secondary text-sm mt-1">
                      Call or text to schedule
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-offwhite border border-slate-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-cyan" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-navy mb-3 text-lg">
                      Business Hours
                    </h3>
                    <div className="space-y-2">
                      {hours.map((h) => (
                        <div
                          key={h.day}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-slate-text font-medium">
                            {h.day}
                          </span>
                          <span
                            className={
                              h.time === "Closed"
                                ? "text-red-500 font-medium"
                                : "text-slate-secondary"
                            }
                          >
                            {h.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}
