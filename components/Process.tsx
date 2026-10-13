const steps = [
  {
    title: "Fill out the form",
    description: "Tell me about your business and where you are stuck.",
  },
  {
    title: "Book your call",
    description: "We talk one-to-one for 30 minutes about your business.",
  },
  {
    title: "Get your custom plan",
    description: "You receive a customized marketing plan in PDF format, ready to use.",
  },
];

export function Process() {
  return (
    <section className="bg-section-tint px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="process-title">
      <div className="mx-auto max-w-6xl">
        <h2 id="process-title" className="text-center text-3xl font-extrabold tracking-[-0.035em] text-brand-navy sm:text-5xl">
          Consultation Process
        </h2>

        <ol className="relative mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-border bg-white p-7 shadow-[0_12px_38px_rgba(10,16,51,0.055)] sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-lg font-extrabold text-brand-yellow" aria-label={`Step ${index + 1}`}>
                {index + 1}
              </span>
              <h3 className="mt-6 text-xl font-extrabold text-brand-navy">{step.title}</h3>
              <p className="mt-3 leading-7 text-body-text">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
