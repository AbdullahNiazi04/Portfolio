/**
 * Inline SVG architecture diagrams, one per case study.
 *
 * Drawn with theme tokens rather than fixed colours, so they invert with the
 * page instead of becoming a light rectangle in dark mode. Each is wrapped in a
 * figure with a real text caption: the SVG itself is aria-hidden, and the
 * caption carries the same information for anyone not looking at it.
 */

const BOX = 'fill-[var(--paper-deep)] stroke-[var(--line-strong)]';
const LABEL = 'fill-[var(--ink)] font-[600]';

function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" fill="var(--line-strong)" />
      </marker>
    </defs>
  );
}

function PharmaDiagram() {
  const clients = ['React SPA', 'Expo mobile', 'Public site', 'Marketing portal'];
  return (
    <svg viewBox="0 0 700 330" className="w-full" aria-hidden="true" focusable="false">
      <Arrow id="ar-pharma" />
      {clients.map((c, i) => (
        <g key={c}>
          <rect
            x={12 + i * 172}
            y={10}
            width={150}
            height={44}
            className={BOX}
            strokeWidth="2"
          />
          <text
            x={87 + i * 172}
            y={37}
            textAnchor="middle"
            className={LABEL}
            fontSize="13"
          >
            {c}
          </text>
          <line
            x1={87 + i * 172}
            y1={54}
            x2={350}
            y2={104}
            stroke="var(--line-strong)"
            strokeWidth="1.6"
            markerEnd="url(#ar-pharma)"
          />
        </g>
      ))}

      <rect x={140} y={106} width={420} height={92} fill="var(--blue)" stroke="var(--ink)" strokeWidth="2.5" />
      <text x={350} y={137} textAnchor="middle" fontSize="15" className="font-[700]" fill="var(--on-accent)">
        NestJS 11 · Fastify
      </text>
      <text x={350} y={160} textAnchor="middle" fontSize="12.5" fill="var(--on-accent)">
        57 feature modules · 480 endpoints
      </text>
      <text x={350} y={182} textAnchor="middle" fontSize="12.5" fill="var(--on-accent)">
        one global snake→camel interceptor at the edge
      </text>

      <line x1={350} y1={198} x2={350} y2={244} stroke="var(--line-strong)" strokeWidth="1.6" markerEnd="url(#ar-pharma)" />
      <rect x={230} y={246} width={240} height={44} className={BOX} strokeWidth="2.5" />
      <text x={350} y={273} textAnchor="middle" className={LABEL} fontSize="13">
        PostgreSQL · Prisma 6 · 109 models
      </text>

      <rect x={12} y={246} width={190} height={44} className={BOX} strokeWidth="2" strokeDasharray="5 4" />
      <text x={107} y={273} textAnchor="middle" className={LABEL} fontSize="12.5">
        Cloudflare R2 · media
      </text>
      <rect x={498} y={246} width={190} height={44} className={BOX} strokeWidth="2" strokeDasharray="5 4" />
      <text x={593} y={273} textAnchor="middle" className={LABEL} fontSize="12.5">
        Socket.IO · cron
      </text>
    </svg>
  );
}

function FedGuardDiagram() {
  return (
    <svg viewBox="0 0 700 340" className="w-full" aria-hidden="true" focusable="false">
      <Arrow id="ar-fed" />

      <rect x={12} y={12} width={250} height={96} fill="var(--pink)" stroke="var(--ink)" strokeWidth="2.5" />
      <text x={137} y={40} textAnchor="middle" fontSize="14" className="font-[700]" fill="var(--on-accent)">
        Laptop client
      </text>
      <text x={137} y={62} textAnchor="middle" fontSize="12.5" fill="var(--on-accent)">
        508,282 rows · 70%
      </text>
      <text x={137} y={84} textAnchor="middle" fontSize="12.5" fill="var(--on-accent)">
        mean round 363 s
      </text>

      <rect x={438} y={12} width={250} height={96} fill="var(--pink)" stroke="var(--ink)" strokeWidth="2.5" />
      <text x={563} y={40} textAnchor="middle" fontSize="14" className="font-[700]" fill="var(--on-accent)">
        Jetson Nano · 4 GB
      </text>
      <text x={563} y={62} textAnchor="middle" fontSize="12.5" fill="var(--on-accent)">
        181,529 rows · 25%
      </text>
      <text x={563} y={84} textAnchor="middle" fontSize="12.5" fill="var(--on-accent)">
        mean round 1,061 s
      </text>

      <line x1={137} y1={108} x2={300} y2={162} stroke="var(--line-strong)" strokeWidth="1.6" markerEnd="url(#ar-fed)" />
      <line x1={563} y1={108} x2={400} y2={162} stroke="var(--line-strong)" strokeWidth="1.6" markerEnd="url(#ar-fed)" />
      <text x={350} y={132} textAnchor="middle" fontSize="12" fill="var(--muted)">
        361,602 params · 1,450,195 bytes per round
      </text>

      <rect x={175} y={164} width={350} height={76} className={BOX} strokeWidth="2.5" />
      <text x={350} y={192} textAnchor="middle" className={LABEL} fontSize="14">
        Flower server · FedAvg
      </text>
      <text x={350} y={214} textAnchor="middle" fontSize="12.5" fill="var(--muted)">
        30 rounds · synchronous, so paced by the Nano
      </text>

      <line x1={350} y1={240} x2={350} y2={276} stroke="var(--line-strong)" strokeWidth="1.6" markerEnd="url(#ar-fed)" />
      <rect x={175} y={278} width={350} height={46} className={BOX} strokeWidth="2" strokeDasharray="5 4" />
      <text x={350} y={300} textAnchor="middle" className={LABEL} fontSize="12.5">
        Server holdout · 36,308 rows · 5%
      </text>
      <text x={350} y={317} textAnchor="middle" fontSize="11.5" fill="var(--muted)">
        evaluated against, never trained on
      </text>
    </svg>
  );
}

function HearingCareDiagram() {
  const surfaces = ['Public site · 7', 'CMS · 10', 'Admin · 4'];
  return (
    <svg viewBox="0 0 700 320" className="w-full" aria-hidden="true" focusable="false">
      <Arrow id="ar-hc" />

      {surfaces.map((s, i) => (
        <g key={s}>
          <rect x={20 + i * 225} y={10} width={205} height={44} className={BOX} strokeWidth="2" />
          <text x={122 + i * 225} y={37} textAnchor="middle" className={LABEL} fontSize="13">
            {s}
          </text>
        </g>
      ))}

      <rect x={20} y={72} width={660} height={40} className={BOX} strokeWidth="2" strokeDasharray="5 4" />
      <text x={350} y={97} textAnchor="middle" className={LABEL} fontSize="12.5">
        Next.js 16 App Router · 8 typed API clients
      </text>
      <line x1={350} y1={112} x2={350} y2={146} stroke="var(--line-strong)" strokeWidth="1.6" markerEnd="url(#ar-hc)" />

      <rect x={110} y={148} width={480} height={94} fill="var(--mint)" stroke="var(--ink)" strokeWidth="2.5" />
      <text x={350} y={176} textAnchor="middle" fontSize="15" className="font-[700]" fill="var(--on-accent)">
        NestJS 11 · Vercel serverless
      </text>
      <text x={350} y={199} textAnchor="middle" fontSize="12.5" fill="var(--on-accent)">
        10 modules · Helmet · rate limiting · Zod
      </text>
      <text x={350} y={221} textAnchor="middle" fontSize="12.5" fill="var(--on-accent)">
        exception filter · sanitisation · admin guard
      </text>

      <line x1={350} y1={242} x2={350} y2={272} stroke="var(--line-strong)" strokeWidth="1.6" markerEnd="url(#ar-hc)" />
      <rect x={230} y={274} width={240} height={40} className={BOX} strokeWidth="2.5" />
      <text x={350} y={299} textAnchor="middle" className={LABEL} fontSize="13">
        PostgreSQL · Drizzle · 12 tables
      </text>

      <rect x={20} y={274} width={190} height={40} className={BOX} strokeWidth="2" strokeDasharray="5 4" />
      <text x={115} y={299} textAnchor="middle" className={LABEL} fontSize="12.5">
        Cloudinary
      </text>
      <rect x={490} y={274} width={190} height={40} className={BOX} strokeWidth="2" strokeDasharray="5 4" />
      <text x={585} y={299} textAnchor="middle" className={LABEL} fontSize="12.5">
        Nodemailer
      </text>
    </svg>
  );
}

const DIAGRAMS: Record<string, { render: () => React.JSX.Element; caption: string }> = {
  'pharma-erp': {
    render: PharmaDiagram,
    caption:
      'Four clients — a React SPA, an Expo mobile app, the public site and a marketing portal — all call one NestJS API on Fastify, carrying 57 feature modules and 480 endpoints behind a single global snake_case-to-camelCase interceptor. The API reads and writes one PostgreSQL database through Prisma across 109 models, with Cloudflare R2 holding media and Socket.IO and scheduled jobs running alongside.',
  },
  fedguard: {
    render: FedGuardDiagram,
    caption:
      'A laptop client holding 508,282 rows and a Jetson Nano holding 181,529 each train locally and send only a 361,602-parameter head — 1,450,195 bytes — to a Flower server running FedAvg for 30 rounds. Aggregation is synchronous, so each round is paced by the Nano at roughly 1,061 seconds against the laptop’s 363. A 36,308-row holdout on the server is evaluated against but never trained on.',
  },
  'hearing-care': {
    render: HearingCareDiagram,
    caption:
      'A Next.js App Router frontend spanning 7 public pages, 10 CMS pages and 4 admin pages reaches the backend through 8 typed API clients. The backend is NestJS running as a Vercel serverless function across 10 modules, with Helmet, rate limiting, Zod validation, a global exception filter, input sanitisation and an admin guard in place from the start, over PostgreSQL through Drizzle. Cloudinary stores media and Nodemailer delivers enquiries.',
  },
};

export function ArchitectureDiagram({ slug }: { slug: string }) {
  const entry = DIAGRAMS[slug];
  if (!entry) return null;
  const Render = entry.render;

  return (
    <figure className="mt-8 border-[2.5px] border-ink bg-paper p-4 sm:p-6">
      <div className="overflow-x-auto">
        <div className="min-w-[520px]">
          <Render />
        </div>
      </div>
      <figcaption className="mt-4 border-t-2 border-dashed border-line pt-4 text-[0.85rem] leading-relaxed text-muted">
        {entry.caption}
      </figcaption>
    </figure>
  );
}
