import { projectMeta } from '../model/project.meta.ts';
import {
  GithubRepoSchema,
  type GithubRepo,
  type Project,
  type ProjectMeta,
} from '../model/project.schema.ts';

const GITHUB_OWNER = 'Spectre113';

async function fetchGithubRepo(
  repositoryName: string,
): Promise<GithubRepo | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${repositoryName}`,
    );

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();

    return GithubRepoSchema.parse(data);
  } catch {
    return null;
  }
}

function mapProject(meta: ProjectMeta, repo: GithubRepo | null): Project {
  return {
    ...meta,
    githubUrl: repo?.html_url ?? `https://github.com/${GITHUB_OWNER}/${meta.repositoryName}`,
    stars: repo?.stargazers_count ?? 0,
    pushedAt: repo?.pushed_at ?? meta.lastCommitAt ?? '',
    updatedAt: repo?.updated_at ?? '',
    createdAt: repo?.created_at ?? '',
    demoUrl: meta.demoUrl ?? repo?.homepage ?? undefined,
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const repos = await Promise.all(
    projectMeta.map((project) => fetchGithubRepo(project.repositoryName)),
  );

  return projectMeta
    .map((meta, index) => mapProject(meta, repos[index]))
    .sort((first, second) => first.order - second.order);
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  const projects = await fetchProjects();

  return projects.filter((project) => project.featured);
}
