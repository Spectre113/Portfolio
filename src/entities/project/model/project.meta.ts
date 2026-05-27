import {
  ProjectMetaListSchema,
  type ProjectMeta,
} from './project.schema.ts';

const rawProjectMeta = [
  {
    repositoryName: 'VK-marusya',
    slug: 'vk-marusya',
    title: 'VK Marusya',
    description: 'Голосовой помощник Маруся, часть экосистемы VK.',
    stack: ['React', 'TypeScript', 'SCSS'],
    featured: true,
    order: 1,
  },
  {
    repositoryName: 'VK-test',
    slug: 'vk-test',
    title: 'VK Test',
    description: 'Тестовое задание для VK, оформленное как личный проект.',
    stack: ['React', 'TypeScript', 'Vite'],
    featured: true,
    order: 2,
  },
  {
    repositoryName: 'Avito-task',
    slug: 'avito-task',
    title: 'Avito Task',
    description: 'Тестовое задание для Avito с фокусом на интерфейс и данные.',
    stack: ['TypeScript', 'React', 'Redux'],
    featured: true,
    order: 3,
  },
  {
    repositoryName: 'W-wave',
    slug: 'w-wave',
    title: 'W-Wave',
    description: 'Учебный лендинг студии с адаптивной версткой.',
    stack: ['HTML', 'SCSS', 'JavaScript'],
    featured: true,
    order: 4,
  },
  {
    repositoryName: 'TravelForge',
    slug: 'travelforge',
    title: 'TravelForge',
    description: 'Приложение для путешествий, маршрутов и планирования.',
    stack: ['React', 'TypeScript', 'Tailwind'],
    featured: true,
    order: 5,
  },
] satisfies ProjectMeta[];

export const projectMeta = ProjectMetaListSchema.parse(rawProjectMeta);
