/**
 * Serves static assets from ./public with baseline security headers.
 * Add API routes here (e.g. form submissions) as the site grows.
 */
function withSecurityHeaders(response: Response): Response {
  if (response.status === 404) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // ASSETS does not map "/" to index.html when not_found_handling is "none".
    if (url.pathname === "/") {
      const indexRequest = new Request(
        new URL("/index.html", url),
        request
      );
      return withSecurityHeaders(await env.ASSETS.fetch(indexRequest));
    }

    return withSecurityHeaders(await env.ASSETS.fetch(request));
  },
} satisfies ExportedHandler<Env>;
