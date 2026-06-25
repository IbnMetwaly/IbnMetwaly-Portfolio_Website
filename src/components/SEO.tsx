import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Khalid Metwaly Portfolio';
const DEFAULT_IMAGE = '/images/khalid-profile.png';

type SEOProps = {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'profile';
};

function getAbsoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${window.location.origin}${path.startsWith('/') ? path : `/${path}`}`;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

export default function SEO({ title, description, image = DEFAULT_IMAGE, type = 'website' }: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = `${title} | ${SITE_NAME}`;
    const pageUrl = getAbsoluteUrl(location.pathname);
    const imageUrl = getAbsoluteUrl(image);

    document.title = pageTitle;
    upsertCanonical(pageUrl);

    upsertMeta('name', 'description', description);

    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', pageUrl);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:site_name', SITE_NAME);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);
  }, [description, image, location.pathname, title, type]);

  return null;
}
