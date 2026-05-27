import { useFeaturedProjects } from '../entities/project/hooks/useProjects.ts';
import { HeroSection } from '../widgets/hero/HeroSection.tsx';
import { SkillsSection } from '../widgets/skills/SkillsSection.tsx';
import './HomePage.css';

export function HomePage() {
  const { data: projects = [], isError, isLoading } = useFeaturedProjects();

  return (
    <div className="home-page">
      <HeroSection />
      <SkillsSection />

      <section className="container section-preview">
        <div className="section-preview__heading">
          <h2 className="section-preview__title">Избранные проекты</h2>
          <p className="section-preview__text">
            Данные уже идут через GitHub API и локальные метаданные, чтобы UI не
            зависел от сырого ответа сервиса.
          </p>
        </div>

        {isLoading && <p className="state-message">Загружаю проекты...</p>}
        {isError && (
          <p className="state-message">
            GitHub сейчас не ответил, но локальные метаданные уже готовы для
            fallback-слоя.
          </p>
        )}

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.slug}>
              <p className="project-card__kicker">{project.repositoryName}</p>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__description">{project.description}</p>
              <ul className="project-card__stack list-reset">
                {project.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
