import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../../widgets/layout/MainLayout.tsx';
import { AboutPage } from '../../pages/AboutPage.tsx';
import { ContactsPage } from '../../pages/ContactsPage.tsx';
import { HomePage } from '../../pages/HomePage.tsx';
import { ProjectsPage } from '../../pages/ProjectsPage.tsx';
import { SkillsPage } from '../../pages/SkillsPage.tsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
