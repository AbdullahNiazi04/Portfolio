import type { PhoneShot } from '@/data/projects';

/**
 * Portrait phone captures.
 *
 * A mobile product's screenshots are roughly 9:19.5. Fed into the landscape
 * box that `preview` and `screenshot` assume, they letterbox with accent
 * colour either side and read as a broken image; scaled to fill it, they crop
 * to a strip. So they get their own layout: framed shots in a row, with the
 * frame doing the work of saying "this is a phone" rather than a decorative
 * device bezel.
 *
 * Both variants share `Shot` so the srcSet, intrinsic dimensions and file
 * naming can only be wrong in one place.
 */

function Shot({
  slug,
  shot,
  sizes,
}: {
  slug: string;
  shot: PhoneShot;
  sizes: string;
}) {
  /*
   * A hairline border is enough on a landscape product shot, which is mostly
   * chrome and dark pixels. A phone capture is often white to the edge, so
   * without a real line it bleeds into the paper and loses its outline — hence
   * the same `border-line-strong` the landscape figure uses.
   */
  return (
    <img
      src={`/img/shot-${slug}-${shot.name}-840.webp`}
      srcSet={`/img/shot-${slug}-${shot.name}-420.webp 420w, /img/shot-${slug}-${shot.name}-840.webp 840w`}
      sizes={sizes}
      width={shot.width}
      height={shot.height}
      loading="lazy"
      decoding="async"
      alt={shot.alt}
      className="block h-auto w-full border-[1.5px] border-line-strong bg-paper shadow-md"
    />
  );
}

/**
 * Card variant — at most two shots, inside the accent panel. The stagger and
 * the slight counter-rotations are the same idiom as the hero badges, and they
 * stop two identical rectangles from reading as a single flat block.
 */
export function PhonePreview({ slug, shots }: { slug: string; shots: PhoneShot[] }) {
  if (shots.length === 0) return null;

  return (
    <ul className="flex w-full items-end justify-center gap-3 sm:gap-4">
      {shots.slice(0, 2).map((shot, i) => (
        <li
          key={shot.name}
          className={`w-[42%] max-w-[172px] ${
            i === 0 ? '-rotate-[1.5deg]' : 'mb-5 rotate-[1.5deg]'
          }`}
        >
          <Shot slug={slug} shot={shot} sizes="(min-width: 640px) 172px, 40vw" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Case study variant — the full set, each with its own caption. Two columns on
 * a phone rather than one: a single portrait shot at full width is taller than
 * the viewport and the reader loses the thread of the page.
 */
export function PhoneShotGrid({
  slug,
  shots,
  note,
}: {
  slug: string;
  shots: PhoneShot[];
  /* `| undefined` because exactOptionalPropertyTypes rejects a passed-through
     optional field otherwise, and the caller forwards one straight from data. */
  note?: string | undefined;
}) {
  if (shots.length === 0) return null;

  return (
    <figure className="border-[2.5px] border-ink bg-paper-deep p-3 sm:p-5">
      {/*
        Each cell is capped and centred rather than filling its column: an
        unconstrained portrait image at tablet width grows to 360px across and
        780px tall, which stops being a screenshot of a phone and becomes a
        wall. 200px is about the width the UI inside the capture stays legible
        at without dominating the page.
      */}
      <ul className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {shots.map((shot) => (
          <li key={shot.name} className="w-full max-w-[200px]">
            <Shot slug={slug} shot={shot} sizes="(min-width: 480px) 200px, 44vw" />
            {shot.caption ? (
              <p className="mt-3 text-[0.78rem] leading-[1.5] text-muted">{shot.caption}</p>
            ) : null}
          </li>
        ))}
      </ul>
      {/*
        Not label-type: a credit line naming a person reads as shouting in
        all-caps letterspacing, and this one has to be legible as prose.
      */}
      <figcaption className="mt-5 border-t-2 border-dashed border-line pt-4 text-[0.78rem] leading-[1.5] text-muted">
        {note ?? 'Captured from the running app.'}
      </figcaption>
    </figure>
  );
}
