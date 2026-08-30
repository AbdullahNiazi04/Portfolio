import { Link } from 'react-router-dom';
import { Container } from './Container';
import { navItems, person } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t-2 border-dashed border-line-strong py-8">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Muted token rather than opacity: the reference's 0.55 failed AA. */}
          <p className="label-type text-[0.72rem] text-muted">
            {person.name} © {new Date().getFullYear()}
          </p>
          <ul className="flex flex-wrap gap-5">
            {navItems.map((item) => (
              <li key={item.hash}>
                <Link
                  to={{ pathname: '/', hash: `#${item.hash}` }}
                  className="label-type text-[0.72rem] text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
