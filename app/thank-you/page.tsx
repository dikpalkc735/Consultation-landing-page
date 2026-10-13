import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { VIMEO_URL, WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/lib/config";

export const metadata: Metadata = {
  title: "Thank You | Digital Dikpal",
  robots: {
    index: false,
    follow: false,
  },
};

function getVimeoEmbedUrl(url: string) {
  if (!url.trim()) return "";

  try {
    const parsedUrl = new URL(url);
    const match = parsedUrl.pathname.match(/\/(?:video\/)?(\d+)/);
    if (!match) return "";

    const embedUrl = new URL(`https://player.vimeo.com/video/${match[1]}`);
    const privacyHash = parsedUrl.searchParams.get("h");
    if (privacyHash) embedUrl.searchParams.set("h", privacyHash);
    embedUrl.searchParams.set("app_id", "122963");

    return embedUrl.toString();
  } catch {
    return "";
  }
}

export default function ThankYouPage() {
  const vimeoEmbedUrl = getVimeoEmbedUrl(VIMEO_URL);
  const whatsappNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : "";

  return (
    <>
      <Header />
      <main className="hero-surface relative isolate min-h-[calc(100vh-8rem)] overflow-hidden px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16">
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-35" aria-hidden="true" />
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy text-brand-yellow shadow-[0_12px_35px_rgba(10,16,51,0.18)]" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
              <path d="m5 12 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="mt-7 text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-headline-blue sm:text-6xl">
            <span className="marker-highlight">Thank You!</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-extrabold leading-8 text-brand-navy sm:text-2xl">
            Your Consultation Request Has Been Received.
          </p>
          <section className="mt-10" aria-labelledby="video-title">
            <h2 id="video-title" className="text-2xl font-extrabold tracking-tight text-headline-blue sm:text-3xl">
              Watch This Short Video
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-body-text">
              See what happens next and how to get ready for your consultation.
            </p>

            <div className="mt-6 aspect-video overflow-hidden rounded-2xl bg-brand-navy shadow-[0_18px_55px_rgba(10,16,51,0.2)]">
              {vimeoEmbedUrl ? (
              <iframe
                src={vimeoEmbedUrl}
                title="What happens next after requesting a consultation"
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center text-white">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow text-brand-navy" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">
                      <path d="M8 5.5v13l10-6.5L8 5.5Z" />
                    </svg>
                  </span>
                  <p className="font-bold">Video coming soon</p>
                </div>
              )}
            </div>
          </section>

          {whatsappUrl && (
            <section className="mt-10 rounded-3xl border border-border bg-white/90 px-5 py-8 shadow-[0_12px_40px_rgba(10,16,51,0.08)] sm:px-10" aria-labelledby="whatsapp-title">
              <h2 id="whatsapp-title" className="text-2xl font-extrabold tracking-tight text-headline-blue sm:text-3xl">
                Connect With Me on WhatsApp
              </h2>
              <p className="mx-auto mt-3 max-w-lg leading-7 text-body-text">
                Send me a quick message so we can choose a convenient time for your 30-minute consultation.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-cta mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-extrabold text-white shadow-[0_12px_35px_rgba(37,211,102,0.25)] transition hover:-translate-y-0.5 hover:brightness-95 sm:w-auto"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a9.84 9.84 0 0 0-8.5 14.8L2 22l5.32-1.4A9.95 9.95 0 1 0 12 2Zm0 17.95a8 8 0 0 1-4.08-1.12l-.3-.18-3.16.83.84-3.08-.2-.32A7.9 7.9 0 1 1 12 19.95Zm4.34-5.92c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18a7.16 7.16 0 0 1-1.32-1.64c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46a.88.88 0 0 0-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.4-.58 1.6-1.13.2-.56.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
                </svg>
                Connect With Me on WhatsApp
              </a>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
