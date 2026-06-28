import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../../widgets/layout/MainLayout.tsx';
import { useTranslation } from '../../shared/i18n/useTranslation.ts';

const HomePage = lazy(() =>
  import('../../pages/HomePage.tsx').then((module) => ({
    default: module.HomePage,
  })),
);
const ProjectsPage = lazy(() =>
  import('../../pages/ProjectsPage.tsx').then((module) => ({
    default: module.ProjectsPage,
  })),
);
const AboutPage = lazy(() =>
  import('../../pages/AboutPage.tsx').then((module) => ({
    default: module.AboutPage,
  })),
);
const SkillsPage = lazy(() =>
  import('../../pages/SkillsPage.tsx').then((module) => ({
    default: module.SkillsPage,
  })),
);

function PageLoader() {
  const { t } = useTranslation();

  return (
    <div className="container page-loader" role="status" aria-live="polite">
      {t('common.loading')}
    </div>
  );
}

function LazyPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <LazyPage>
              <HomePage />
            </LazyPage>
          }
        />
        <Route
          path="projects"
          element={
            <LazyPage>
              <ProjectsPage />
            </LazyPage>
          }
        />
        <Route
          path="about"
          element={
            <LazyPage>
              <AboutPage />
            </LazyPage>
          }
        />
        <Route
          path="skills"
          element={
            <LazyPage>
              <SkillsPage />
            </LazyPage>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
