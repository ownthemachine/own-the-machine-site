// Vercel Edge Middleware: password gate for the pre-launch preview.
// The whole site stays behind HTTP Basic Auth until Gate 1 clears; remove
// this file (and the PREVIEW_PASSWORD env var) at go-live.
export const config = { matcher: '/(.*)' };

export default function middleware(request: Request) {
  const expected = process.env.PREVIEW_PASSWORD;
  if (!expected) return; // no password configured: open (local dev)

  const auth = request.headers.get('authorization') || '';
  if (auth.startsWith('Basic ')) {
    try {
      const [, pass] = atob(auth.slice(6)).split(':');
      if (pass === expected) return; // authorised: fall through to the site
    } catch {
      /* malformed header: fall through to the 401 */
    }
  }
  return new Response('The machine is not yet public.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="own-the-machine preview"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
