import { z } from 'zod';

export const repositories = [
  'VK-marusya',
  'VK-test',
  'Avito-task',
  'W-wave',
  'TravelForge',
];

export const RepoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.url(),
  updated_at: z.string(),
  created_at: z.string(),
});

export type Repo = z.infer<typeof RepoSchema>;

export const RepoListSchema = z.array(RepoSchema);

export type RepoList = z.infer<typeof RepoListSchema>;

async function fetchRepo(repo: string): Promise<Repo> {
  const response = await fetch(
    `https://api.github.com/repos/Spectre113/${repo}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch repository ${repo}`);
  }

  const data = await response.json();

  return RepoSchema.parse(data);
}

export async function fetchRepos(): Promise<RepoList> {
  const repos = await Promise.all(repositories.map((repo) => fetchRepo(repo)));

  return RepoListSchema.parse(repos);
}
