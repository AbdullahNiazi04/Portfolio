/** Home page content. Every fact here is traceable to the brief's verified set. */

export interface Role {
  org: string;
  location: string;
  title: string;
  period: string;
  body: string;
}

/**
 * Reverse-chronological by start date. All four ran concurrently — confirmed,
 * and stated in the section intro rather than left for the reader to notice.
 * Unexplained overlap reads as padding; explained overlap reads as workload.
 */
export const roles: Role[] = [
  {
    org: 'Nizron International Technologies',
    location: 'Islamabad',
    title: 'Full Stack Developer',
    period: 'Jan 2026 – Aug 2026',
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
  {
    org: 'DevFirstPro',
    location: 'Lahore',
    title: 'AI Engineer',
    period: 'July 2025 – Dec 2025',
    body: 'Built the AI layer for a Kotlin Android application, including genre classification and a movie recommendation feature, and handled packaging a fine-tuned transformer for on-device deployment.',
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
    title: 'Audit your own system before someone else does',
    body: 'I audited every endpoint in my ERP and found that authorisation had grown in controller by controller instead of applying by default. That produced a remediation design — a global default-deny guard with an explicit decorator for the routes that genuinely are public — and it changed how I start a backend.',
  },
  {
    title: 'Security belongs in the skeleton, not the hardening pass',
    body: 'On my first large backend, authorisation was added controller by controller as the system grew — the wrong default. The next backend I built had Helmet, rate limiting, a global exception filter and input sanitisation in place before it had a second feature module. That ordering is the difference, and it is how I start now.',
  },
];

export const about = [
  'I’m a computer science graduate of the Institute of Space Technology in Islamabad, and I build backend systems that carry real operational load.',
  'I designed and built a pharmaceutical ERP that runs a manufacturer’s procurement, batch-tracked inventory, GMP manufacturing records and order-to-cash — 480 endpoints and 109 data models, in production against real data. For my final year project I built a federated learning system that trains a shared hate-speech classifier across three machines, and re-engineered the training pipeline so an NVIDIA Jetson Nano with 4 GB of shared memory trained as a full participant rather than only receiving the finished model.',
  'I’m looking for backend or AI platform work — the layer where models meet systems that have to stay up.',
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
    'Moving toward AI platform work — retrieval, orchestration and evaluation infrastructure. My model experience so far has been lower-level: fine-tuning, quantising and deploying to constrained hardware rather than integrating hosted LLM APIs.',
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
