"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LeadData, submitLead } from "@/lib/submitLead";

type FieldName = keyof LeadData;
type Errors = Partial<Record<FieldName | "form", string>>;

const initialValues: LeadData = {
  fullName: "",
  email: "",
  whatsapp: "",
  businessName: "",
  businessUrl: "",
  message: "",
  websiteConfirm: "",
};

function ErrorMessage({ id, children }: { id: string; children?: string }) {
  if (!children) return null;

  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-error" role="alert">
      <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-11.5a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Zm0 7a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
      </svg>
      {children}
    </p>
  );
}

function validate(values: LeadData): Errors {
  const errors: Errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?\d{7,15}$/;

  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!values.email.trim()) errors.email = "Please enter your active email.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.whatsapp.trim()) errors.whatsapp = "Please enter your WhatsApp number.";
  else if (!phonePattern.test(values.whatsapp.trim())) errors.whatsapp = "Use 7–15 digits, with an optional + at the start.";
  if (!values.businessName.trim()) errors.businessName = "Please enter your business name.";

  if (values.businessUrl.trim()) {
    try {
      const url = new URL(values.businessUrl.trim());
      if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("Invalid protocol");
    } catch {
      errors.businessUrl = "Enter a full URL beginning with http:// or https://.";
    }
  }

  return errors;
}

export function CTAForm() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field] || errors.form) {
      setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstField = Object.keys(nextErrors)[0];
      requestAnimationFrame(() => document.getElementById(firstField)?.focus());
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await submitLead(values);
      router.push("/thank-you");
    } catch {
      setErrors({ form: "We could not send your request. Please check your connection and try again." });
      setIsSubmitting(false);
    }
  }

  const inputClass = "mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-brand-navy placeholder:text-body-text/55 transition hover:border-brand-navy/30 focus:border-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-yellow/25";
  const labelClass = "text-sm font-extrabold text-brand-navy";

  return (
    <section id="book" className="bg-brand-yellow-soft px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="book-title">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border border-t-4 border-t-brand-yellow bg-white shadow-[0_24px_80px_rgba(10,16,51,0.12)]">
        <div className="px-5 py-10 sm:px-10 sm:py-14 lg:px-16">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-navy/60">One-to-One Consultation</p>
            <h2 id="book-title" className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-headline-blue sm:text-5xl">Book the Call</h2>
            <p className="mt-3 font-semibold text-body-text">Customized Strategy for Your Business</p>
          </div>

          <form className="mt-10" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className={labelClass}>Full Name <span aria-hidden="true">*</span></label>
                <input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="Your full name" value={values.fullName} onChange={(event) => updateField("fullName", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} />
                <ErrorMessage id="fullName-error">{errors.fullName}</ErrorMessage>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Active Email <span aria-hidden="true">*</span></label>
                <input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(event) => updateField("email", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
                <ErrorMessage id="email-error">{errors.email}</ErrorMessage>
              </div>

              <div>
                <label htmlFor="whatsapp" className={labelClass}>WhatsApp Number <span aria-hidden="true">*</span></label>
                <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+48123456789" value={values.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined} />
                <ErrorMessage id="whatsapp-error">{errors.whatsapp}</ErrorMessage>
              </div>

              <div>
                <label htmlFor="businessName" className={labelClass}>Business Name <span aria-hidden="true">*</span></label>
                <input id="businessName" name="businessName" type="text" autoComplete="organization" placeholder="Your business name" value={values.businessName} onChange={(event) => updateField("businessName", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.businessName)} aria-describedby={errors.businessName ? "businessName-error" : undefined} />
                <ErrorMessage id="businessName-error">{errors.businessName}</ErrorMessage>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="businessUrl" className={labelClass}>Website or Facebook URL <span className="font-medium text-body-text">(optional)</span></label>
                <input id="businessUrl" name="businessUrl" type="url" inputMode="url" autoComplete="url" placeholder="https://yourbusiness.com" value={values.businessUrl} onChange={(event) => updateField("businessUrl", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.businessUrl)} aria-describedby={errors.businessUrl ? "businessUrl-error" : undefined} />
                <ErrorMessage id="businessUrl-error">{errors.businessUrl}</ErrorMessage>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClass}>Anything You Want to Say <span className="font-medium text-body-text">(optional)</span></label>
                <textarea id="message" name="message" rows={5} placeholder="Tell me what you would like help with" value={values.message} onChange={(event) => updateField("message", event.target.value)} className={`${inputClass} resize-y`} />
              </div>
            </div>

            <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="websiteConfirm">Leave this field empty</label>
              <input id="websiteConfirm" name="websiteConfirm" type="text" tabIndex={-1} autoComplete="off" value={values.websiteConfirm} onChange={(event) => updateField("websiteConfirm", event.target.value)} />
            </div>

            {errors.form && (
              <div className="mt-6 rounded-xl border border-error/25 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-error" role="alert" aria-live="assertive">
                {errors.form}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="primary-cta mt-8 w-full disabled:cursor-wait disabled:opacity-70" aria-busy={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Sending your request…
                </span>
              ) : "Book Free Consultation"}
            </button>
            <p className="mt-4 text-center text-sm font-semibold text-body-text">We respect your privacy. No spam.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
