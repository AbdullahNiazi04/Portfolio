/** Home page content. Every fact here is traceable to the brief's verified set. */

export interface Role {
  org: string;
  /**
   * Optional, because an unknown location is better left out than guessed. An
   * empty line is not a location, so Experience renders nothing when it is
   * absent. Every current role has one.
   */
  location?: string;
  title: string;
  period: string;
  body: string;
}

/**
 * Reverse-chronological by start date. Every role here overlaps at least one
 * other — confirmed, and stated in the section intro rather than left for the
 * reader to notice. Unexplained overlap reads as padding; explained overlap
 * reads as workload. GoFeast is the only open period, so it is the one entry
 * that has to be re-checked rather than simply kept.
 */
export const roles: Role[] = [
  {
    org: 'GoFeast',
    location: 'Lahore — remote',
    title: 'Backend/AI Engineer',
    period: 'Sep 2026 – Present',
    body: 'Building the NestJS backend and the AI video pipeline for UniKe, a client’s mobile AI video app, alongside one Flutter developer. Orchestrating Gemini and Google Veo behind a database-backed queue with its own state machine and retry policy, and reporting progress directly to the client through scope changes that have added a reels feed, a script feature and local video upload.',
  },
  {
    org: 'Nizron International Technologies',
    location: 'Islamabad',
    title: 'Full Stack Developer',
    period: 'Jan 2026 – Sep 2026',
    body: 'Built a pharmaceutical ERP from the ground up, digitising procurement and inventory lifecycle management. Architected scalable full-stack modules for factory operations and worked directly with stakeholders to translate complex industrial workflows into a commercial-grade product.',
  },
  {
    org: 'Freelance',
    location: 'Remote',
    title: 'Full-Stack Developer',
    period: '2026',
    body: 'Delivered a hearing-aid clinic’s public website and a purpose-built headless CMS, so the owner can manage pages, articles, products and patient enquiries without touching code.',
  },
  {
    org: 'National Centre for Physics (CoE AITeC)',
    location: 'Islamabad',
    title: 'AI Intern',
    period: 'July 2025 – July 2026',
    body: 'Applied supervised and unsupervised learning to data-driven problems, with a focus on optimising ML models for low-latency edge deployment. Evaluated model performance and worked with researchers on bridging theoretical AI and physical hardware integration.',
  },
];

export interface StackGroup {
  name: string;
  items: string[];
  /**
   * Things used in coursework rather than in shipped work. Kept visibly
   * separate so the main list stays a claim about production experience.
   */
  familiar?: string[];
}

export const stackGroups: StackGroup[] = [
  {
    name: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Kotlin', 'SQL'],
    familiar: ['C++ — university coursework (OOP, data structures & algorithms)'],
  },
  {
    name: 'Backend',
    items: [
      'NestJS',
      'Fastify',
      'Prisma',
      'Drizzle ORM',
      'PostgreSQL',
      'MongoDB / Mongoose',
      'REST API design',
      'WebSockets (Socket.IO)',
      'Better-Auth / JWT',
      'Zod',
      'Swagger/OpenAPI',
      'FastAPI',
      'Nodemailer',
      'Helmet',
      'Elasticsearch',
      'ffmpeg (fluent-ffmpeg)',
    ],
  },
  {
    name: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Vite',
      'Ant Design',
      'TanStack Query',
      'Redux Toolkit',
      'React Router',
      'Tailwind CSS',
      'React Native (Expo)',
    ],
  },
  {
    name: 'AI / ML',
    items: [
      'PyTorch',
      'scikit-learn',
      'sentence-transformers',
      'Flower (federated learning)',
      'Google Veo 3.1 / Gemini (@google/genai)',
      'Whisper',
      'TorchScript / PyTorch Mobile',
      'Model optimisation for edge',
      'BeautifulSoup / pandas',
    ],
    familiar: ['TensorFlow'],
  },
  {
    name: 'Infra',
    items: [
      'Docker (multi-stage)',
      'Railway',
      'Vercel',
      'Cloudflare R2',
      'Cloudinary',
      'Git',
      'NVIDIA Jetson Nano',
      'Firebase (Auth + Firestore)',
    ],
  },
];

export interface Principle {
  title: string;
  body: string;
}

/**
 * Each is drawn from something real in the repos. That is what makes them worth
 * reading rather than generic.
 */
export const principles: Principle[] = [
  {
    title: 'Solve boundary problems once',
    body: 'One global interceptor converting snake_case to camelCase beats manual mapping in 69 controllers. The right place for a translation is the edge.',
  },
  {
    title: 'State machines over booleans',
    body: 'Every document in the ERP moves through explicit, validated status transitions. A purchase order cannot go from Draft to Closed. This is what stops someone paying for goods that never arrived.',
  },
  {
    title: 'Assume it will fail, and decide in advance what happens',
    body: 'The OOM recovery handler on the Jetson halves the batch and retries instead of losing an eight-hour run. The same instinct applies to retries, timeouts and fallbacks in a backend.',
  },
  {
    title: 'Make every state change a conditional update',
    body: 'Write the transition as an update that names the status you expect, then branch on the row count. The loser of a race matches zero rows and backs off, with no lock held, and a late failure cannot overwrite a finished result. Two workers polling one Postgres table ran a video pipeline on this and nothing else.',
  },
  {
    title: 'Check a model’s output in code, not in its request schema',
    body: 'Gemini rejected shot lists pinned to about 38 shots outright, failing every long video at planning. Asking for a reasonable number and then counting, topping up and trimming the answer turned one provider limit from a failed request into an implementation detail.',
  },
  {
    title: 'Audit your own system before someone else does',
    body: 'I audited every endpoint in my ERP and found that authorisation had grown in controller by controller instead of applying by default. That produced a remediation design — a global default-deny guard with an explicit decorator for the routes that genuinely are public — and it changed how I start a backend.',
  },
  {
    title: 'Security belongs in the skeleton, not the hardening pass',
    body: 'On my first large backend, authorisation was added controller by controller as the system grew — the wrong default. The next backend I built had Helmet, rate limiting, a global exception filter and input sanitisation in place before it had a second feature module. That ordering is the difference, and it is how I start now.',
  },
];

export const about = [
  'I’m a full-stack developer and AI engineer. I build production backends and the interfaces on top of them, and I get models running on hardware that was never meant to run them.',
  'I designed and built a pharmaceutical ERP that runs against real production data — 480 endpoints and 109 data models covering procurement, batch-tracked inventory, GMP manufacturing records and order-to-cash, serving four separate clients from one API. On the AI side I built a federated learning system that trains a shared hate-speech classifier across three machines, re-engineering the training pipeline so a 4 GB Jetson Nano trained as a full participant rather than only receiving the finished model. I am currently building the backend and AI video pipeline for UniKe, where Gemini plans a film into 8-second shots, Veo renders them and ffmpeg stitches them, behind a queue that has to survive restarts without paying for the same clip twice.',
  'NestJS, Prisma and Drizzle on the backend; React and Next.js on the front; PyTorch and Flower on the model side. I’m looking for backend or AI platform work.',
];

export const education = {
  institution: 'Institute of Space Technology',
  location: 'Islamabad',
  degree: 'BS Computer Science',
  period: 'Sep 2022 – July 2026',
  activities: [
    '4th National AI Seminar — deep learning research',
    'AI & Quantum Computing Seminar, GIKI (2022)',
    'Code Air 2025 — competitive programming',
    'Wall of Hope — General Secretary, then Vice President (local welfare operations)',
  ],
};

/**
 * The Currently band. Deliberately not a certification badge and not in the
 * Education section: while it is in progress it is current learning, not a
 * credential. It moves to Education once complete, with a date.
 *
 * The topic list is the course's own outline, supplied verbatim.
 */
export const currently = {
  body: 'Working through a generative AI course, now that the federated learning project is finished.',
  topics: [
    'LLM APIs & prompt engineering',
    'Vector databases & RAG pipelines',
    'LangChain & Langflow integration',
    'Model fine-tuning concepts',
    'Streamlit & Gradio UI deployment',
    'Agentic AI & multi-step automation',
  ],
  direction:
    'Moving toward AI platform work — retrieval, orchestration and evaluation infrastructure. The UniKe backend is the first of that in production: Gemini and Veo orchestrated behind a database-backed queue, a state machine and a retry policy, where the hard part is everything around the model call rather than the call. The rest of my model experience is lower-level — fine-tuning, quantising and deploying to constrained hardware.',
  course: {
    title: 'Generative AI, Cohort 3',
    provider: 'Pak Angels & HEC',
    // Still in progress today, so it stays in Currently rather than Education.
    status: 'In progress, completing September 2026',
  } as { title: string; provider: string; status: string } | null,
};

/** Replaces the reference's client-logo wall. Technologies, never company names. */
export const wordmarks = [
  'TypeScript',
  'NestJS',
  'PostgreSQL',
  'PyTorch',
  'React',
  'Docker',
];
