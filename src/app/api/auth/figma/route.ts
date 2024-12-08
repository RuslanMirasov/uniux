import { NextResponse } from 'next/server';

export async function GET() {
  const CLIENT_ID = process.env.FIGMA_CLIENT_ID;
  const redirectUri = 'http://localhost:3000/api/auth/figma/callback';

  const authUrl = `https://www.figma.com/oauth?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=file_read&state=state&response_type=code`;

  return NextResponse.redirect(authUrl);
}
