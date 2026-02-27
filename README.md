# IbnMetwaly-Portfolio_Website

## Environment variables

This project requires Supabase configuration to be provided via Vite environment variables.

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
