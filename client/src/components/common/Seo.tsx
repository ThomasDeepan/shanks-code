import React, { useEffect, useMemo } from 'react';
import { SITE_NAME, absoluteUrl } from '@/constants/site';

/**
 * Seo
 * Declarative document metadata for a single page.
 *
 * This is a client-rendered SPA, so per-page metadata is applied at runtime:
 *   - `<title>`
 *   - `<meta name="description">`
 *   - `<link rel="canonical">` (absolute, from `VITE_SITE_URL`)
 *   - Open Graph + Twitter card metadata
 *   - optional JSON-LD structured data
 *
 * Every public page passes its OWN title and description — no shared generic
 * string. `index.html` carries sensible defaults for the first paint and for
 * crawlers that do not execute JavaScript.
 */

export interface SeoProps {
  /** Page title. The site name is appended automatically unless already present. */
  title: string;
  description: string;
  /** Site-relative path, e.g. `/about`. Used for the canonical + og:url. */
  path: string;
  image?: string;
  /** `website` for the homepage, `article` for content pages. */
  ogType?: 'website' | 'article';
  /** JSON-LD graph node(s). */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  /** Prevents indexing (used by the student portal and admin area). */
  noIndex?: boolean;
}

const upsertMeta = (attr: 'name' | 'property', key: string, content: string): void => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string): void => {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute('href', href);
};

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  image,
  ogType = 'website',
  jsonLd,
  noIndex = false,
}) => {
  // Serialised so a caller passing an inline object literal does not
  // re-inject the JSON-LD tag on every render.
  const jsonLdSource = useMemo(() => (jsonLd ? JSON.stringify(jsonLd) : null), [jsonLd]);

  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonical = absoluteUrl(path);
    const ogImage = absoluteUrl(image ?? '/images/hero-applied-engineering-lab.jpg');

    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    upsertLink('canonical', canonical);
  }, [title, description, path, image, ogType, noIndex]);

  useEffect(() => {
    if (!jsonLdSource) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seo = 'page';
    script.textContent = jsonLdSource;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [jsonLdSource]);

  return null;
};

export default Seo;
