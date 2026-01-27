import { type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { codeActions } from "@/services/serverActions";
import { addCorsHeaders, createCorsResponse } from "@/lib/cors";

/**
 * API route for code
 * GET /api/v1/code-elements/:elementId/read-code - Get code for an element
 */
export async function loader({ request }: LoaderFunctionArgs) {
  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return createCorsResponse(request);
  }

  const url = new URL(request.url);
  const pathname = url.pathname;

  // Extract elementId from pathname
  // Path format: /api/v1/code-elements/{elementId}/read-code
  const match = pathname.match(/\/code-elements\/([^/]+)/);
  const elementId = match?.[1];

  if (!elementId) {
    const response = Response.json({ error: 'Element ID is required' }, { status: 400 });
    return addCorsHeaders(response, request);
  }

  try {
    // Extract _key from elementId (could be full ID like "nodes/xxx" or just "xxx")
    const key = elementId.includes('/') ? elementId.split('/').pop()! : elementId;
    const code = codeActions.getCodeByKey(key);
    const response = Response.json(code);
    return addCorsHeaders(response, request);
  } catch (error) {
    const response = Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch code' },
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
