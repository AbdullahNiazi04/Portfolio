import { CaseStudyPage } from '@/components/CaseStudyPage';
import { projectBySlug } from '@/data/projects';
import caseStudy from '@/data/case-studies/unike';

const project = projectBySlug('unike');

export default function Unike() {
  if (!project) return null;
  return <CaseStudyPage project={project} caseStudy={caseStudy} />;
}
