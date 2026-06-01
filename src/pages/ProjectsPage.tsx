import { useMemo, useState } from 'react';
import {
  Bot,
  ExternalLink,
  FolderGit2,
  GitBranch,
  GitCommit,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { useProjects } from '../entities/project/hooks/useProjects.ts';
import type { Project } from '../entities/project/model/project.schema.ts';
import avitoCover from '../assets/Avito-test.png';
import marusyaCover from '../assets/Marusya.png';
import portfolioCover from '../assets/Portfolio.png';
import travelForgeCover from '../assets/TravelForge.png';
import vkTestCover from '../assets/VK-test.png';
import wWaveCover from '../assets/W-wave.png';
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

const projectDetails: Record<string, ProjectPageDetails> = {
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

const filters: Array<{ id: ProjectFilter; label: string }> = [
  { id: 'all', label: 'Все' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'test', label: 'Тестовые' },
  { id: 'pet', label: 'Pet-проекты' },
];

function formatCommitDate(date: string) {
  if (!date) {
    return 'дата недоступна';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function ProjectsPage() {
  const { data: projects = [], isError, isLoading } = useProjects();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects;
    }

    return projects.filter((project) =>
      projectDetails[project.slug]?.category.includes(activeFilter),
    );
  }, [activeFilter, projects]);

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
            Проекты
          </p>

          <h1 className="projects-page__title">Проекты</h1>

          <p className="projects-page__lead">
            Здесь собраны учебные работы, тестовые задания и pet-проекты, в
            которых виден мой подход к frontend-разработке: архитектура, работа
            с данными, состояния интерфейса и внимание к деталям.
          </p>
        </div>

        <div className="projects-page__hero-card" aria-hidden="true">
          <FolderGit2 size={34} strokeWidth={1.9} />
          <span>case studies</span>
        </div>
      </section>

      <section className="container projects-page__toolbar">
        <label className="projects-page__ai-field">
          <Bot size={20} strokeWidth={2.1} aria-hidden="true" />
          <input
            readOnly
            value=""
            placeholder="AI-поиск по проектам: например, “где есть Zod и server state?”"
            aria-label="AI-поиск по проектам"
          />
          <span>скоро</span>
        </label>

        <div className="projects-page__filters" aria-label="Фильтр проектов">
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
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-page__sort" aria-hidden="true">
          <SlidersHorizontal size={18} strokeWidth={2.1} />
          Сортировка: вручную
        </div>
      </section>

      <section className="container projects-page__grid-section">
        {isLoading && (
          <p className="projects-page__state">Загружаю данные проектов...</p>
        )}

        {isError && (
          <p className="projects-page__state">
            GitHub сейчас не ответил, поэтому показываю локальные описания.
          </p>
        )}

        <div className="projects-page__grid">
          {visibleProjects.map((project) => (
            <ProjectCard
              isExpanded={expandedProjects.includes(project.slug)}
              key={project.slug}
              project={project}
              onToggle={() => toggleProject(project.slug)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function ProjectCard({
  isExpanded,
  onToggle,
  project,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  project: Project;
}) {
  const details = projectDetails[project.slug];
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
          alt={`Превью проекта ${project.title}`}
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
              {isExpanded ? 'Скрыть детали' : 'Показать подробнее'}
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
            Последний коммит: {formatCommitDate(project.pushedAt)}
          </p>

          <div className="projects-page-card__actions">
            <a
              className="projects-page-card__action"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch size={17} strokeWidth={2.1} aria-hidden="true" />
              GitHub
            </a>

            {project.demoUrl ? (
              <a
                className="projects-page-card__action projects-page-card__action--primary"
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={17} strokeWidth={2.1} aria-hidden="true" />
                Demo
              </a>
            ) : (
              <span className="projects-page-card__status">
                {project.demoStatus ?? 'В разработке'}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
