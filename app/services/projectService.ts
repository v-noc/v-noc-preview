
import { api } from '@/lib/api';
import API_ROUTES from '@/lib/apiRoutes';
import type { ProjectNode, ProjectNodeTree } from '@/types/project';



// API functions using the new client
export const fetchProjects = (): Promise<ProjectNode[]> => {
  return api(API_ROUTES.PROJECTS);
};

export const createProject = (newProject: { name: string; description: string; path: string }): Promise<ProjectNodeTree> => {
  // POST requests are disabled for now
  throw new Error('POST requests are disabled. Use static JSON files instead.');
};

export const deleteProject = (project_key: string) => {
  // DELETE requests are disabled for now
  throw new Error('DELETE requests are disabled. Use static JSON files instead.');
}