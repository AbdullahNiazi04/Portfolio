import { CaseStudyPage } from '@/components/CaseStudyPage';
import { featured } from '@/data/projects';
import caseStudy from '@/data/case-studies/pharma-erp';

const project = featured.find((p) => p.slug === 'pharma-erp');

export default function PharmaErp() {
  if (!project) return null;
  return <CaseStudyPage project={project} caseStudy={caseStudy} />;
}
