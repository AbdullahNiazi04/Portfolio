import { useId, useRef, useState } from 'react';
import { Section } from '../Section';
import { Reveal } from '@/lib/motion';
import { person } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'sent' | 'error';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const ENDPOINT = import.meta.env['VITE_API_URL'] ?? '/api/contact';

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = 'That does not look like an email address.';
  if (values.message.trim().length < 10)
    errors.message = 'Please write at least a sentence.';
  return errors;
}

export function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people do not fill a field they cannot see.
    if ((data.get('company') as string)?.trim()) {
      setStatus('sent');
      return;
    }

    const values = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Send focus to the first field that failed, not just a message.
      const firstKey = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const fieldClass =
    'w-full border-2 border-line-strong bg-paper-deep px-3.5 py-2.5 text-[0.95rem] text-ink';

  return (
    <Section
      id="contact"
      heading="Get in touch"
      intro="Open to backend and AI platform roles. The fastest route is email — the form goes to the same place."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr]">
        <Reveal>
          <form ref={formRef} onSubmit={onSubmit} noValidate>
            {/* honeypot — off-screen rather than display:none, and never focusable */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={nameId} className="label-type block text-[0.62rem] text-muted">
                  Name
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={`mt-2 ${fieldClass}`}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? `${nameId}-err` : undefined}
                />
                {errors.name ? (
                  <p id={`${nameId}-err`} className="label-type mt-1.5 text-[0.62rem] text-pink">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={emailId} className="label-type block text-[0.62rem] text-muted">
                  Email
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`mt-2 ${fieldClass}`}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? `${emailId}-err` : undefined}
                />
                {errors.email ? (
                  <p id={`${emailId}-err`} className="label-type mt-1.5 text-[0.62rem] text-pink">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor={messageId} className="label-type block text-[0.62rem] text-muted">
                Message
              </label>
              <textarea
                id={messageId}
                name="message"
                rows={5}
                className={`mt-2 resize-y ${fieldClass}`}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? `${messageId}-err` : undefined}
              />
              {errors.message ? (
                <p id={`${messageId}-err`} className="label-type mt-1.5 text-[0.62rem] text-pink">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="label-type mt-6 inline-flex border-2 border-ink bg-ink px-6 py-3.5 text-[0.78rem] text-paper transition-colors hover:bg-transparent hover:text-ink disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>

            {/* Single live region: announced on success and on failure alike. */}
            <p role="status" aria-live="polite" className="mt-4 text-[0.88rem]">
              {status === 'sent' ? 'Thanks — your message is on its way.' : null}
              {status === 'error' ? (
                <span className="text-pink">
                  That did not send. Email {person.email} directly and it will reach me.
                </span>
              ) : null}
            </p>
          </form>
        </Reveal>

        <Reveal delay={0.06}>
          <dl className="space-y-5 border-l-4 border-l-pink pl-5">
            <div>
              <dt className="label-type text-[0.6rem] text-muted">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${person.email}`} className="text-[0.95rem] underline underline-offset-4">
                  {person.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-type text-[0.6rem] text-muted">Phone</dt>
              <dd className="num mt-1 text-[0.95rem]">{person.phone}</dd>
            </div>
            {person.github ? (
              <div>
                <dt className="label-type text-[0.6rem] text-muted">GitHub</dt>
                <dd className="mt-1">
                  <a
                    href={person.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.95rem] underline underline-offset-4"
                  >
                    AbdullahNiazi04
                  </a>
                </dd>
              </div>
            ) : null}
            {/* LinkedIn is omitted entirely while the URL is unknown — never a
                dead link. See TODO.md. */}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
