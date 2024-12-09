import { NextRequest, NextResponse } from 'next/server';
import addTokenToCookie from '@/lib/addTokenToCookie';

const PUBLIC_ROUTES_REGEX = [
  /^\/login/,
  /^\/reset-password/,
  /^\/sign-up/,
  /^\/policy/,
  /^\/uniux-tos/,
  /^\/404/,
  /^\/500/,
  /^\/api\//,
];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const access_token = request.cookies.get('access_token');
  const refresh_token = request.cookies.get('refresh_token');

  if (PUBLIC_ROUTES_REGEX.some(regex => regex.test(url.pathname))) {
    return NextResponse.next();
  }

  if (access_token) {
    return NextResponse.next();
  }

  if (refresh_token) {
    const refreshResponse = await fetch(`${url.origin}/api/auth/figma/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token }),
    });

    if (refreshResponse.ok) {
      const { access_token } = await refreshResponse.json();

      const response = NextResponse.next();
      await addTokenToCookie(response, access_token, null);

      return response;
    }
  }

  return NextResponse.redirect(new URL('/login', url.origin));
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|css|js|pdf|woff|woff2|json)).*)'],
};
