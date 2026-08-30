/**
 * POST /api/contact — Vercel Edge function.
 *
 * Validates a contact submission and delivers it by email. Returns JSON in
 * every case, including failures, so the client can never mistake an HTML
 * fallback page for a success.
 *
 * Required environment variables (set in the Vercel dashboard):
 *   RESEND_API_KEY  — API key from resend.com
 *   CONTACT_TO      — destination address (defaults to the address below)
 *   CONTACT_FROM    — verified sender; 'onboarding@resend.dev' works without
 *                     a custom domain, but only delivers to your own address
 *
 * Without RESEND_API_KEY the endpoint returns 503 and the form shows its
 * "email me directly" fallback. It never reports a success it did not achieve.
 */

export const config = { runtime: 'edge' };

const DEFAULT_TO = 'abdullahkniazi04@gmail.com';
const DEFAULT_FROM = 'Portfolio contact <onboarding@resend.dev>';

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

/**
 * Best-effort rate limiting. Edge instances are per-region and short-lived, so
 * this stops casual repeat submissions rather than a determined attacker; a
 * durable store would be needed for that.
 */
const recentHits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const previous = recentHits.get(key) ?? [];
  const withinWindow = previous.filter((t) => now - t < WINDOW_MS);
  withinWindow.push(now);
  recentHits.set(key, withinWindow);

  // Keep the map from growing without bound across a warm instance.
  if (recentHits.size > 5000) {
    for (const [k, times] of recentHits) {
      if (times.every((t) => now - t >= WINDOW_MS)) recentHits.delete(k);
    }
  }
  return withinWindow.length > MAX_PER_WINDOW;
}

function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      // The form is same-origin; no cross-origin access is granted.
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

interface Payload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
}

function asString(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/** Header injection guard for anything that reaches a mail header. */
function isSingleLine(value: string): boolean {
  return !/[\r\n]/.test(value);
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed.' }, 405);
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return json({ ok: false, error: 'Expected a JSON body.' }, 400);
  }

  // Honeypot. Checked here as well as in the client, because a bot posting
  // directly to this endpoint never runs the client at all.
  if (asString(payload.company, 200)) {
    // Report success so the bot learns nothing from the response.
    return json({ ok: true }, 202);
  }

  const name = asString(payload.name, MAX_NAME);
  const email = asString(payload.email, MAX_EMAIL);
  const message = asString(payload.message, MAX_MESSAGE);

  const errors: Record<string, string> = {};
  if (!name) errors['name'] = 'Please enter your name.';
  if (!email) errors['email'] = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors['email'] = 'That does not look like an email address.';
  if (message.length < 10) errors['message'] = 'Please write at least a sentence.';
  if (!isSingleLine(name) || !isSingleLine(email))
    errors['name'] = 'Name and email must be a single line.';

  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 400);
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return json(
      { ok: false, error: 'Too many messages in a short time. Please try again shortly.' },
      429,
    );
  }

  const apiKey = process.env['RESEND_API_KEY'];
  if (!apiKey) {
    // Deliberately not a success. The form falls back to showing the address.
    return json(
      { ok: false, error: 'The contact endpoint is not configured to send mail yet.' },
      503,
    );
  }

  const to = process.env['CONTACT_TO'] ?? DEFAULT_TO;
  const from = process.env['CONTACT_FROM'] ?? DEFAULT_FROM;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio contact — ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[contact] provider rejected the send', res.status, detail.slice(0, 400));
      return json({ ok: false, error: 'The message could not be delivered.' }, 502);
    }

    return json({ ok: true }, 202);
  } catch (err) {
    console.error('[contact] send failed', err);
    return json({ ok: false, error: 'The message could not be delivered.' }, 502);
  }
}
