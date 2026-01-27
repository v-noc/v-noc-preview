import { type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { codeActions } from "@/services/serverActions";

/**
 * API route for code
 * GET /api/v1/code-elements/:elementId/read-code - Get code for an element
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Extract elementId from pathname
  // Path format: /api/v1/code-elements/{elementId}/read-code
  const match = pathname.match(/\/code-elements\/([^/]+)/);
  const elementId = match?.[1];

  if (!elementId) {
    return Response.json({ error: 'Element ID is required' }, { status: 400 });
  }

  try {
    // Extract _key from elementId (could be full ID like "nodes/xxx" or just "xxx")
    const key = elementId.includes('/') ? elementId.split('/').pop()! : elementId;
    const code = codeActions.getCodeByKey(key);
    return Response.json(code);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch code' },
      { status: 404 }
    );
  }
}

// Disable POST/PUT for now
export async function action({ request }: ActionFunctionArgs) {
  return Response.json(
    { error: 'POST/PUT requests are disabled' },
    { status: 405 }
  );
}
