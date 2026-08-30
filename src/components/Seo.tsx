import { SITE_URL, person } from '@/lib/site';

const OG_IMAGE = `${SITE_URL}/og.png`;

/**
 * React 19 hoists <title>, <meta>, <link> and <script> to <head> from anywhere
 * in the tree, so this needs no helmet library and no extra bytes on first load.
 */
export function Seo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = `${SITE_URL}${path}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={person.name} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${person.name} — ${person.role}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </>
  );
}

/**
 * JSON-LD Person schema. Home page only — repeating it per route would
 * describe the same person several times over.
 */
export function PersonSchema() {
  const sameAs = [person.github, person.linkedin].filter(
    (v): v is string => typeof v === 'string',
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: 'Full-Stack Developer, AI / Edge ML',
    email: `mailto:${person.email}`,
    url: SITE_URL,
    image: `${SITE_URL}/img/abdullah-720.webp`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Institute of Space Technology',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Islamabad',
        addressCountry: 'PK',
      },
    },
    knowsAbout: [
      'Backend engineering',
      'NestJS',
      'PostgreSQL',
      'Prisma',
      'Drizzle ORM',
      'TypeScript',
      'React',
      'Federated learning',
      'PyTorch',
      'Edge machine learning',
      'Docker',
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from a literal defined above; no user input reaches it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
