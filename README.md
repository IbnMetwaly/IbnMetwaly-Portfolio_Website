# IbnMetwaly-Portfolio_Website

## Environment variables

This project uses:

- Supabase for database + auth.
- Vercel Blob for public asset delivery (certificates and testimonials images).

### Required variables

- `VITE_SUPABASE_URL`: Your Supabase project URL.
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon/public API key.

If either value is missing, the app throws a startup error to fail fast and highlight misconfiguration.

## Local development setup

1. Copy the example env file:

   ```bash
   cp .env.example .env
   ```

2. Fill in the values in `.env`.
3. Start your dev server as usual.

## Production / deployment

Set the same `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values in your hosting provider's environment variable settings.

## Vercel Blob public assets

The app resolves asset URLs from this public base URL:

- `https://yvuaka9diyhj4flq.public.blob.vercel-storage.com`

Expected paths:

- Certifications: `certificates/<file-name>`
- Awards certificates: `<file-path-from-database>`
- Testimonials gallery: files listed in `Testimonials/manifest.json`

`Testimonials/manifest.json` must be a JSON array of relative paths, for example:

```json
[
  "Testimonials/photo-1.jpg",
  "Testimonials/photo-2.png"
]
```
