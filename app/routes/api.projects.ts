import { type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { projectActions } from "@/services/serverActions";
import { addCorsHeaders, createCorsResponse } from "@/lib/cors";

/**
 * API route for projects
 * GET /api/v1/projects - Get all projects
 * GET /api/v1/projects/:key - Get project by key
 */
export async function loader({ request }: LoaderFunctionArgs) {
  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return createCorsResponse(request);
  }

  const url = new URL(request.url);
  const pathname = url.pathname;

  // Extract key from pathname (e.g., /api/v1/projects/{key})
  // Remove /api/v1/projects prefix and get the key
  const key = pathname.replace('/api/v1/projects', '').replace(/^\//, '').split('?')[0];

  try {
    let response: Response;
    if (key && key.length > 0) {
      // Get single project by key
      const project = projectActions.getProjectByKey(key);
      response = Response.json(project);
    } else {
      // Get all projects
      const projects = projectActions.getProjects();
      response = Response.json(projects);
    }
    return addCorsHeaders(response, request);
  } catch (error) {
    const response = Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch project' },
      { status: 404 }
    );
    return addCorsHeaders(response, request);
  }
}

// Disable POST/PUT for now
export async function action({ request }: ActionFunctionArgs) {
  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return createCorsResponse(request);
  }

  const response = Response.json(
    { error: 'POST/PUT requests are disabled' },
    { status: 405 }
  );
  return addCorsHeaders(response, request);
}
