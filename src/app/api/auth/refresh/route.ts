import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createTokens } from '@/lib/createToken';

export async function POST(req: NextRequest) {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

  if (!SECRET_KEY || !REFRESH_SECRET_KEY) {
    throw new Error('Missing secret keys in environment variables');
  }

  try {
    const { refresh_token }: { refresh_token?: { value: string } } = await req.json();

    if (!refresh_token) {
      return NextResponse.json({ error: 'Refresh token is missing' }, { status: 400 });
    }

    const decodedToken = jwt.verify(refresh_token?.value, REFRESH_SECRET_KEY) as jwt.JwtPayload;

    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }

    const { accessToken } = createTokens({
      email: decodedToken.email,
      authType: decodedToken.authType,
    });

    return NextResponse.json({ access_token: accessToken }, { status: 200 });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
