import { Phone, FileText, Star, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-pattern" />
      <div className="absolute inset-0 tile-grid opacity-40" />

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
                className={`w-4 h-4 ${
                  i < 5
                    ? "text-amber-400 fill-amber-400"
                    : "text-amber-400/30"
                }`}
              />
            ))}
          </div>
          <span className="text-white/90 text-sm font-medium">
            4.78 Stars on Google
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Sergio&apos;s
          <br />
          <span className="text-cyan">Ceramic Tile</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 font-medium">
          Crosby&apos;s Most Trusted Tile Installer Since 1985
        </p>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10">
          Over 40 years of expert craftsmanship. From bathroom remodels to commercial projects,
          we transform spaces with precision tile work that lasts a lifetime.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="tel:2812280025"
            className="inline-flex items-center gap-3 bg-cyan hover:bg-cyan-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-cyan/25 w-full sm:w-auto justify-center"
          >
            <Phone className="w-5 h-5" />
            Call for Free Estimate
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
          Serving Crosby, Baytown, Huffman, Highlands &amp; Greater Houston
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
