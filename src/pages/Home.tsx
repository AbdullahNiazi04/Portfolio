import { Container } from '@/components/Container';
import { Marquee } from '@/components/Marquee';
import { SectionHeading } from '@/components/SectionHeading';
import { PersonSchema, Seo } from '@/components/Seo';
import { ProjectCard } from '@/components/ProjectCard';
import { AlsoBuilt } from '@/components/AlsoBuilt';
import { WavyDivider, Wordmarks } from '@/components/Ornaments';
import { Experience } from '@/components/sections/Experience';
import { Currently } from '@/components/sections/Currently';
import { StackSection } from '@/components/sections/StackSection';
import { HowIWork } from '@/components/sections/HowIWork';
import { AboutSection } from '@/components/sections/AboutSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactForm } from '@/components/sections/ContactForm';
import { Reveal } from '@/lib/motion';
import { featured } from '@/data/projects';
import { person, positioning } from '@/lib/site';

function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="py-14 sm:py-20">
      <Container>
        <div className="mb-8 flex flex-wrap gap-3">
          <span className="label-type inline-block -rotate-[3deg] border-[1.5px] border-line-strong bg-yellow px-4 py-2 text-[0.7rem] text-on-accent [clip-path:polygon(0_0,85%_0,100%_50%,85%_100%,0_100%)]">
            Full-Stack
          </span>
          <span className="label-type inline-block rotate-[2deg] border-[1.5px] border-line-strong bg-blue px-4 py-2 text-[0.7rem] text-on-accent [clip-path:polygon(0_0,85%_0,100%_50%,85%_100%,0_100%)]">
            AI / Edge ML
          </span>
        </div>

        <Marquee>
          <h1 id="hero-heading" className="pixel text-[clamp(1.9rem,7.5vw,4.2rem)] leading-[1.1]">
            <span className="block">Abdullah</span>
            <span className="block">Khan Niazi</span>
          </h1>
        </Marquee>

        <p className="font-label mt-10 max-w-[34ch] text-[clamp(1.15rem,2.4vw,1.7rem)] leading-[1.35] font-semibold">
          Backend systems engineer who ships machine learning into{' '}
          <em className="bg-blue px-1 text-on-accent not-italic">places that resist it</em>.
        </p>

        <p className="mt-6 max-w-[48ch] leading-relaxed text-muted">
          A 480-endpoint ERP running in production, and federated training across a Jetson
          Nano with 4 GB of shared memory.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href="#work"
            className="label-type inline-flex border-2 border-ink bg-ink px-6 py-3.5 text-[0.78rem] text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="label-type border-b-2 border-line-strong pb-0.5 text-[0.78rem] transition-colors hover:border-pink hover:text-pink"
          >
            Get in touch
          </a>
        </div>

        <Wordmarks />
      </Container>
    </section>
  );
}

function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-t-2 border-dashed border-line py-16 sm:py-20"
    >
      <Container>
        <Reveal>
          <SectionHeading id="work-heading">Selected work</SectionHeading>
          <p className="mt-4 max-w-[58ch] text-[0.95rem] leading-relaxed text-muted">
            Three builds, each with a case study covering the architecture, the
            trade-offs behind it and what I changed as a result.
          </p>
        </Reveal>

        {featured.map((project, i) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Seo
        title={`${person.name} — Full-Stack Developer, AI / Edge ML`}
        description={positioning}
        path="/"
      />
      <PersonSchema />

      <Hero />
      <WavyDivider />
      <Work />
      <Experience />
      <Currently />
      <StackSection />
      <HowIWork />
      <AlsoBuilt />
      <AboutSection />
      <EducationSection />
      <ContactForm />
    </>
  );
}
