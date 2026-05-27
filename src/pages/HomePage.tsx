import { useFeaturedProjects } from '../entities/project/hooks/useProjects.ts';

export function HomePage() {
  const { data: projects = [], isError, isLoading } = useFeaturedProjects();

  return (
    <div className="page">
      <section className="container hero-foundation">
        <p className="eyebrow">Frontend Developer</p>
        <h1>Владимир Топорков</h1>
        <p className="hero-foundation__text">
          Собираю современные веб-интерфейсы на React, TypeScript и аккуратной
          архитектуре. Это первый фундамент портфолио, дальше будем наращивать
          дизайн и анимации порционно.
        </p>
      </section>

      <section className="container section-preview">
        <div className="section-preview__heading">
          <h2>Избранные проекты</h2>
          <p>
            Данные уже идут через GitHub API и локальные метаданные, чтобы UI не
            зависел от сырого ответа сервиса.
          </p>
        </div>

        {isLoading && <p className="state-text">Загружаю проекты...</p>}
        {isError && (
          <p className="state-text">
            GitHub сейчас не ответил, но локальные метаданные уже готовы для
            fallback-слоя.
          </p>
        )}

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.slug}>
              <p className="project-card__kicker">{project.repositoryName}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
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
