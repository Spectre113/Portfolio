import { useMemo, useState } from 'react';
import {
  ExternalLink,
  FolderGit2,
  GitBranch,
  GitCommit,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { useProjects } from '../entities/project/hooks/useProjects.ts';
import type { Project } from '../entities/project/model/project.schema.ts';
import { trackPortfolioEvent } from '../shared/analytics/trackEvent.ts';
import avitoCover from '../assets/Avito-test.webp';
import marusyaCover from '../assets/Marusya.webp';
import portfolioCover from '../assets/Portfolio.webp';
import travelForgeCover from '../assets/TravelForge.webp';
import vkTestCover from '../assets/VK-test.webp';
import wWaveCover from '../assets/W-wave.webp';
import { filterProjects } from './project-search.ts';
import { useTranslation } from '../shared/i18n/useTranslation.ts';
import type { TranslationKey } from '../shared/i18n/translations.ts';
import type { Language } from '../shared/language/language-context.ts';
import './ProjectsPage.css';

type ProjectFilter =
  | 'all'
  | 'frontend'
  | 'react'
  | 'typescript'
  | 'test'
  | 'pet';

type ProjectPageDetails = {
  category: ProjectFilter[];
  cover: string;
  highlights: string[];
  longDescription: string;
  role: string;
  scope: string;
};

const projectDetailsRu: Record<string, ProjectPageDetails> = {
  'vk-marusya': {
    category: ['frontend', 'react', 'typescript', 'pet'],
    cover: marusyaCover,
    role: 'Frontend SPA, личный проект',
    scope:
      'Реализовал клиентскую часть: страницы, маршруты, авторизацию, работу с избранным, server state и валидацию API-контрактов.',
    longDescription:
      'Приложение для поиска фильмов, просмотра карточек, работы с жанрами и личным кабинетом пользователя. В проекте сделал акцент на типобезопасности, предсказуемых loading/error-сценариях, разделении API-слоя и UI-логики, а также на стабильной работе избранного и пользовательского состояния.',
    highlights: [
      'поиск фильмов с debounce',
      'авторизация и защищенные сценарии',
      'TanStack Query для server state',
      'Zod для проверки входных данных',
    ],
  },
  portfolio: {
    category: ['frontend', 'react', 'typescript', 'pet'],
    cover: portfolioCover,
    role: 'Личный сайт-портфолио',
    scope:
      'Собираю архитектуру портфолио, страницы, темы, data layer, анимации и контактную форму.',
    longDescription:
      'Портфолио сделано как живой frontend-проект, а не статичная визитка: роутинг, темизация, Zod-контракты, React Query, анимации, адаптив и Formspree для связи. Проект постепенно расширяется отдельными страницами и более подробными кейсами.',
    highlights: [
      'React 19 + TypeScript',
      'темная и светлая темы',
      'анимации с reduced motion',
      'контактная форма через Formspree',
    ],
  },
  'avito-task': {
    category: ['frontend', 'react', 'typescript', 'test'],
    cover: avitoCover,
    role: 'Тестовое задание, frontend-часть',
    scope:
      'Серверная часть не моя; моя зона - клиентский личный кабинет, формы, маршруты, работа с API и AI-рекомендациями.',
    longDescription:
      'Личный кабинет продавца: список объявлений, карточка объявления, редактирование, фильтры, сортировка, пагинация и AI-рекомендации для описания и цены. Важная часть проекта - форма редактирования с динамическими полями, валидацией, черновиками и аккуратной обработкой состояний интерфейса.',
    highlights: [
      'React Hook Form + Zod',
      'TanStack Query',
      'AI-рекомендации через Ollama',
      'поиск, фильтры и пагинация',
    ],
  },
  'vk-test': {
    category: ['frontend', 'react', 'typescript', 'test'],
    cover: vkTestCover,
    role: 'Тестовое задание',
    scope:
      'Реализовал интерфейс с котиками, избранным и бесконечной подгрузкой карточек через внешний API.',
    longDescription:
      'Проект по мотивам “кошачьего Pinterest”: список карточек, добавление в избранное, хранение избранного на клиенте и infinite scroll. Основной фокус был на понятном поведении списка, сохранении пользовательского выбора и аккуратной работе с подгрузкой данных.',
    highlights: [
      'TheCatAPI',
      'избранное на клиенте',
      'infinite scroll',
      'адаптивный интерфейс',
    ],
  },
  'w-wave': {
    category: ['frontend'],
    cover: wWaveCover,
    role: 'Учебный frontend-проект',
    scope:
      'Собрал статический сайт радиостанции с адаптивной версткой, интерактивными элементами и БЭМ-структурой.',
    longDescription:
      'Учебный проект на чистом frontend-стеке: адаптивная верстка, интерактивные элементы, формы, слайдеры и аккуратная структура классов. Хороший пример базовой работы с HTML/CSS/JavaScript без тяжелого фреймворка.',
    highlights: [
      'HTML/CSS/JavaScript',
      'БЭМ',
      'адаптивная верстка',
      'формы и интерактивность',
    ],
  },
  travelforge: {
    category: ['frontend', 'react', 'typescript', 'pet'],
    cover: travelForgeCover,
    role: 'Учебный full-stack проект, frontend-участие',
    scope:
      'В проекте делал frontend-часть; backend и инфраструктура не являются моей зоной реализации.',
    longDescription:
      'Интерфейс для планирования поездок с учетом бюджета, направлений, предпочтений, карты и TravelBot. На frontend-стороне важны сценарии выбора направления, отображение данных, работа с API и визуальная организация сложного пользовательского процесса.',
    highlights: [
      'React + TypeScript',
      'карты и маршруты',
      'REST API integration',
      'TravelBot UI',
    ],
  },
};

const projectDetailsEn: Record<string, ProjectPageDetails> = {
  'vk-marusya': {
    category: ['frontend', 'react', 'typescript', 'pet'],
    cover: marusyaCover,
    role: 'Frontend SPA, personal project',
    scope:
      'Built the client side: pages, routing, auth, favorites, server state and API contract validation.',
    longDescription:
      'A movie search app with detail pages, genres and a user account area. I focused on type safety, predictable loading and error states, a separated API layer, UI logic, and stable favorites/user state behavior.',
    highlights: [
      'movie search with debounce',
      'auth and protected flows',
      'TanStack Query for server state',
      'Zod for input validation',
    ],
  },
  portfolio: {
    category: ['frontend', 'react', 'typescript', 'pet'],
    cover: portfolioCover,
    role: 'Personal portfolio site',
    scope:
      'Building the portfolio architecture, pages, themes, data layer, animations and contact form.',
    longDescription:
      'The portfolio is built as a living frontend project, not a static business card: routing, themes, Zod contracts, React Query, animations, responsive layout and Formspree contact flow. The project keeps growing with separate pages and deeper case studies.',
    highlights: [
      'React 19 + TypeScript',
      'dark and light themes',
      'animations with reduced motion',
      'contact form via Formspree',
    ],
  },
  'avito-task': {
    category: ['frontend', 'react', 'typescript', 'test'],
    cover: avitoCover,
    role: 'Test task, frontend part',
    scope:
      'The server side is not mine; my part is the seller dashboard, forms, routes, API work and AI suggestions.',
    longDescription:
      'Seller dashboard with listings, listing details, editing, filters, sorting, pagination and AI suggestions for description and price. A key part is the edit form with dynamic fields, validation, drafts and careful UI state handling.',
    highlights: [
      'React Hook Form + Zod',
      'TanStack Query',
      'AI suggestions via Ollama',
      'search, filters and pagination',
    ],
  },
  'vk-test': {
    category: ['frontend', 'react', 'typescript', 'test'],
    cover: vkTestCover,
    role: 'Test task',
    scope:
      'Built a cat gallery UI with favorites and infinite card loading through an external API.',
    longDescription:
      'A cat-themed Pinterest-style project: card list, favorites, client-side favorite storage and infinite scroll. The main focus was predictable list behavior, preserving user choices and clean data loading.',
    highlights: [
      'TheCatAPI',
      'client-side favorites',
      'infinite scroll',
      'responsive UI',
    ],
  },
  'w-wave': {
    category: ['frontend'],
    cover: wWaveCover,
    role: 'Learning frontend project',
    scope:
      'Built a static radio station site with responsive layout, interactive elements and BEM structure.',
    longDescription:
      'A learning project on a pure frontend stack: responsive layout, interactive elements, forms, sliders and a tidy class structure. It is a good example of base HTML/CSS/JavaScript work without a heavy framework.',
    highlights: [
      'HTML/CSS/JavaScript',
      'BEM',
      'responsive layout',
      'forms and interactions',
    ],
  },
  travelforge: {
    category: ['frontend', 'react', 'typescript', 'pet'],
    cover: travelForgeCover,
    role: 'Learning full-stack project, frontend contribution',
    scope:
      'I worked on the frontend part; backend and infrastructure are outside my implementation scope.',
    longDescription:
      'Trip planning interface with budget, destinations, preferences, map and TravelBot. On the frontend side, the key work is destination selection, data display, API interaction and visual organization of a complex user flow.',
    highlights: [
      'React + TypeScript',
      'maps and routes',
      'REST API integration',
      'TravelBot UI',
    ],
  },
};

const projectDetailsByLanguage = {
  ru: projectDetailsRu,
  en: projectDetailsEn,
} satisfies Record<Language, Record<string, ProjectPageDetails>>;

const filters: Array<{ id: ProjectFilter; labelKey: TranslationKey }> = [
  { id: 'all', labelKey: 'projectsFilter.all' },
  { id: 'frontend', labelKey: 'projectsFilter.frontend' },
  { id: 'react', labelKey: 'projectsFilter.react' },
  { id: 'typescript', labelKey: 'projectsFilter.typescript' },
  { id: 'test', labelKey: 'projectsFilter.test' },
  { id: 'pet', labelKey: 'projectsFilter.pet' },
];

function formatCommitDate(date: string, language: Language) {
  if (!date) {
    return language === 'ru' ? 'дата недоступна' : 'date unavailable';
  }

  return new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function ProjectsPage() {
  const { language, t } = useTranslation();
  const { data: projects = [], isError, isLoading } = useProjects();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const projectDetails = projectDetailsByLanguage[language];

  const visibleProjects = useMemo(
    () =>
      filterProjects({
        activeFilter,
        detailsBySlug: projectDetails,
        projects,
        searchQuery,
      }),
    [activeFilter, projectDetails, projects, searchQuery],
  );

  const toggleProject = (slug: string) => {
    setExpandedProjects((currentProjects) =>
      currentProjects.includes(slug)
        ? currentProjects.filter((projectSlug) => projectSlug !== slug)
        : [...currentProjects, slug],
    );
  };

  return (
    <main className="projects-page">
      <section className="container projects-page__hero">
        <div className="projects-page__hero-content">
          <p className="projects-page__eyebrow">
            <span aria-hidden="true" />
            {t('projects.title')}
          </p>

          <h1 className="projects-page__title">{t('projects.title')}</h1>

          <p className="projects-page__lead">{t('projectsPage.lead')}</p>
        </div>

        <div className="projects-page__hero-card" aria-hidden="true">
          <FolderGit2 size={34} strokeWidth={1.9} />
          <span>case studies</span>
        </div>
      </section>

      <section className="container projects-page__toolbar">
        <label className="projects-page__search-field">
          <Search size={20} strokeWidth={2.1} aria-hidden="true" />
          <input
            value={searchQuery}
            placeholder={t('projectsPage.searchPlaceholder')}
            aria-label={t('projectsPage.searchAria')}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {searchQuery && (
            <button
              className="projects-page__search-clear btn-reset"
              type="button"
              aria-label={t('projectsPage.clearSearch')}
              onClick={() => setSearchQuery('')}
            >
              <X size={16} strokeWidth={2.3} aria-hidden="true" />
            </button>
          )}
        </label>

        <div
          className="projects-page__filters"
          aria-label={t('projectsPage.filterAria')}
        >
          {filters.map((filter) => (
            <button
              className={
                activeFilter === filter.id
                  ? 'projects-page__filter projects-page__filter--active btn-reset'
                  : 'projects-page__filter btn-reset'
              }
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
            >
              {t(filter.labelKey)}
            </button>
          ))}
        </div>
      </section>

      <section className="container projects-page__grid-section">
        {isLoading && (
          <p className="projects-page__state">{t('projectsPage.loading')}</p>
        )}

        {isError && (
          <p className="projects-page__state">{t('projectsPage.error')}</p>
        )}

        <div className="projects-page__grid">
          {visibleProjects.map((project) => (
            <ProjectCard
              details={projectDetails[project.slug]}
              isExpanded={expandedProjects.includes(project.slug)}
              key={project.slug}
              language={language}
              onToggle={() => toggleProject(project.slug)}
              project={project}
              t={t}
            />
          ))}
        </div>

        {!isLoading && visibleProjects.length === 0 && (
          <p className="projects-page__state">{t('projectsPage.empty')}</p>
        )}
      </section>
    </main>
  );
}

function ProjectCard({
  details,
  isExpanded,
  language,
  onToggle,
  project,
  t,
}: {
  details?: ProjectPageDetails;
  isExpanded: boolean;
  language: Language;
  onToggle: () => void;
  project: Project;
  t: (key: TranslationKey) => string;
}) {
  const description = details?.longDescription ?? project.description;
  const shortDescription =
    description.length > 210
      ? `${description.slice(0, 210).trim()}...`
      : description;

  return (
    <article className="projects-page-card">
      <div className="projects-page-card__cover-wrap">
        <img
          className="projects-page-card__cover"
          src={details?.cover}
          alt={`${t('projects.altPreview')} ${project.title}`}
          width="640"
          height="360"
          decoding="async"
          loading="lazy"
        />
      </div>

      <div className="projects-page-card__body">
        <div className="projects-page-card__heading">
          <div>
            <p className="projects-page-card__role">{details?.role}</p>
            <h2>{project.title}</h2>
          </div>
          {project.featured && (
            <span className="projects-page-card__badge">
              <Sparkles size={14} strokeWidth={2.2} aria-hidden="true" />
              Featured
            </span>
          )}
        </div>

        <div className="projects-page-card__summary">
          <p className="projects-page-card__description">{shortDescription}</p>

          {description.length > 210 && (
            <button
              className="projects-page-card__more btn-reset"
              type="button"
              aria-expanded={isExpanded}
              onClick={onToggle}
            >
              {isExpanded
                ? t('projectsPage.hideDetails')
                : t('projectsPage.showDetails')}
            </button>
          )}
        </div>

        <div
          className={
            isExpanded
              ? 'projects-page-card__details projects-page-card__details--expanded'
              : 'projects-page-card__details'
          }
        >
          <div className="projects-page-card__details-inner">
            <p>{description}</p>
          </div>
        </div>

        <p className="projects-page-card__scope">{details?.scope}</p>

        <ul className="projects-page-card__highlights list-reset">
          {details?.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <ul className="projects-page-card__stack list-reset">
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="projects-page-card__footer">
          <p className="projects-page-card__meta">
            <GitCommit size={16} strokeWidth={2.1} aria-hidden="true" />
            {t('projects.updated')}:{' '}
            {formatCommitDate(project.pushedAt, language)}
          </p>

          <div className="projects-page-card__actions">
            <a
              className="projects-page-card__action"
              href={project.githubUrl}
              aria-label={`GitHub repository for ${project.title}`}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackPortfolioEvent('project_github_open', {
                  project: project.slug,
                  source: 'projects_page',
                })
              }
            >
              <GitBranch size={17} strokeWidth={2.1} aria-hidden="true" />
              GitHub
            </a>

            {project.demoUrl ? (
              <a
                className="projects-page-card__action projects-page-card__action--primary"
                href={project.demoUrl}
                aria-label={`Demo for ${project.title}`}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackPortfolioEvent('project_demo_open', {
                    project: project.slug,
                    source: 'projects_page',
                  })
                }
              >
                <ExternalLink size={17} strokeWidth={2.1} aria-hidden="true" />
                Demo
              </a>
            ) : (
              <span className="projects-page-card__status">
                {project.demoStatus === 'Демо требует backend'
                  ? t('projectStatus.backendRequired')
                  : (project.demoStatus ?? t('projectStatus.inProgress'))}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
