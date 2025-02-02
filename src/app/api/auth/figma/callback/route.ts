import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import addTokenToCookie from '@/lib/addTokenToCookie';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

interface FigmaTokenData {
  access_token: string;
  refresh_token: string;
  error?: string;
}

interface FigmaUserData {
  id: string;
  email: string;
  handle?: string;
  img_url?: string;
}

export async function GET(request: Request) {
  await dbConnect();

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const redirectAppUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!redirectAppUrl) {
    throw new Error('Missing NEXT_PUBLIC_APP_URL in environment variables');
  }

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

  // Получаем информацию о пользователе из Figma API
  const userResponse = await fetch('https://api.figma.com/v1/me', {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const userData: FigmaUserData = (await userResponse.json()) as FigmaUserData;

  const { id: figmaId, email, handle, img_url } = userData;
  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      email,
      handle,
      img_url,
      figmaId,
      authType: 'figma',
    });
    await user.save();
  } else if (!user.figmaId) {
    user.figmaId = figmaId;
    user.authType = 'figma';
    user.img_url = !user.img_url ? img_url : null;
    user.handle = !user.handle ? handle : null;
    await user.save();
  }
  const response = NextResponse.redirect(redirectAppUrl);

  await addTokenToCookie(response, access_token, refresh_token);

  return response;
}
