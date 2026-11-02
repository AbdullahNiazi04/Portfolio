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

/**
 * A problem that came up during the build and what was done about it.
 * Every entry must be resolved — this section carries no open items.
 */
export interface Solved {
  problem: string;
  fix: string;
}

/**
 * A screenshot of the running product. Served from
 * /img/shot-<project slug>-{700,1400}.webp; width and height are the intrinsic
 * dimensions of the 1400 variant so the box is reserved before it loads.
 */
export interface Screenshot {
  width: number;
  height: number;
  alt: string;
  caption: string;
}

/**
 * A portrait phone capture, for products whose screenshots are 9:19.5 rather
 * than the landscape shape `Screenshot` assumes. Served from
 * /img/shot-<project slug>-<name>-{420,840}.webp; width and height are the
 * intrinsic dimensions of the 840 variant.
 *
 * Kept separate from `Screenshot` rather than making its dimensions flexible:
 * the two never share a layout, and one landscape box fed a portrait image
 * letterboxes it in accent colour and reads as a mistake.
 */
export interface PhoneShot {
  /** File stem — /img/shot-<slug>-<name>-840.webp. */
  name: string;
  width: number;
  height: number;
  alt: string;
  /** Rendered beneath the shot on the case study page. Omitted on cards. */
  caption?: string;
}

export interface CaseStudy {
  problem: string;
  screenshot?: Screenshot;
  /**
   * Portrait captures for a mobile product, rendered as a framed row instead
   * of `screenshot`'s single landscape figure. A project has one or the other.
   */
  phoneShots?: PhoneShot[];
  /**
   * Provenance line under the phone-shot figure: who made the interface, when
   * it was captured, and anything masked. On a project where the app is
   * someone else's work, this is where the credit goes — the card has nowhere
   * to carry it, which is a reason to keep those shots off the card.
   */
  phoneShotsNote?: string;
  architecture: string;
  decisions: Decision[];
  /** The headline debugging story. Not every project has one worth telling. */
  hardestBug?: { title: string; body: string; lesson: string };
  solved: Solved[];
  results: string;
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
  /**
   * Card-level screenshot metadata. Deliberately separate from the case
   * study's `screenshot`: that one lives in the route chunk and carries a long
   * descriptive alt, while this ships with the home page and stays short.
   * Dimensions are the 1400-wide variant, so the card reserves its box.
   */
  preview?: { width: number; height: number; alt: string };
  /**
   * Card-level portrait captures, for a mobile product. At most two render —
   * the card's accent panel is half a grid column, and a third shot there is
   * 120px wide and illegible.
   */
  phonePreview?: PhoneShot[];
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

/**
 * Published featured work, in render order. Unfinished projects live in
 * `./drafts` and are deliberately not merged in here — see that file for why
 * the separation is a module boundary rather than a flag.
 */
export const featured: Project[] = [
  {
    slug: 'pharma-erp',
    title: 'Pharma ERP',
    subtitle: 'Pharmaceutical manufacturing & distribution ERP',
    role: 'Full-Stack Developer — Nizron International Technologies',
    period: 'Jan 2026 – Sep 2026',
    status: 'deployed',
    statusNote: 'Running on Railway against real production data',
    accent: 'blue',
    oneLiner:
      'A multi-module ERP covering procurement, batch-tracked inventory, GMP manufacturing records, order-to-cash, HR and field-sales for a pharmaceutical manufacturer in Pakistan.',
    metrics: [
      { label: 'HTTP endpoints', value: '480' },
      { label: 'Prisma models', value: '109', note: '54 enums' },
      { label: 'Application code', value: '~88k', note: 'lines across ~625 files' },
    ],
    stack: [
      'NestJS 11',
      'Fastify',
      'Prisma 6',
      'PostgreSQL',
      'Socket.IO',
      'React 19',
      'Docker',
      'Railway',
    ],
    preview: { width: 1400, height: 617, alt: 'The Pharma ERP administrator dashboard' },
  },
  {
    slug: 'unike',
    title: 'UniKe',
    subtitle: 'Backend for a mobile AI video creation and streaming app',
    role: 'Backend/AI Engineer — GoFeast',
    period: 'Sep 2026 – Present',
    status: 'deployed',
    statusNote:
      'The API runs on Railway; the Flutter app reached the client as an Android test build, with no public store listing',
    accent: 'yellow',
    oneLiner:
      'A creator writes a prompt in a Flutter app, and the backend I built plans it into 8-second shots with Gemini, renders them on Veo 3.1, stitches them with ffmpeg, and serves the result through home rows, a reels feed and search.',
    metrics: [
      { label: 'HTTP endpoints', value: '65', note: 'across 16 controllers' },
      { label: 'Prisma models', value: '28', note: '10 enums · 11 migrations' },
      { label: 'Socket events', value: '25', note: '23 pushed · 2 from client' },
    ],
    stack: [
      'NestJS 11',
      'Fastify 5',
      'Prisma 6',
      'PostgreSQL 18',
      'Google Veo 3.1',
      'Gemini',
      'ffmpeg',
      'Elasticsearch 9',
    ],
    /*
     * Portrait captures, so `preview` stays unset. Two on the card, four on
     * the case study — the app is a teammate's work, credited in the figure
     * rather than here, and the card has nowhere to carry that line.
     */
    phonePreview: [
      {
        name: 'create-project',
        width: 840,
        height: 1825,
        alt: 'UniKe create-project form: type, name, genre and concept',
      },
      {
        name: 'review-generation',
        width: 840,
        height: 1825,
        alt: 'UniKe review screen, showing the prompt and generation settings',
      },
    ],
  },
  {
    slug: 'fedguard',
    title: 'FedGuard',
    subtitle:
      'Real-time spoken hate-speech detection via federated learning on heterogeneous edge hardware',
    role: 'Final Year Project — Institute of Space Technology',
    period: '2025 – 2026',
    status: 'prototype',
    statusNote: 'Working prototype, demonstrated end-to-end across three machines',
    accent: 'pink',
    oneLiner:
      'Three physical machines train a shared hate-speech classifier without any raw text ever leaving a device — including an NVIDIA Jetson Nano with 4 GB of shared memory that had to be re-engineered to participate at all.',
    metrics: [
      { label: 'Final accuracy', value: '87.11%', note: 'threshold 0.50, 36,308-row holdout' },
      { label: 'Federated rounds', value: '30' },
      { label: 'Training rows', value: '726,119', note: 'across three devices' },
    ],
    stack: [
      'Python',
      'PyTorch',
      'Flower (FedAvg)',
      'sentence-transformers',
      'Whisper',
      'FastAPI',
      'Jetson Nano',
    ],
    preview: { width: 1400, height: 642, alt: 'The FedGuard command centre, both nodes online' },
  },
  {
    slug: 'hearing-care',
    title: 'Hearing Care Services',
    subtitle: 'Clinic website with a custom headless CMS',
    role: 'Freelance Full-Stack Developer',
    period: '2026',
    status: 'delivered',
    statusNote:
      'Built and delivered in full; the client has since closed the business, so it is no longer online',
    accent: 'mint',
    oneLiner:
      "A hearing-aid clinic's public site plus a purpose-built CMS, so the owner can edit every page, publish articles, manage products and track patient enquiries without touching code.",
    metrics: [
      { label: 'Backend modules', value: '10', note: '12 tables, 9 migrations' },
      { label: 'CMS pages', value: '10', note: 'plus 7 public, 4 admin' },
      { label: 'Typed API clients', value: '8' },
    ],
    stack: [
      'NestJS 11',
      'Drizzle ORM',
      'PostgreSQL',
      'Next.js 16',
      'TipTap',
      'Leaflet',
      'Cloudinary',
      'Vercel',
    ],
    preview: { width: 1400, height: 599, alt: 'The Hearing Care Services website' },
  },
];

/**
 * Resolves a published project for its case study page. A draft page imports
 * its own entry from ./drafts instead, which is what keeps draft copy out of
 * the production bundle.
 */
export function projectBySlug(slug: string): Project | undefined {
  return featured.find((p) => p.slug === slug);
}

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
      'Built from a well-known course project. Included for the session-based auth, server-side validation, cloud image upload and the MVC separation.',
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

/**
 * A draft is scaffolded with TODO markers, and the only thing standing between
 * those markers and the live site is remembering to replace them. So this
 * checks: anything published still carrying one is a bug, not a stylistic
 * choice. Dev-only, like the blurb cap.
 */
function assertNoPlaceholders(items: Project[]): void {
  for (const item of items) {
    const found = JSON.stringify(item).includes('TODO');
    if (found) {
      console.warn(
        `[projects] "${item.title}" is published but still contains a TODO marker. ` +
          `Fill it in, or put \`draft: true\` back until you can.`,
      );
    }
  }
}

if (import.meta.env.DEV) {
  assertBlurbLengths(alsoBuilt);
  assertNoPlaceholders(featured);
}
