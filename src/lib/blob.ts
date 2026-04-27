const DEFAULT_VERCEL_BLOB_URL = 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com';

export function getVercelBlobUrl() {
  const blobUrl = import.meta.env.VITE_VERCEL_BLOB_URL ?? DEFAULT_VERCEL_BLOB_URL;
  return blobUrl.replace(/\/+$/, '');
}

