import { describe, expect, it } from 'vitest';
import type { Project } from '../entities/project/model/project.schema.ts';
import { filterProjects } from './project-search.ts';

const projects = [
  {
    createdAt: '',
    description: 'Movie SPA with auth',
    featured: true,
    githubUrl: 'https://github.com/Spectre113/Marusya',
    order: 1,
    pushedAt: '2026-01-01T00:00:00Z',
    repositoryName: 'Marusya',
    slug: 'vk-marusya',
    stack: ['React', 'TypeScript', 'Zod'],
    stars: 0,
    title: 'VK Маруся',
    updatedAt: '',
  },
  {
    createdAt: '',
    description: 'Seller dashboard',
    featured: true,
    githubUrl: 'https://github.com/Spectre113/Avito-task',
    order: 2,
    pushedAt: '2026-01-01T00:00:00Z',
    repositoryName: 'Avito-task',
    slug: 'avito-task',
    stack: ['Forms', 'TanStack Query'],
    stars: 0,
    title: 'Avito Task',
    updatedAt: '',
  },
] satisfies Project[];

const detailsBySlug = {
  'avito-task': {
    category: ['frontend', 'test'],
    highlights: ['React Hook Form + Zod', 'поиск, фильтры и пагинация'],
    longDescription: 'Форма редактирования с валидацией и черновиками.',
    role: 'Тестовое задание',
    scope: 'Клиентский личный кабинет',
  },
  'vk-marusya': {
    category: ['frontend', 'pet'],
    highlights: ['авторизация', 'Zod для проверки входных данных'],
    longDescription: 'Поиск фильмов и личный кабинет пользователя.',
    role: 'Frontend SPA',
    scope: 'Маршруты, API и server state',
  },
};

describe('filterProjects', () => {
  it('filters projects by category', () => {
    const result = filterProjects({
      activeFilter: 'test',
      detailsBySlug,
      projects,
      searchQuery: '',
    });

    expect(result.map((project) => project.slug)).toEqual(['avito-task']);
  });

  it('searches project details and stack case-insensitively', () => {
    const result = filterProjects({
      activeFilter: 'all',
      detailsBySlug,
      projects,
      searchQuery: 'server state',
    });

    expect(result.map((project) => project.slug)).toEqual(['vk-marusya']);
  });

  it('combines category and text search', () => {
    const result = filterProjects({
      activeFilter: 'frontend',
      detailsBySlug,
      projects,
      searchQuery: 'react hook form',
    });

    expect(result.map((project) => project.slug)).toEqual(['avito-task']);
  });
});
