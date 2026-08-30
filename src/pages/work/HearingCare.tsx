import { CaseStudyPage } from '@/components/CaseStudyPage';
import { featured } from '@/data/projects';
import caseStudy from '@/data/case-studies/hearing-care';

const project = featured.find((p) => p.slug === 'hearing-care');

export default function HearingCare() {
  if (!project) return null;
  return <CaseStudyPage project={project} caseStudy={caseStudy} />;
}
