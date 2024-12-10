import { NextResponse } from 'next/server';

const setTokensInCookies = (response: NextResponse, access_token: string, refresh_token: string | null) => {
  response.cookies.set('access_token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 3600, // 1h
  });

  if (!refresh_token) return;

  response.cookies.set('refresh_token', refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 30 * 24 * 60 * 60, // 30days
  });
};

export default setTokensInCookies;
