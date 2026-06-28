import type { Project } from '../entities/project/model/project.schema.ts';

export type ProjectSearchDetails = {
  category: string[];
  highlights: string[];
  longDescription: string;
  role: string;
  scope: string;
};

export function getProjectSearchText(
  project: Project,
  details?: ProjectSearchDetails,
) {
  return [
    project.title,
    project.description,
    project.repositoryName,
    project.stack.join(' '),
    details?.role,
    details?.scope,
    details?.longDescription,
    details?.highlights.join(' '),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function filterProjects({
  activeFilter,
  detailsBySlug,
  projects,
  searchQuery,
}: {
  activeFilter: string;
  detailsBySlug: Record<string, ProjectSearchDetails>;
  projects: Project[];
  searchQuery: string;
}) {
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) =>
          detailsBySlug[project.slug]?.category.includes(activeFilter),
        );

  if (!normalizedSearchQuery) {
    return filteredProjects;
  }

  return filteredProjects.filter((project) =>
    getProjectSearchText(project, detailsBySlug[project.slug]).includes(
      normalizedSearchQuery,
    ),
  );
}
