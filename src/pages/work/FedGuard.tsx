import { CaseStudyPage } from '@/components/CaseStudyPage';
import { featured } from '@/data/projects';
import caseStudy from '@/data/case-studies/fedguard';

const project = featured.find((p) => p.slug === 'fedguard');

export default function FedGuard() {
  if (!project) return null;
  return <CaseStudyPage project={project} caseStudy={caseStudy} />;
}
