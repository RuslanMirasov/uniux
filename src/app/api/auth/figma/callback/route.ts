import userRegistrationWithFigma from '@/lib/userRegistrationWithFigma';
import addTokenToCookie from '@/lib/addTokenToCookie';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

interface FigmaUserData {
  id: string;
  email: string;
  handle?: string;
  img_url?: string;
}

interface FigmaTokenData {
  access_token: string;
  refresh_token: string;
  error?: string;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const redirectAppUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://uniux.vercel.app';

  if (!code) {
    return NextResponse.redirect(`${redirectAppUrl}/login`);
  }

  const CLIENT_ID = process.env.FIGMA_CLIENT_ID;
  const CLIENT_SECRET = process.env.FIGMA_CLIENT_SECRET;
  const redirectUri = `${redirectAppUrl}/api/auth/figma/callback`;

  const tokenResponse = await fetch('https://api.figma.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
      code: code!,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  const tokenData: FigmaTokenData = (await tokenResponse.json()) as FigmaTokenData;

  if (tokenData.error) {
    return NextResponse.redirect(`${redirectAppUrl}/login`);
  }

  const { access_token, refresh_token } = tokenData;

  const userInfoResponse = await fetch('https://api.figma.com/v1/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const userInfo: FigmaUserData = (await userInfoResponse.json()) as FigmaUserData;
  await userRegistrationWithFigma(userInfo);

  const response = NextResponse.redirect(redirectAppUrl);

  await addTokenToCookie(response, access_token, refresh_token);

  return response;
}
