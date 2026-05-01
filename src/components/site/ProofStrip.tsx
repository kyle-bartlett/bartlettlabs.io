type ProofStripProps = {
  items: readonly string[];
};

export function ProofStrip({ items }: ProofStripProps) {
  return (
    <section className="section-tight">
      <div className="container-bl">
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item} className="site-panel px-6 py-5">
              <span className="proof-badge">Proof</span>
              <p
                className="mt-4 text-lg leading-7"
                style={{ color: "var(--color-text-heading)" }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
