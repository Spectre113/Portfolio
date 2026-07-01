import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import { ExternalLink, FolderGit2, GitBranch, GitCommit } from 'lucide-react';
import { useProjects } from '../../entities/project/hooks/useProjects.ts';
import avitoCover from '../../assets/Avito-test.webp';
import marusyaCover from '../../assets/Marusya.webp';
import portfolioCover from '../../assets/Portfolio.webp';
import travelForgeCover from '../../assets/TravelForge.webp';
import vkTestCover from '../../assets/VK-test.webp';
import wWaveCover from '../../assets/W-wave.webp';
import { trackPortfolioEvent } from '../../shared/analytics/trackEvent.ts';
import { useTranslation } from '../../shared/i18n/useTranslation.ts';
import type { Language } from '../../shared/language/language-context.ts';
import './ProjectsSection.css';

const projectCovers: Record<string, string> = {
  'avito-task': avitoCover,
  portfolio: portfolioCover,
  travelforge: travelForgeCover,
  'vk-marusya': marusyaCover,
  'vk-test': vkTestCover,
  'w-wave': wWaveCover,
};

const PROJECTS_CAROUSEL_OPTIONS: EmblaOptionsType = {
  align: 'start',
  containScroll: false,
  dragFree: true,
  loop: true,
  skipSnaps: true,
};

const projectDescriptionTranslations: Partial<
  Record<Language, Record<string, string>>
> = {
  en: {
    'avito-task':
      'Seller dashboard with listings, cards, editing flows and AI suggestions for descriptions and pricing.',
    portfolio:
      'Personal portfolio site with modern architecture, themes, animations and a tidy data layer.',
    travelforge:
      'Trip planning app with budget controls, preferences, map view and TravelBot.',
    'vk-marusya':
      'Frontend movie SPA with search, detail cards, genres and a user profile area.',
    'vk-test':
      'VK test task: a cat gallery with favorites and infinite card loading.',
    'w-wave':
      'Static radio station site with responsive layout, interactions and BEM structure.',
  },
};

const projectTitleTranslations: Partial<
  Record<Language, Record<string, string>>
> = {
  en: {
    'vk-marusya': 'VK Marusya',
  },
};

function getProjectTitle(
  project: { slug: string; title: string },
  language: Language,
) {
  return projectTitleTranslations[language]?.[project.slug] ?? project.title;
}

function formatCommitDate(date: string, language: Language) {
  if (!date) {
    return language === 'ru'
      ? 'Дата коммита недоступна'
      : 'Commit date unavailable';
  }

  return new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function ProjectsSection() {
  const { language, t } = useTranslation();
  const { data: projects = [], isError, isLoading } = useProjects();
  const autoScrollPlugins = useMemo(
    () => [
      AutoScroll({
        breakpoints: {
          '(prefers-reduced-motion: reduce)': { active: false },
        },
        playOnInit: true,
        speed: 0.75,
        startDelay: 700,
        stopOnFocusIn: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
    [],
  );
  const [emblaRef] = useEmblaCarousel(
    PROJECTS_CAROUSEL_OPTIONS,
    autoScrollPlugins,
  );

  return (
    <section className="container projects-section" id="projects">
      <div className="projects-section__heading">
        <div className="projects-section__title-group">
          <span className="projects-section__icon" aria-hidden="true">
            <FolderGit2 size={22} strokeWidth={2.1} />
          </span>
          <h2 className="projects-section__title">{t('projects.title')}</h2>
        </div>

        <Link className="projects-section__all-link" to="/projects">
          {t('projects.more')}
          <ExternalLink size={17} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      </div>

      {isLoading && (
        <p className="projects-section__state">{t('projects.loading')}</p>
      )}

      {isError && (
        <p className="projects-section__state">{t('projects.error')}</p>
      )}

      <div className="projects-section__viewport" ref={emblaRef}>
        <div className="projects-section__track">
          {projects.map((project) => {
            const projectTitle = getProjectTitle(project, language);

            return (
              <article className="project-card" key={project.slug}>
                <div className="project-card__cover-wrap">
                  <img
                    className="project-card__cover"
                    src={projectCovers[project.slug]}
                    alt={`${t('projects.altPreview')} ${projectTitle}`}
                    width="640"
                    height="360"
                    decoding="async"
                    loading="lazy"
                  />
                </div>

                <div className="project-card__body">
                  <h3 className="project-card__title">{projectTitle}</h3>

                  <p className="project-card__description">
                    {projectDescriptionTranslations[language]?.[project.slug] ??
                      project.description}
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
                    {t('projects.updated')}:{' '}
                    {formatCommitDate(project.pushedAt, language)}
                  </p>

                  <div className="project-card__actions">
                    <a
                      className="project-card__action"
                      href={project.githubUrl}
                      aria-label={`GitHub repository for ${projectTitle}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        trackPortfolioEvent('project_github_open', {
                          project: project.slug,
                          source: 'home',
                        })
                      }
                    >
                      <GitBranch
                        size={17}
                        strokeWidth={2.1}
                        aria-hidden="true"
                      />
                      GitHub
                    </a>

                    {project.demoUrl ? (
                      <a
                        className="project-card__action project-card__action--primary"
                        href={project.demoUrl}
                        aria-label={`Demo for ${projectTitle}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          trackPortfolioEvent('project_demo_open', {
                            project: project.slug,
                            source: 'home',
                          })
                        }
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
                        {project.demoStatus === 'Демо требует backend'
                          ? t('projectStatus.backendRequired')
                          : project.demoStatus === 'Демо недоступно'
                            ? t('projectStatus.unavailable')
                          : (project.demoStatus ??
                            t('projectStatus.inProgress'))}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
