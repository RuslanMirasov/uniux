import { NextRequest, NextResponse } from 'next/server';

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

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (PUBLIC_ROUTES_REGEX.some(regex => regex.test(url.pathname))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('access_token');

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', url.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'],
};
