import { projectMeta } from '../model/project.meta.ts';
import {
  GithubRepoSchema,
  type GithubRepo,
  type Project,
  type ProjectMeta,
} from '../model/project.schema.ts';

const GITHUB_OWNER = 'Spectre113';

async function fetchGithubRepo(repositoryName: string): Promise<GithubRepo> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${repositoryName}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch repository ${repositoryName}`);
  }

  const data: unknown = await response.json();

  return GithubRepoSchema.parse(data);
}

function mapProject(meta: ProjectMeta, repo: GithubRepo): Project {
  return {
    ...meta,
    githubUrl: repo.html_url,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    createdAt: repo.created_at,
    demoUrl: meta.demoUrl ?? repo.homepage ?? undefined,
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
