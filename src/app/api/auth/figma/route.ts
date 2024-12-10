import { NextResponse } from 'next/server';

export async function GET() {
  const CLIENT_ID = process.env.FIGMA_CLIENT_ID;
  const redirectAppUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!redirectAppUrl || !CLIENT_ID) {
    throw new Error('Missing NEXT_PUBLIC_APP_URL or FIGMA_CLIENT_ID in environment variables');
  }

  const redirectUri = `${redirectAppUrl}/api/auth/figma/callback`;

  const authUrl = `https://www.figma.com/oauth?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=file_read&state=state&response_type=code`;

  return NextResponse.redirect(authUrl);
}
