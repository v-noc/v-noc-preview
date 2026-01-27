import { type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { documentActions } from "@/services/serverActions";
import { addCorsHeaders, createCorsResponse } from "@/lib/cors";

/**
 * API route for documents
 * GET /api/v1/documents/:nodeId - Get documents for a node
 */
export async function loader({ request }: LoaderFunctionArgs) {
  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return createCorsResponse(request);
  }

  const url = new URL(request.url);
  const pathname = url.pathname;

  // Extract nodeId from pathname (e.g., /api/v1/documents/{nodeId})
  const nodeId = pathname.replace('/api/v1/documents', '').replace(/^\//, '').split('?')[0];

  if (!nodeId || nodeId.length === 0) {
    const response = Response.json({ error: 'Node ID is required' }, { status: 400 });
    return addCorsHeaders(response, request);
  }

  try {
    // Extract _key from nodeId (could be full ID like "nodes/xxx" or just "xxx")
    const key = nodeId.includes('/') ? nodeId.split('/').pop()! : nodeId;
    const documents = documentActions.getDocumentsByKey(key);
    const response = Response.json(documents);
    return addCorsHeaders(response, request);
  } catch (error) {
    const response = Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch documents' },
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
