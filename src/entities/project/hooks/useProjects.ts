import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedProjects, fetchProjects } from '../api/projects.ts';

export const projectQueryKeys = {
  all: ['projects'] as const,
  featured: ['projects', 'featured'] as const,
};

export function useProjects() {
  return useQuery({
    queryKey: projectQueryKeys.all,
    queryFn: fetchProjects,
  });
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: projectQueryKeys.featured,
    queryFn: fetchFeaturedProjects,
  });
}
