/**
 * Site-wide constants.
 *
 * The canonical origin is read from `VITE_SITE_URL` so canonical URLs, Open
 * Graph tags and the sitemap can be generated per environment. No secrets are
 * ever read here — only a public origin.
 */

const rawSiteUrl = (import.meta.env.VITE_SITE_URL || 'https://www.shankscode.com').trim();

/** Canonical origin without a trailing slash. */
export const SITE_URL = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;

export const SITE_NAME = "Shank's Code Edutech";

export const SITE_TAGLINE = 'Practical technical training, campus workshops and applied R&D';

export const SITE_DESCRIPTION =
  "Shank's Code Edutech runs practical technical training, AICTE-approved internships, " +
  'hands-on engineering college workshops and applied R&D for engineering and polytechnic ' +
  'students in Tamil Nadu.';

export const SITE_LOGO_PATH = '/images/hero-applied-engineering-lab.jpg';

export const CONTACT = {
  email: 'admin@shankscode.com',
  infoEmail: 'info@shankscode.com',
  phone: '+91 87542 08557',
  phoneHref: '+918754208557',
  city: 'Villupuram, Tamil Nadu, India',
  founded: 2023,
} as const;

/** Social profiles. Left empty rather than linked to unverified accounts. */
export const SOCIAL_LINKS: ReadonlyArray<{ label: string; href: string }> = [];

/** Builds an absolute URL for a site-relative path. */
export const absoluteUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};
