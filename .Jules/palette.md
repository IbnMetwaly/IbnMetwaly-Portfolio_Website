# Palette UX Journal

## Learnings from Supabase to Vercel Blob Migration

### Micro-UX & Performance
- **Asset Loading:** Moving to Vercel Blob Storage provides a more integrated edge-loading experience for Vercel-hosted apps.
- **Masonry Grid Stability:** When using CSS columns for masonry grids, ensuring that the container is a direct parent of the items helps maintain layout stability.
- **Lazy Loading:** Maintained lazy loading for all testimonial images to ensure the Awards page remains performant despite having 29+ images.

### Accessibility
- **PDF vs Image:** Discovered that some assets were PDFs on Supabase but PNG/JPG on Vercel Blob. Updated the code and translations to ensure the correct extensions are used, preventing broken links in the "View Certificate" modal.
- **Internationalization:** Ensured both Arabic and English translations point to the correct asset paths on the new storage.

### Security & CORS
- **Client-side vs Server-side:** Initially tried to list blobs dynamically using the `@vercel/blob` SDK on the client side. Encountered CORS issues because the listing API is intended for server-side or secure environments.
- **Hardcoding Public Assets:** To avoid exposing sensitive Read/Write tokens on the frontend, opted to hardcode the public URLs for testimonial images. This is a secure and performant pattern for static/semi-static public assets.
