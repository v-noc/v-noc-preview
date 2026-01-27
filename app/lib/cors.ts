/**
 * CORS helper functions for API routes
 */

const ALLOWED_ORIGINS = [
  'https://vnoc.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5174',
];

/**
 * Get CORS headers for a request
 */
export function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('origin');
  const isAllowedOrigin = origin && ALLOWED_ORIGINS.includes(origin);
  
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400', // 24 hours
  };
}

/**
 * Create a CORS response for preflight OPTIONS requests
 */
export function createCorsResponse(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

/**
 * Add CORS headers to a Response
 */
export function addCorsHeaders(response: Response, request: Request): Response {
  const headers = new Headers(response.headers);
  const corsHeaders = getCorsHeaders(request);
  
  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
