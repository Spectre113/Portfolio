import { ExternalLink, FolderGit2, GitBranch, GitCommit } from 'lucide-react';
import { useFeaturedProjects } from '../../entities/project/hooks/useProjects.ts';
import avitoCover from '../../assets/Avito-test.png';
import marusyaCover from '../../assets/Marusya.png';
import portfolioCover from '../../assets/Portfolio.png';
import vkTestCover from '../../assets/VK-test.png';
import './ProjectsSection.css';

const projectCovers: Record<string, string> = {
  'avito-task': avitoCover,
  portfolio: portfolioCover,
  'vk-marusya': marusyaCover,
  'vk-test': vkTestCover,
};

function formatCommitDate(date: string) {
  if (!date) {
    return 'Дата коммита недоступна';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function ProjectsSection() {
  const { data: projects = [], isError, isLoading } = useFeaturedProjects();

  return (
    <section className="container projects-section" id="projects">
      <div className="projects-section__heading">
        <div className="projects-section__title-group">
          <span className="projects-section__icon" aria-hidden="true">
            <FolderGit2 size={22} strokeWidth={2.1} />
          </span>
          <h2 className="projects-section__title">Проекты</h2>
        </div>

        <a className="projects-section__all-link" href="/projects">
          Смотреть все проекты
          <ExternalLink size={17} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </div>

      {isLoading && (
        <p className="projects-section__state">Загружаю проекты из GitHub...</p>
      )}

      {isError && (
        <p className="projects-section__state">
          GitHub сейчас не ответил, показываю локальные данные проектов.
        </p>
      )}

      <div className="projects-section__grid">
        {projects.map((project) => (
          <article className="project-card" key={project.slug}>
            <div className="project-card__cover-wrap">
              <img
                className="project-card__cover"
                src={projectCovers[project.slug]}
                alt={`Превью проекта ${project.title}`}
                loading="lazy"
              />
            </div>

            <div className="project-card__body">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__description">
                {project.description}
              </p>

              <ul className="project-card__stack list-reset">
                {project.stack.map((technology) => (
                  <li className="project-card__tag" key={technology}>
                    {technology}
                  </li>
                ))}
              </ul>

              <p className="project-card__meta">
                <GitCommit size={16} strokeWidth={2.1} aria-hidden="true" />
                Последний коммит: {formatCommitDate(project.pushedAt)}
              </p>

              <div className="project-card__actions">
                <a
                  className="project-card__action"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitBranch size={17} strokeWidth={2.1} aria-hidden="true" />
                  GitHub
                </a>

                {project.demoUrl ? (
                  <a
                    className="project-card__action project-card__action--primary"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink
                      size={17}
                      strokeWidth={2.1}
                      aria-hidden="true"
                    />
                    Demo
                  </a>
                ) : (
                  <span className="project-card__status">
                    {project.demoStatus ?? 'В разработке'}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
