import { NextResponse } from 'next/server';

const setTokensInCookies = (response: NextResponse, access_token: string, refresh_token: string) => {
  response.cookies.set('access_token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60, // 1 час
  });

  response.cookies.set('refresh_token', refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  });
};

export default setTokensInCookies;
