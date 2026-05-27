import { z } from 'zod';

export const GithubRepoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.url(),
  homepage: z.string().nullable(),
  stargazers_count: z.number(),
  pushed_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  created_at: z.iso.datetime(),
});

export type GithubRepo = z.infer<typeof GithubRepoSchema>;

export const GithubRepoListSchema = z.array(GithubRepoSchema);

export const ProjectMetaSchema = z.object({
  repositoryName: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  stack: z.array(z.string()),
  featured: z.boolean(),
  order: z.number(),
  demoUrl: z.url().optional(),
  demoStatus: z.string().optional(),
});

export type ProjectMeta = z.infer<typeof ProjectMetaSchema>;

export const ProjectMetaListSchema = z.array(ProjectMetaSchema);

export const ProjectSchema = ProjectMetaSchema.extend({
  githubUrl: z.url(),
  stars: z.number(),
  pushedAt: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
