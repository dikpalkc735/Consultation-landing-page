# Digital Dikpal consultation landing page

A mobile-first Next.js lead-generation page and matching thank-you page for cold Meta Ads traffic.

## Run locally

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and add your form endpoint when ready.
3. Start the local server: `npm run dev`
4. Open `http://localhost:3000`

If `NEXT_PUBLIC_FORM_ENDPOINT` is blank, the form simulates a successful submission and prints this warning in the browser console: `Form is not connected to a backend. Leads are NOT being saved.`

## Connect the form

Set `NEXT_PUBLIC_FORM_ENDPOINT` to an HTTPS endpoint that accepts a JSON `POST` with these fields:

- `fullName`
- `email`
- `whatsapp`
- `businessName`
- `businessUrl`
- `message`

The endpoint should return any 2xx response for success.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repository in Vercel; it will detect Next.js automatically.
3. In **Project Settings → Environment Variables**, add `NEXT_PUBLIC_FORM_ENDPOINT` for Production, Preview, and Development as needed.
4. Optionally add `NEXT_PUBLIC_SITE_URL` with the final custom domain. When omitted, Vercel's generated deployment URL is used.
5. Deploy, then submit a real test lead and confirm it reaches the endpoint before sending ad traffic.

## Before running ads

- [ ] Confirm or replace `public/logo.png`.
- [ ] Confirm the WhatsApp number in `lib/config.ts` includes its international country code.
- [ ] Add the Vimeo URL in `lib/config.ts`.
- [ ] Set `NEXT_PUBLIC_FORM_ENDPOINT` and test that leads are stored.
- [ ] Replace `public/og-image.png` with a 1200 × 630 social image.
- [ ] Replace `app/icon.svg` with the final yellow D favicon.
- [ ] Add the final custom domain as `NEXT_PUBLIC_SITE_URL` if needed.
