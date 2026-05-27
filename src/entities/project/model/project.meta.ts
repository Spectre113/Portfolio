import {
  ProjectMetaListSchema,
  type ProjectMeta,
} from './project.schema.ts';

const rawProjectMeta = [
  {
    repositoryName: 'VK-marusya',
    slug: 'vk-marusya',
    title: 'VK Маруся',
    description:
      'Frontend SPA для поиска фильмов, просмотра карточек, работы с жанрами и личным кабинетом пользователя.',
    stack: ['React', 'TypeScript', 'Zod', 'TanStack'],
    featured: true,
    order: 1,
    demoUrl: 'https://spectre113.github.io/Marusya/',
  },
  {
    repositoryName: 'Portfolio',
    slug: 'portfolio',
    title: 'Portfolio',
    description:
      'Персональный сайт-портфолио с современной архитектурой, темами, анимациями и аккуратным data layer.',
    stack: ['React', 'TypeScript', 'Vite', 'TanStack'],
    featured: true,
    order: 2,
  },
  {
    repositoryName: 'Avito-task',
    slug: 'avito-task',
    title: 'Avito Task',
    description:
      'Личный кабинет продавца: объявления, карточки, редактирование и AI-рекомендации для описания и цены.',
    stack: ['React', 'AI integration', 'React Hook Form'],
    featured: true,
    order: 3,
    demoStatus: 'Демо требует backend',
  },
  {
    repositoryName: 'VK-test',
    slug: 'vk-test',
    title: 'VK Test',
    description:
      'Тестовое задание для VK: сайт с котиками, избранным и бесконечной подгрузкой карточек.',
    stack: ['Infinite scroll', 'React', 'TypeScript'],
    featured: true,
    order: 4,
    demoUrl: 'https://spectre113.github.io/VK-test/',
  },
  {
    repositoryName: 'W-wave',
    slug: 'w-wave',
    title: 'W-Wave',
    description: 'Учебный лендинг студии с адаптивной версткой.',
    stack: ['HTML', 'SCSS', 'JavaScript'],
    featured: false,
    order: 5,
    demoUrl: 'https://spectre113.github.io/W-wave/',
  },
  {
    repositoryName: 'TravelForge',
    slug: 'travelforge',
    title: 'TravelForge',
    description: 'Приложение для путешествий, маршрутов и планирования.',
    stack: ['React', 'TypeScript', 'Tailwind'],
    featured: false,
    order: 6,
    demoUrl: 'http://travelforge.213-165-209-28.nip.io/',
  },
] satisfies ProjectMeta[];

export const projectMeta = ProjectMetaListSchema.parse(rawProjectMeta);
