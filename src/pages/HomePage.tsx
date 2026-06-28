import { useOutletContext } from 'react-router-dom';
import type { MainLayoutContext } from '../widgets/layout/MainLayout.tsx';
import { HeroSection } from '../widgets/hero/HeroSection.tsx';
import { ProjectsSection } from '../widgets/projects/ProjectsSection.tsx';
import { SkillsSection } from '../widgets/skills/SkillsSection.tsx';
import { SummarySection } from '../widgets/summary/SummarySection.tsx';
import './HomePage.css';

export function HomePage() {
  const { openContactModal } = useOutletContext<MainLayoutContext>();

  return (
    <div className="home-page">
      <HeroSection onContactClick={openContactModal} />
      <SkillsSection />
      <ProjectsSection />
      <SummarySection onContactClick={openContactModal} />
    </div>
  );
}
