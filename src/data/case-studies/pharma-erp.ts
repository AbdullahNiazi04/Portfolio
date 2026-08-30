import type { CaseStudy } from '../projects';

/**
 * Imported only by the PharmaERP route, which is itself lazy-loaded, so this
 * prose ships in that route's chunk rather than on the home page's first load.
 */
const caseStudy: CaseStudy = {
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
};

export default caseStudy;
