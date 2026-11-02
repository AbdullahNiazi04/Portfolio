import { CaseStudyPage } from '@/components/CaseStudyPage';
import { projectBySlug } from '@/data/projects';
import caseStudy from '@/data/case-studies/fedguard';

const project = projectBySlug('fedguard');

export default function FedGuard() {
  if (!project) return null;
  return <CaseStudyPage project={project} caseStudy={caseStudy} />;
}
