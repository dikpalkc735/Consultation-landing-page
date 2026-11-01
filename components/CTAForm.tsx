"use client";

import { FormEvent, useEffect, useState } from "react";

type LeadData = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  businessUrl: string;
  message: string;
  websiteConfirm: string;
};

type FlodeskFunction = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    FlodeskObject?: string;
    fd?: FlodeskFunction;
  }
}

const FLODESK_FORM_ID = "6ae783ed710a75e6f8beb639";
const FLODESK_ROOT_SELECTOR = ".flodesk-consultation-form";
const FLODESK_FORM_ACTION = `https://form.flodesk.com/forms/${FLODESK_FORM_ID}/submit`;
const FLODESK_FORM_CONFIG =
  "eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJyZWRpcmVjdCIsIm1lc3NhZ2UiOiIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vY29uc3VsdGF0aW9uLmRpZ2l0YWxkaWtwYWwuY29tL3RoYW5rLXlvdSJ9LCJjb2kiOnRydWUsInNob3dGb3JSZXR1cm5WaXNpdG9ycyI6dHJ1ZSwibm90aWZpY2F0aW9uIjp0cnVlLCJnZHByIjp7ImFjY2VwdHNNYXJrZXRpbmciOmZhbHNlLCJwcml2YWN5UG9saWN5Ijp7ImVuYWJsZWQiOmZhbHNlLCJtYW5kYXRvcnkiOmZhbHNlfX0sInRyYWNraW5nQ29uZmlnIjp7Im1ldGFQaXhlbElkIjoiIiwiY29va2llQmFubmVyRW5hYmxlZCI6ZmFsc2UsImdvb2dsZUFuYWx5dGljc0lkIjoiIn19";

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

  if (!values.businessUrl.trim()) errors.businessUrl = "Please enter your website or Facebook URL.";
  if (!values.message.trim()) errors.message = "Please tell us briefly what you would like help with.";

  return errors;
}

export function CTAForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    window.FlodeskObject = "fd";

    if (!window.fd) {
      const fd: FlodeskFunction = (...args: unknown[]) => {
        (fd.q ??= []).push(args);
      };
      window.fd = fd;
    }

    if (!document.querySelector("script[data-flodesk-universal]")) {
      const version = `?v=${Math.floor(Date.now() / (120 * 1000)) * 60}`;
      const moduleScript = document.createElement("script");
      moduleScript.async = true;
      moduleScript.type = "module";
      moduleScript.src = `https://assets.flodesk.com/universal.mjs${version}`;
      moduleScript.dataset.flodeskUniversal = "module";
      document.head.appendChild(moduleScript);

      const fallbackScript = document.createElement("script");
      fallbackScript.async = true;
      fallbackScript.noModule = true;
      fallbackScript.src = `https://assets.flodesk.com/universal.js${version}`;
      fallbackScript.dataset.flodeskUniversal = "fallback";
      document.head.appendChild(fallbackScript);
    }

    window.fd("form:handle", {
      formId: FLODESK_FORM_ID,
      rootEl: FLODESK_ROOT_SELECTOR,
    });
  }, []);

  function updateField(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field] || errors.form) {
      setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      setErrors(nextErrors);
      const firstField = Object.keys(nextErrors)[0];
      requestAnimationFrame(() => document.getElementById(firstField)?.focus());
      return;
    }

    setErrors({});
    // Do not prevent the valid submission. Flodesk's official handler sends the
    // form to the configured segment and performs the configured success redirect.
  }

  const inputClass = "mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-brand-navy placeholder:text-body-text/55 transition hover:border-brand-navy/30 focus:border-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-yellow/25";
  const labelClass = "text-sm font-extrabold text-brand-navy";

  return (
    <section
      id="book"
      className="flodesk-consultation-form bg-brand-yellow-soft px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="book-title"
      data-ff-el="root"
      data-ff-version="3"
      data-ff-type="inline"
      data-ff-name="inlineNoImage"
      data-ff-stage="default"
    >
      <div data-ff-el="config" data-ff-config={FLODESK_FORM_CONFIG} hidden />
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border border-t-4 border-t-brand-yellow bg-white shadow-[0_24px_80px_rgba(10,16,51,0.12)]">
        <div className="px-5 py-10 sm:px-10 sm:py-14 lg:px-16">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-navy/60">One-to-One Consultation</p>
            <h2 id="book-title" className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-headline-blue sm:text-5xl">Book the Call</h2>
            <p className="mt-3 font-semibold text-body-text">Customized Strategy for Your Business</p>
          </div>

          <form
            className="mt-10"
            action={FLODESK_FORM_ACTION}
            method="post"
            onSubmit={handleSubmit}
            noValidate
            data-ff-el="form"
          >
            <div className="fd-form-content" data-ff-el="content">
              <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2" data-ff-el="fields">
                <div>
                  <label htmlFor="fullName" className={labelClass}>Full Name <span aria-hidden="true">*</span></label>
                  <input id="fullName" name="firstName" type="text" maxLength={255} autoComplete="name" placeholder="Your full name" value={values.fullName} onChange={(event) => updateField("fullName", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} data-ff-tab="firstName::email" required />
                  <ErrorMessage id="fullName-error">{errors.fullName}</ErrorMessage>
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>Active Email <span aria-hidden="true">*</span></label>
                  <input id="email" name="email" type="email" maxLength={255} inputMode="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(event) => updateField("email", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} data-ff-tab="email:firstName:fields.whatsappNumber" required />
                  <ErrorMessage id="email-error">{errors.email}</ErrorMessage>
                </div>

                <div>
                  <label htmlFor="whatsapp" className={labelClass}>WhatsApp Number <span aria-hidden="true">*</span></label>
                  <input id="whatsapp" name="fields.whatsappNumber" type="tel" maxLength={255} inputMode="tel" autoComplete="tel" placeholder="+48123456789" value={values.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined} data-ff-tab="fields.whatsappNumber:email:fields.businessName" required />
                  <ErrorMessage id="whatsapp-error">{errors.whatsapp}</ErrorMessage>
                </div>

                <div>
                  <label htmlFor="businessName" className={labelClass}>Business Name <span aria-hidden="true">*</span></label>
                  <input id="businessName" name="fields.businessName" type="text" maxLength={255} autoComplete="organization" placeholder="Your business name" value={values.businessName} onChange={(event) => updateField("businessName", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.businessName)} aria-describedby={errors.businessName ? "businessName-error" : undefined} data-ff-tab="fields.businessName:fields.whatsappNumber:fields.websiteOrFacebookLink" required />
                  <ErrorMessage id="businessName-error">{errors.businessName}</ErrorMessage>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="businessUrl" className={labelClass}>Website or Facebook URL <span aria-hidden="true">*</span></label>
                  <input id="businessUrl" name="fields.websiteOrFacebookLink" type="url" maxLength={255} inputMode="url" autoComplete="url" placeholder="https://yourbusiness.com" value={values.businessUrl} onChange={(event) => updateField("businessUrl", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.businessUrl)} aria-describedby={errors.businessUrl ? "businessUrl-error" : undefined} data-ff-tab="fields.websiteOrFacebookLink:fields.businessName:fields.anythingYouWnatToSay" required />
                  <ErrorMessage id="businessUrl-error">{errors.businessUrl}</ErrorMessage>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelClass}>Anything You Want to Say <span aria-hidden="true">*</span></label>
                  <textarea id="message" name="fields.anythingYouWnatToSay" rows={5} maxLength={255} placeholder="Tell me what you would like help with" value={values.message} onChange={(event) => updateField("message", event.target.value)} className={`${inputClass} resize-y`} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} data-ff-tab="fields.anythingYouWnatToSay:fields.websiteOrFacebookLink:submit" required />
                  <ErrorMessage id="message-error">{errors.message}</ErrorMessage>
                </div>
              </div>

              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="confirm_email_address">Leave this field empty</label>
                <input id="confirm_email_address" name="confirm_email_address" type="text" maxLength={255} tabIndex={-1} autoComplete="off" value={values.websiteConfirm} onChange={(event) => updateField("websiteConfirm", event.target.value)} />
              </div>

              <div data-ff-el="footer">
                <button type="submit" className="primary-cta mt-8 w-full disabled:cursor-wait disabled:opacity-70" data-ff-el="submit" data-ff-tab="submit">
                  Book Free Consultation
                </button>
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-body-text">We respect your privacy. No spam.</p>
            </div>

            <div className="fd-form-success text-center font-semibold text-brand-navy" data-ff-el="success">
              Your request was sent successfully. Redirecting…
            </div>
            <div className="fd-form-error mt-6 rounded-xl border border-error/25 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-error" role="alert" aria-live="assertive" data-ff-el="error" />
          </form>
        </div>
      </div>

    </section>
  );
}
