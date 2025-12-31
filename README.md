## 308 Permanent Redirect (next.config.mjs)

Use `next.config.mjs` for static, permanent redirects. This is the most performant approach for known path changes (example: migrating from an old URL structure).

**File:** `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/news/:slug',
        permanent: true, // true = 308 Permanent Redirect
      },
      {
        source: '/legacy-page',
        destination: '/new-page',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

```
## Notes and best practices

- **Prefer `next.config.mjs` redirects for SEO migrations (308):**  
  If the mapping is known upfront (old path to new path), `redirects()` in `next.config.mjs` is usually the best option. It is fast, simple, and works well for permanent URL changes.

- **Use Middleware only when redirects are dynamic:**  
  Middleware runs on every matched request at the edge/runtime layer, so it can add overhead if overused. Keep logic minimal and avoid heavy computation, large imports, or slow external calls.

- **Middleware is sensitive, keep it lightweight:**  
  Small mistakes can impact your whole site because middleware may execute for many routes. Always:
  - Limit the matcher scope
  - Keep conditions short and readable
  - Avoid database calls, big SDKs, or long blocking operations
  - Test on staging before production

- **Only Middleware can return a true `410 Gone` for pages (practical in Next.js):**  
  `next.config.mjs` redirects only support redirect responses (3xx). It cannot serve a `410` status.  
  For explicit SEO removal, Middleware is the clean approach because you can return a real `410 Gone` response for deleted paths (better than a soft 404).

- **Use `410 Gone` when content is permanently removed:**  
  This tells search engines the page is intentionally deleted and should be dropped faster from indexing.

- **Avoid redirect chains:**  
  Do not do `/a -> /b -> /c`. Redirect old URLs directly to the final canonical URL.

- **Keep maintenance redirects temporary (307):**  
  Maintenance mode should usually be temporary so search engines do not treat it as a permanent move.

- **Route Handlers are best when redirects are endpoint-specific:**  
  Use Route Handlers (example: `src/app/api/.../route.ts`) when you need to redirect from a specific endpoint only, return a specific status like 307 or 308, or do logic based on request headers, query params, or server-side checks. This keeps redirect logic scoped to that route instead of affecting the whole site like Middleware.

  Anything can refer to documentation https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects
