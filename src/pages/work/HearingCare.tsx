import { CaseStudyPage } from '@/components/CaseStudyPage';
import { projectBySlug } from '@/data/projects';
import caseStudy from '@/data/case-studies/hearing-care';

const project = projectBySlug('hearing-care');

export default function HearingCare() {
  if (!project) return null;
  return <CaseStudyPage project={project} caseStudy={caseStudy} />;
}
