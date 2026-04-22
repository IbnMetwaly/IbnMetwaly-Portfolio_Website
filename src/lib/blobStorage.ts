const VERCEL_BLOB_BASE_URL = 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com';

type BlobFile = {
  name: string;
  path: string;
};

function trimSlashes(value: string) {
  return value.replace(/^\/+|\/+$/g, '');
}

export function getBlobPublicUrl(path: string) {
  const normalizedPath = trimSlashes(path);
  return `${VERCEL_BLOB_BASE_URL}/${normalizedPath}`;
}

export async function fetchBlobFileList(manifestPath: string) {
  const manifestUrl = getBlobPublicUrl(manifestPath);
  const response = await fetch(manifestUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blob manifest: ${manifestUrl}`);
  }

  const payload = await response.json();

  if (!Array.isArray(payload)) {
    throw new Error(`Invalid blob manifest format at: ${manifestUrl}`);
  }

  return payload
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    .map((item) => {
      const normalizedPath = trimSlashes(item);
      return {
        name: normalizedPath.split('/').pop() || normalizedPath,
        path: normalizedPath,
      } satisfies BlobFile;
    });
}
