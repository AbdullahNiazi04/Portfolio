import type { CaseStudy } from '../projects';

const caseStudy: CaseStudy = {
  problem:
    'A hearing-aid clinic needed a public website, and more importantly needed to stop needing a developer. Every page, article, product, FAQ and clinic location had to be editable by the owner, and patient enquiries had to arrive somewhere they would actually be seen. A page-builder would have solved the website and not the second half.',
  screenshot: {
    width: 1400,
    height: 599,
    alt: 'The Hearing Care Services website, services page. A top navigation bar spans home, services, hearing aids, resources, about us and contact, with a book appointment call to action. The page headline reads Comprehensive Hearing Care Services above a description and a row of headline figures.',
    caption: 'The public site. Every element here — navigation, headline, body copy and the figures below it — is editable by the owner through the CMS rather than in code.',
  },
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
};

export default caseStudy;
