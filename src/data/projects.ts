/**
 * Project content. Two tiers, two types, deliberately not sharing a base type —
 * they never share a rendering path, and a common ancestor would only invite
 * fields to leak from the footnote tier into the featured tier.
 */

export type Accent = 'blue' | 'pink' | 'yellow' | 'mint';

export type ProjectStatus = 'deployed' | 'delivered' | 'prototype';

export interface Metric {
  label: string;
  value: string;
  /** Optional qualifier rendered smaller, e.g. "across 625 files". */
  note?: string;
}

export interface Decision {
  title: string;
  body: string;
  /** The named cost. A decision written without its trade-off is a boast. */
  tradeoff: string;
}

export interface CaseStudy {
  problem: string;
  architecture: string;
  decisions: Decision[];
  hardestBug: { title: string; body: string; lesson: string };
  results: string;
  /** Rendered under a visible "Known limitations" heading. Never omitted. */
  limitations: string[];
  whatIdDoDifferently: string;
}

/** Featured tier — gets a /work/:slug case study page. */
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  status: ProjectStatus;
  /** The honest qualifier shown next to the status badge. */
  statusNote: string;
  accent: Accent;
  oneLiner: string;
  metrics: Metric[];
  stack: string[];
  /** Written in Phase 3. The detail page renders a stub until it exists. */
  caseStudy?: CaseStudy;
}

/**
 * Second tier — a footnote to the featured work. No detail page, no route, no
 * accent colour, no metrics.
 */
export interface MinorProject {
  title: string;
  /** Max 20 words. Enforced by assertBlurbLengths() below, not by trust. */
  blurb: string;
  tech: string[];
  year: string;
  /** Omitted entirely when private — never rendered as a dead or '#' link. */
  repoUrl?: string;
  /** Optional single expanded sentence. */
  detail?: string;
}

export const featured: Project[] = [
  {
    slug: 'pharma-erp',
    title: 'PharmaERP',
    subtitle: 'Pharmaceutical manufacturing & distribution ERP',
    role: 'Full-Stack Developer — Nizron International Technologies',
    period: 'Jan 2026 – Aug 2026',
    status: 'deployed',
    statusNote: 'Railway, real production data, low volume, pre-hardening',
    accent: 'blue',
    oneLiner:
      'A multi-module ERP covering procurement, batch-tracked inventory, GMP manufacturing records, order-to-cash, HR and field-sales for a pharmaceutical manufacturer in Pakistan.',
    metrics: [
      { label: 'HTTP endpoints', value: '480' },
      { label: 'Prisma models', value: '109', note: '54 enums' },
      { label: 'Application code', value: '~88k', note: 'lines across ~625 files' },
    ],
    stack: ['NestJS 11', 'Fastify', 'Prisma 6', 'PostgreSQL', 'Socket.IO', 'React 19', 'Docker', 'Railway'],
  },
  {
    slug: 'fedguard',
    title: 'FedGuard',
    subtitle:
      'Real-time spoken hate-speech detection via federated learning on heterogeneous edge hardware',
    role: 'Final Year Project — Institute of Space Technology',
    period: '2025 – 2026',
    status: 'prototype',
    statusNote: 'Demonstrated end-to-end, not a deployed product',
    accent: 'pink',
    oneLiner:
      'Three physical machines train a shared hate-speech classifier without any raw text ever leaving a device — including an NVIDIA Jetson Nano with 4 GB of shared memory that had to be re-engineered to participate at all.',
    metrics: [
      { label: 'Final accuracy', value: '87.11%', note: 'threshold 0.50, 36,308-row holdout' },
      { label: 'Federated rounds', value: '30' },
      { label: 'Training rows', value: '726,119', note: 'across three devices' },
    ],
    stack: ['Python', 'PyTorch', 'Flower (FedAvg)', 'sentence-transformers', 'Whisper', 'FastAPI', 'Jetson Nano'],
  },
  {
    slug: 'hearing-care',
    title: 'Hearing Care Service',
    subtitle: 'Clinic website with a custom headless CMS',
    role: 'Freelance Full-Stack Developer',
    period: '2026',
    status: 'delivered',
    statusNote: 'Built and delivered to the client; no longer online — the client has since closed',
    accent: 'mint',
    oneLiner:
      "A hearing-aid clinic's public site plus a purpose-built CMS, so the owner can edit every page, publish articles, manage products and track patient enquiries without touching code.",
    metrics: [
      { label: 'Backend modules', value: '10', note: '12 tables, 9 migrations' },
      { label: 'CMS pages', value: '10', note: 'plus 7 public, 4 admin' },
      { label: 'Typed API clients', value: '8' },
    ],
    stack: ['NestJS 11', 'Drizzle ORM', 'PostgreSQL', 'Next.js 16', 'TipTap', 'Leaflet', 'Cloudinary', 'Vercel'],
  },
];

export const alsoBuilt: MinorProject[] = [
  {
    title: 'FilmCeption',
    blurb:
      'Created a genre predictor and a recommendation system for a Kotlin Android movie app.',
    tech: ['Kotlin', 'Android', 'Firebase Auth', 'Cloud Firestore'],
    // No repoUrl: the client holds the repository.
    year: '2025',
  },
  {
    title: 'RentKaro',
    blurb:
      'Property rental marketplace — listings, reviews, auth and image upload on a classic Express/MongoDB MVC stack.',
    tech: [
      'Node.js',
      'Express',
      'MongoDB (Mongoose)',
      'EJS',
      'Passport.js',
      'Joi',
      'Cloudinary',
      'Mapbox',
    ],
    year: '2025',
    repoUrl: 'https://github.com/abdullahkniazi04/Rent-Karo',
    detail:
      'A learning project following a well-known course build, so the listing taxonomy will look familiar. Included for the session-based auth, server-side validation and MVC separation, not as original product work.',
  },
];

/**
 * The 20-word cap on `blurb` only holds if something checks it. Dev-only, so it
 * costs nothing in the production bundle.
 */
function assertBlurbLengths(items: MinorProject[]): void {
  const words = (s: string) =>
    s.split(/\s+/).filter((t) => /[a-z0-9]/i.test(t)).length;

  for (const item of items) {
    const n = words(item.blurb);
    if (n > 20) {
      console.warn(
        `[projects] "${item.title}" blurb is ${n} words; the second tier caps at 20. ` +
          `Trim it, or it stops reading as a footnote.`,
      );
    }
  }
}

if (import.meta.env.DEV) assertBlurbLengths(alsoBuilt);
