const benefits = [
  "Find out why your posts and ads are not bringing orders",
  "Know exactly what to post and where to put your effort",
  "Stop wasting money on boosting posts without a plan",
  "Get a plan made for your business, not generic tips",
  "Receive your customized marketing plan as a PDF",
  "Leave the call knowing what to do next",
];

function CheckIcon() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow-soft text-brand-navy" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path d="m5 12 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Benefits() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="benefits-title">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-brand-navy/60">What you walk away with</p>
          <h2 id="benefits-title" className="text-3xl font-extrabold tracking-[-0.035em] text-brand-navy sm:text-5xl">
            How You Benefit From This Consultation
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex min-h-36 gap-4 rounded-2xl border border-border bg-white p-6 shadow-[0_12px_40px_rgba(10,16,51,0.06)] transition duration-200 hover:-translate-y-1 hover:border-brand-yellow/70">
              <CheckIcon />
              <p className="pt-1 text-base font-bold leading-6 text-brand-navy">{benefit}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
