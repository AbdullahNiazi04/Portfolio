import { CaseStudyPage } from '@/components/CaseStudyPage';
import { projectBySlug } from '@/data/projects';
import caseStudy from '@/data/case-studies/pharma-erp';

const project = projectBySlug('pharma-erp');

export default function PharmaErp() {
  if (!project) return null;
  return <CaseStudyPage project={project} caseStudy={caseStudy} />;
}
