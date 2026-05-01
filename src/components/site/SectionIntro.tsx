type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionIntroProps) {
  const centered = align === "center";

  return (
    <div
      className={`mb-10 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className="mt-4 text-4xl leading-tight md:text-5xl"
        style={{
          color: "var(--color-text-heading)",
          fontFamily: "var(--font-display)",
        }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-8 md:text-lg ${centered ? "mx-auto" : ""}`}
          style={{ color: "var(--color-text-muted)" }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
