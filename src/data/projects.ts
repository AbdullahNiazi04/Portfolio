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

export interface CaseStudy {
  problem: string;
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
    caseStudy: {
      problem:
        'A pharmaceutical manufacturer was running procurement, batch-tracked inventory, GMP manufacturing records, order-to-cash, HR and field sales across paper and spreadsheets. Regulated manufacturing does not tolerate a document that can skip a step: a batch record has to prove which materials went into it, and a purchase order has to prove that what was paid for actually arrived and passed QC. The job was to turn that into one system, serving four different clients.',
      architecture:
        'A modular monolith. NestJS 11 on the Fastify adapter, Prisma 6 over PostgreSQL, 57 feature modules behind a single deployable unit. One API serves four clients — a React SPA, an Expo mobile app, the public site and a separate marketing portal with its own JWT auth. Socket.IO carries chat presence and notification fan-out, Cloudflare R2 holds media behind a draft re-parenting pipeline, and @nestjs/schedule runs the recurring jobs. Every document type moves through explicit, validated status transitions rather than boolean flags.',
      decisions: [
        {
          title: 'A modular monolith, not microservices',
          body: 'The data is deeply interlinked. A QC failure has to cascade to the goods-received note and back to the purchase order, and either all of that lands or none of it does. Inside one database that is a single $transaction — there are 37 such call sites.',
          tradeoff:
            'One deployable unit, so scaling is vertical before it is horizontal. Splitting it would trade a free database transaction for hand-written saga compensation, which buys nothing at one-developer scale.',
        },
        {
          title: 'Fastify over Express',
          body: 'Higher throughput and schema validation built into the adapter, on an API that would end up serving 480 endpoints to four clients.',
          tradeoff:
            'Multer and Nest’s FileInterceptor are Express-only, so the entire upload path had to be rebuilt on @fastify/multipart streaming rather than adapted.',
        },
        {
          title: 'One interceptor at the boundary, not mapping in 69 controllers',
          body: 'The database speaks snake_case and the clients speak camelCase. A single global SnakeToCamelInterceptor converts at the edge, so no controller or service contains conversion code.',
          tradeoff:
            'It is global, so anything that genuinely must stay snake_case on the wire has to opt out deliberately rather than by accident.',
        },
      ],
      hardestBug: {
        title: 'The image that built perfectly and could not reach the database',
        body: 'The multi-stage Dockerfile built clean locally and passed every check. In production, every single database query failed. The cause was not in the application: node:22-slim does not ship OpenSSL, and Prisma’s query-engine binary needs it to open a TLS connection to Postgres with sslmode=require. The fix was one line — apt-get install openssl in the runtime stage.',
        lesson:
          'A slim base image trades size against knowing every native dependency in your stack. If you cannot name them, you have not saved anything — you have deferred it to production.',
      },
      solved: [
        {
          problem:
            'Choosing Fastify removed the entire Express upload ecosystem, and the ERP needed media across procurement, manufacturing records and the CMS.',
          fix: 'Rebuilt uploads on @fastify/multipart streaming, backed by Cloudflare R2 with a draft re-parenting step so files attach correctly to records that do not exist yet at upload time.',
        },
        {
          problem:
            'The naming-convention boundary between database and clients would otherwise have meant conversion code in 69 controllers.',
          fix: 'One global interceptor at the edge. Adding a controller costs nothing, and there is no per-controller convention to remember or get wrong.',
        },
        {
          problem:
            'A QC failure had to reverse an inventory posting, mark the goods-received note and reopen the purchase order without leaving partial state behind.',
          fix: 'Modelled it as one database transaction with explicit status transitions, so the cascade either completes or does not happen at all.',
        },
        {
          problem: 'The system had to move off NeonDB onto Railway without losing live data.',
          fix: 'Migrated 947 rows across 62 tables into the new instance, with the schema and enum set reproduced from the Prisma definitions.',
        },
        {
          problem:
            'Authorisation had grown in controller by controller as the system expanded, rather than applying by default.',
          fix: 'Audited every endpoint and designed the remediation: a global default-deny guard with an explicit decorator for the routes that genuinely are public. That ordering is now how I start a backend — see Hearing Care Services, where it shipped from day one.',
        },
      ],
      results:
        '480 endpoints across 57 feature modules, 109 Prisma models and 54 enums, 121 frontend routes over 13 layouts, and 43 paginated reports. Procurement runs end to end from purchase request through PO, goods-received note, QC and invoice to payment. Batch Manufacturing Records cover seven of eight dosage forms through a config-driven form engine, and FBR digital invoicing is wired against the sandbox.',
    },
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
    caseStudy: {
      problem:
        'Detecting spoken hate speech usually means shipping audio to a server. That is exactly the data you should not be centralising. Federated learning removes the need — each device trains locally and only model updates travel — but it assumes the participating hardware can actually train. One of the three nodes was an NVIDIA Jetson Nano with 4 GB of memory shared between CPU and GPU, on CUDA 10.2 and Python 3.8. Making it a genuine participant, rather than a device that merely receives the finished model, was the whole engineering problem.',
      architecture:
        'Flower running FedAvg across three physical machines. The dataset of 726,119 labelled rows is split stratified with seed 42: 70% to the laptop client (508,282 rows), 25% to the Jetson Nano (181,529), and a 5% server holdout (36,308) that is only ever evaluated against, never trained on. An all-MiniLM sentence encoder is frozen and its 384-dimension L2-normalised embeddings are precomputed to disk before training begins, so the training loop only ever touches a 361,602-parameter classifier head. The live path runs Silero VAD for speech detection into Whisper tiny.en on CUDA, behind FastAPI with a WebSocket for streaming results.',
      decisions: [
        {
          title: 'Freeze the encoder and precompute every embedding',
          body: 'Each sentence is embedded once, before training, and cached to disk. During training there are zero encoder inferences — only a 361,602-parameter head is updated. This is the single reason the Nano can participate at all, and it also means each round exchanges 1,450,195 bytes rather than an entire transformer.',
          tradeoff:
            'The encoder cannot adapt to the domain. Every gain has to come from the head, which puts a ceiling on accuracy that fine-tuning the encoder would not have.',
        },
        {
          title: 'Micro-batching with gradient accumulation',
          body: 'A batch of 8 with 4 accumulation steps gives the learning behaviour of batch 32 at the memory cost of batch 8 — the difference between training and not training on a 4 GB shared-memory device.',
          tradeoff:
            'Four times as many forward and backward passes per effective batch, which shows up directly in the Nano’s round time.',
        },
        {
          title: 'Measure the straggler cost rather than assume it',
          body: 'FedAvg is synchronous, so every round completes at the speed of the slowest device. The Nano averaged 1,061 s per round against the laptop’s 363 s — 2.9× longer while training on less than half the data. That is what makes the full run 8.8 hours, and it is a measured number rather than a quoted one.',
          tradeoff:
            'Synchronous aggregation buys clean, reproducible round semantics at the cost of wall-clock time. Asynchronous aggregation would recover the time and pay for it in staleness-weighted updates.',
        },
      ],
      hardestBug: {
        title: 'Whisper returning NaN logits, but only on the Nano',
        body: 'Transcription worked on the laptop and produced NaN logits on the Jetson’s GPU. The audio was being handed to Whisper from memory, and that path was numerically unstable on this device. Writing the clip to a temporary 16-bit WAV and letting Whisper load it through its own ffmpeg path — the one it is actually tested against — produced correct output every time.',
        lesson:
          'The fast path around a library’s own I/O is the path nobody has tested on your hardware. On constrained devices, the documented route is often the only reliable one.',
      },
      solved: [
        {
          problem:
            'PyTorch would not install on the Nano at all. CUDA 10.2 on aarch64 with Python 3.8 is outside the range of every official wheel.',
          fix: 'Built the environment from community aarch64 wheels with numpy and tokenizers pinned to compatible versions, and grpcio compiled from source.',
        },
        {
          problem:
            'Detection latency was 30–40 seconds per utterance, which is not real-time by any definition.',
          fix: 'Traced it to Whisper running on CPU and padding every clip to a full 30-second window regardless of length. Moving to tiny.en on CUDA removed the padding cost and brought latency into a usable range.',
        },
        {
          problem:
            'Whisper hallucinated phantom repeated phrases during near-silence, producing confident transcriptions of nothing.',
          fix: 'Set temperature to 0, disabled condition_on_previous_text so one bad segment could not seed the next, and applied no-speech and log-probability thresholds.',
        },
        {
          problem:
            'A CUDA out-of-memory spike part way through an eight-hour federated run would destroy the entire run.',
          fix: 'Added a recovery handler that catches the OOM, halves the batch size and doubles the accumulation steps to hold the effective batch constant, then retries. The run survives the spike instead of dying at hour six.',
        },
      ],
      results:
        '30 federated rounds to 87.11% accuracy at threshold 0.50 on the 36,308-row holdout, and 87.72% F1 at threshold 0.34 with 91.97% recall against 83.84% precision. A centralised baseline on the same data reaches 89.70%, so federation costs roughly 2.5 points — the price of no raw text ever leaving a device. Each round moves 5.8 MB across the network, about 174 MB for the full run, against a total wall clock of 8.8 hours bounded by the Nano.',
    },
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
    caseStudy: {
      problem:
        'A hearing-aid clinic needed a public website, and more importantly needed to stop needing a developer. Every page, article, product, FAQ and clinic location had to be editable by the owner, and patient enquiries had to arrive somewhere they would actually be seen. A page-builder would have solved the website and not the second half.',
      architecture:
        'Two deployments on Vercel. The backend is NestJS 11 on the Express adapter with Drizzle ORM over PostgreSQL, running as a serverless function: 10 feature modules — about-page, articles, auth, FAQs, homepage-content, leads, products, services, settings and upload — across 12 tables and 9 migrations. The frontend is Next.js 16 App Router: 7 public pages, 10 CMS pages and 4 admin pages, talking to the API through 8 typed service modules. Cross-cutting concerns are global rather than per-route: an exception filter, a response transform interceptor, an admin route guard and input sanitisation middleware.',
      decisions: [
        {
          title: 'Drizzle here, Prisma on the ERP',
          body: 'Prisma’s generated client and migration tooling are more batteries-included, which suited a 109-model schema. Drizzle sits closer to SQL with a lighter runtime and no query-engine binary, which suits a serverless deploy where cold start and bundle size are the constraint that matters.',
          tradeoff:
            'Less generated tooling and more SQL-shaped code to write by hand. The same Prisma engine that needed an explicit OpenSSL install on the ERP’s slim Docker image is exactly the weight Drizzle avoids here.',
        },
        {
          title: 'Security in the skeleton, before the second feature module',
          body: 'Helmet for security headers, @nestjs/throttler and express-rate-limit for request limiting, a global exception filter, input sanitisation middleware, Zod schema validation and an admin route guard were all in place before the build had a second feature module.',
          tradeoff:
            'More scaffolding before the first visible feature ships. It is the ordering I arrived at after auditing the ERP, and it costs far less at the start than it does later.',
        },
        {
          title: 'A schema-driven form generator, not ten hand-built forms',
          body: 'DynamicForm renders CMS forms from a schema, so a new content type does not need a new form. Around it sit a TipTap rich-text editor for articles, a Cloudinary-backed media uploader, a Leaflet map picker for setting clinic coordinates, and one shared DataTable across every listing.',
          tradeoff:
            'A layer of indirection between the schema and the rendered form, which is worth paying once there are ten CMS sections and not worth it at two.',
        },
      ],
      solved: [
        {
          problem:
            'A serverless deploy makes ORM weight and cold start a first-order concern rather than a detail.',
          fix: 'Chose Drizzle for its lighter runtime and absence of a query-engine binary, carrying forward the lesson from the ERP’s Docker image about what native dependencies actually cost.',
        },
        {
          problem:
            'The owner needed to manage ten distinct kinds of content without ten bespoke admin screens to maintain.',
          fix: 'Built a schema-driven form generator with a shared data table, so adding a content type is a schema change rather than a new screen.',
        },
        {
          problem:
            'Clinic locations needed real coordinates, and typing latitude and longitude by hand is a reliable way to end up in the sea.',
          fix: 'A Leaflet map picker in the CMS: click the location, and the coordinates are captured directly.',
        },
        {
          problem:
            'Patient enquiries had to reach the clinic rather than sit in a table nobody opened.',
          fix: 'Wired Nodemailer for transactional email alongside the leads module, so an enquiry is both stored and delivered.',
        },
      ],
      results:
        '10 backend modules over 12 tables and 9 migrations, 21 pages across the public site, CMS and admin, and 8 typed API clients. The owner can edit every page, publish articles, manage products and services, update FAQs and global settings, set clinic locations on a map and read patient enquiries, without touching code. Helmet, rate limiting, a global exception filter, input sanitisation and Zod validation were in the skeleton from the start.',
    },
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

if (import.meta.env.DEV) assertBlurbLengths(alsoBuilt);
