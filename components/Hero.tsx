export function Hero() {
  return (
    <section className="hero-surface relative isolate overflow-hidden px-5 pb-20 pt-10 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-35" aria-hidden="true" />
      <div className="mx-auto max-w-5xl text-center">
        <p className="fade-up mb-5 inline-flex rounded-full border border-brand-yellow/50 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-navy shadow-sm sm:text-sm">
          Free 30-minute AI marketing consultation
        </p>

        <h1 className="fade-up mx-auto max-w-5xl text-[2.05rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-headline-blue min-[375px]:text-[2.35rem] sm:text-5xl lg:text-[4.25rem]">
          Get a <span className="marker-highlight">Clear Plan</span> to Turn Your Marketing Into More Customers.
        </h1>

        <p className="fade-up-delay mx-auto mt-7 max-w-3xl text-base font-semibold leading-7 text-brand-navy/80 sm:text-lg sm:leading-8">
          Get a clear, custom marketing plan for your business—in just 30 minutes.
        </p>

        <p className="fade-up-delay mx-auto mt-5 max-w-2xl text-[0.95rem] leading-7 text-body-text sm:text-base">
          Posting every day but not getting orders? Boosting posts but only getting likes? This free AI marketing consultation is for small business owners who want more customers. I will look at your business and give you a plan you can start using immediately.
        </p>

        <a href="#book" className="primary-cta fade-up-delay mt-8 w-full max-w-sm gap-2 sm:w-auto sm:min-w-64">
          Book Free Consultation
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none">
            <path d="M10 4v11m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
