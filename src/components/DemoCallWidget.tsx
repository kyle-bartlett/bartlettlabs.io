const DEMO_NUMBER_DISPLAY = "(979) 987-4241";
const DEMO_NUMBER_TEL = "+19799874241";

export function DemoCallWidget() {
  return (
    <div className="mx-auto max-w-xl">
      <article className="card-warm flex flex-col p-8 md:p-9">
        <span className="eyebrow">Call it now</span>
        <h2
          className="mt-4 text-3xl md:text-4xl"
          style={{ color: "var(--color-text-heading)", fontFamily: "var(--font-display)" }}
        >
          Call our live demo line.
        </h2>
        <p className="mt-4 flex-1 text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>
          Dial the number and the AI receptionist answers, qualifies you, and books an appointment —
          exactly how it would answer for your business. Nothing to fill out, nothing to sign up for.
        </p>
        <a href={`tel:${DEMO_NUMBER_TEL}`} className="btn-primary mt-7 w-fit">
          Call {DEMO_NUMBER_DISPLAY}
        </a>
        <p className="mt-3 text-xs leading-6" style={{ color: "var(--color-text-muted)" }}>
          You&apos;re calling as a customer would. Standard call rates may apply.
        </p>
      </article>
    </div>
  );
}

export default DemoCallWidget;
