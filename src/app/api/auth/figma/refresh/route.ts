import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { refresh_token }: { refresh_token?: { value: string } } = await req.json();

    console.log('refresh_token: ', refresh_token);

    if (!refresh_token) {
      return NextResponse.json({ error: 'Refresh token is missing' }, { status: 400 });
    }

    const response = await fetch('https://www.figma.com/api/oauth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.FIGMA_CLIENT_ID,
        client_secret: process.env.FIGMA_CLIENT_SECRET,
        refresh_token: refresh_token.value,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      console.log('Failed to refresh token: ', errorData);

      return NextResponse.json({ error: 'Failed to refresh token', details: errorData }, { status: response.status });
    }

    const { access_token, refresh_token: new_refresh_token, expires_in } = await response.json();

    console.log('response: ', response);

    return NextResponse.json({
      access_token,
      refresh_token: new_refresh_token,
      expires_in,
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
