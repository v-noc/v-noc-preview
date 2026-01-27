import { type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { documentActions } from "@/services/serverActions";

/**
 * API route for documents
 * GET /api/v1/documents/:nodeId - Get documents for a node
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Extract nodeId from pathname (e.g., /api/v1/documents/{nodeId})
  const nodeId = pathname.replace('/api/v1/documents', '').replace(/^\//, '').split('?')[0];

  if (!nodeId || nodeId.length === 0) {
    return Response.json({ error: 'Node ID is required' }, { status: 400 });
  }

  try {
    // Extract _key from nodeId (could be full ID like "nodes/xxx" or just "xxx")
    const key = nodeId.includes('/') ? nodeId.split('/').pop()! : nodeId;
    const documents = documentActions.getDocumentsByKey(key);
    return Response.json(documents);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch documents' },
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
