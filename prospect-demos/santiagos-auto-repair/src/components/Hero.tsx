import { Phone, FileText, Star, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-pattern" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-cyan/8 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 pb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-amber-400 fill-amber-400"
              />
            ))}
          </div>
          <span className="text-white/90 text-sm font-medium">
            4.9 Stars on Google
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Santiago&apos;s
          <br />
          <span className="text-cyan">Auto Repair</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 font-medium">
          Baytown&apos;s Most Trusted Auto Repair
        </p>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10">
          4.9&#9733; with 75+ Reviews. Honest service, fair pricing, and
          experienced technicians you can count on.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="tel:8325802569"
            className="inline-flex items-center gap-3 bg-cyan hover:bg-cyan-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-cyan/25 w-full sm:w-auto justify-center"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 w-full sm:w-auto justify-center"
          >
            <FileText className="w-5 h-5" />
            Get a Quote
          </a>
        </div>

        {/* Location info */}
        <p className="text-white/50 text-sm">
          911 N Main St, Baytown, TX 77520
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-cyan transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
