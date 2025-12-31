// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 410 Gone paths (permanently removed)
const GONE_PATHS = [
  '/campaigns/expired-offer',
  '/products/discontinued-item',
];

function handleGonePaths(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (GONE_PATHS.some((path) => pathname.startsWith(path))) {
    return new NextResponse(null, { status: 410, statusText: 'Gone' });
  }

  return null;
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) 410 Gone (highest priority)
  const goneResponse = handleGonePaths(req);
  if (goneResponse) return goneResponse;

  // 2) 307 Temporary Redirect (maintenance mode)
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  // Redirect users to maintenance page if active
  if (isMaintenanceMode && !pathname.startsWith('/maintenance')) {
    // Defaults to 307 Temporary Redirect
    return NextResponse.redirect(new URL('/maintenance', req.url));
  }

  // Redirect back to home if maintenance is OFF but user visits /maintenance
  if (!isMaintenanceMode && pathname.startsWith('/maintenance')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Continue to other middleware logic (example: auth, i18n)
  return NextResponse.next();
}

export const config = {
  // Match all paths except api, static files, images
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
