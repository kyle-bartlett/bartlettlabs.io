import Link from "next/link";

type FinalCalloutProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function FinalCallout({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: FinalCalloutProps) {
  const renderAction = (href: string, label: string, className: string) => {
    const useAnchor =
      href === "/book" ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("http");

    return useAnchor ? (
      <a href={href} className={className}>
        {label}
      </a>
    ) : (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  };

  return (
    <section className="section-spacing">
      <div className="container-bl">
        <div
          className="overflow-hidden rounded-[2.25rem] px-8 py-10 md:px-12 md:py-14"
          style={{
            background:
              "linear-gradient(145deg, var(--color-navy), var(--color-navy-light))",
            color: "#f7f2e9",
            boxShadow: "var(--site-shadow-md)",
          }}
        >
          <span className="eyebrow" style={{ color: "rgba(255,255,255,0.75)" }}>
            {eyebrow}
          </span>
          <h2
            className="mt-4 max-w-3xl text-4xl leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[rgba(247,242,233,0.78)]">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {renderAction(primaryHref, primaryLabel, "btn-primary")}
            {secondaryHref && secondaryLabel ? (
              renderAction(secondaryHref, secondaryLabel, "btn-ghost")
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
