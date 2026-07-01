import { ProjectMetaListSchema, type ProjectMeta } from './project.schema.ts';

const rawProjectMeta = [
  {
    repositoryName: 'Marusya',
    slug: 'vk-marusya',
    title: 'VK Маруся',
    description:
      'Frontend SPA для поиска фильмов, просмотра карточек, работы с жанрами и личным кабинетом пользователя.',
    stack: ['Movie SPA', 'TanStack', 'Zod', 'Auth'],
    featured: true,
    order: 1,
    demoUrl: 'https://spectre113.github.io/Marusya/',
    lastCommitAt: '2026-04-28T11:25:29Z',
  },
  {
    repositoryName: 'Portfolio',
    slug: 'portfolio',
    title: 'Portfolio',
    description:
      'Персональный сайт-портфолио с современной архитектурой, темами, анимациями и аккуратным data layer.',
    stack: ['React', 'Themes', 'Typewriter', 'Zod'],
    featured: true,
    order: 2,
    lastCommitAt: '2026-05-28T04:06:31Z',
  },
  {
    repositoryName: 'Avito-task',
    slug: 'avito-task',
    title: 'Avito Task',
    description:
      'Личный кабинет продавца: объявления, карточки, редактирование и AI-рекомендации для описания и цены.',
    stack: ['Ollama AI', 'Forms', 'Zod', 'TanStack'],
    featured: true,
    order: 3,
    demoStatus: 'Демо требует backend',
    lastCommitAt: '2026-03-25T20:13:06Z',
  },
  {
    repositoryName: 'VK-test',
    slug: 'vk-test',
    title: 'VK Test',
    description:
      'Тестовое задание для VK: сайт с котиками, избранным и бесконечной подгрузкой карточек.',
    stack: ['Cat API', 'Favorites', 'Infinite scroll'],
    featured: true,
    order: 4,
    demoUrl: 'https://spectre113.github.io/VK-test/',
    lastCommitAt: '2026-04-10T08:49:32Z',
  },
  {
    repositoryName: 'W-wave',
    slug: 'w-wave',
    title: 'W-Wave',
    description:
      'Статический сайт радиостанции с адаптивной версткой, интерактивностью и БЭМ-структурой.',
    stack: ['BEM', 'Swiper', 'Choices.js', 'Forms'],
    featured: false,
    order: 5,
    demoUrl: 'https://spectre113.github.io/W-wave/',
    lastCommitAt: '2026-04-27T16:11:17Z',
  },
  {
    repositoryName: 'TravelForge',
    slug: 'travelforge',
    title: 'TravelForge',
    description:
      'Приложение для планирования поездок с бюджетом, предпочтениями, картой и TravelBot.',
    stack: ['TravelBot', 'Budget UI', 'REST API', 'Map'],
    featured: false,
    order: 6,
    demoStatus: 'Демо недоступно',
    lastCommitAt: '2026-04-20T07:28:46Z',
  },
] satisfies ProjectMeta[];

export const projectMeta = ProjectMetaListSchema.parse(rawProjectMeta);
