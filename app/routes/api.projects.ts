import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { projectActions } from "@/services/serverActions";

/**
 * API route for projects
 * GET /api/v1/projects - Get all projects
 * GET /api/v1/projects/:key - Get project by key
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Extract key from pathname (e.g., /api/v1/projects/{key})
  // Remove /api/v1/projects prefix and get the key
  const key = pathname.replace('/api/v1/projects', '').replace(/^\//, '').split('?')[0];

  try {
    if (key && key.length > 0) {
      // Get single project by key
      const project = projectActions.getProjectByKey(key);
      return json(project);
    } else {
      // Get all projects
      const projects = projectActions.getProjects();
      return json(projects);
    }
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : 'Failed to fetch project' },
      { status: 404 }
    );
  }
}

// Disable POST/PUT for now
export async function action({ request }: ActionFunctionArgs) {
  return json(
    { error: 'POST/PUT requests are disabled' },
    { status: 405 }
  );
}
