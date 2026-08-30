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
  caseStudy: CaseStudy;
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

/** Populated in Phase 2 from the verified content in the brief. */
export const featured: Project[] = [];

export const alsoBuilt: MinorProject[] = [
  {
    title: 'FilmCeption',
    blurb:
      'Kotlin Android app for movie genre classification — a study in on-device ML packaging and why the model/runtime version contract matters.',
    tech: [
      'Kotlin',
      'Android',
      'PyTorch Mobile',
      'TorchScript',
      'Firebase Auth',
      'Cloud Firestore',
    ],
    year: '2025',
    detail:
      'The fine-tuned DistilBERT never ran in the shipped build — three independent failures across filename, loader format and PyTorch version. Documented rather than hidden; the lesson was that a model is not one file.',
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
