/**
 * Single source of truth for identity and absolute URLs.
 *
 * TODO(abdullah): confirm the deployed Vercel subdomain. Every canonical URL,
 * the sitemap and the OG image URL derive from SITE_URL, so this is the only
 * line that needs to change once the domain is fixed.
 */
export const SITE_URL = 'https://abdullah-niazi.vercel.app';

export const person = {
  name: 'Abdullah Khan Niazi',
  role: 'Full-Stack Developer · AI / Edge ML',
  location: 'Islamabad, Pakistan',
  email: 'abdullahkniazi04@gmail.com',
  phone: '+92 345 1860840',
  // TODO(abdullah): supply GitHub and LinkedIn URLs.
  github: null as string | null,
  linkedin: null as string | null,
} as const;

/**
 * The spine of the site. Used verbatim in the hero and the meta description.
 */
export const positioning =
  'Backend systems engineer who ships machine learning into places that resist it — a 480-endpoint ERP running in production, and federated training across a Jetson Nano with 4 GB of shared memory.';

export interface NavItem {
  label: string;
  /** Section id on the home page. */
  hash: string;
}

export const navItems: readonly NavItem[] = [
  { label: 'Work', hash: 'work' },
  { label: 'Experience', hash: 'experience' },
  { label: 'Stack', hash: 'stack' },
  { label: 'How I Work', hash: 'how-i-work' },
  { label: 'About', hash: 'about' },
  { label: 'Contact', hash: 'contact' },
] as const;
