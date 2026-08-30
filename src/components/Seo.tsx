import { SITE_URL } from '@/lib/site';

/**
 * React 19 hoists <title>, <meta> and <link> to <head> from anywhere in the
 * tree, so this needs no helmet library and no extra bytes on first load.
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
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
