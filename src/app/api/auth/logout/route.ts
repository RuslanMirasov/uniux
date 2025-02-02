import { NextResponse } from 'next/server';
import { serialize, SerializeOptions } from 'cookie';

export async function GET() {
  const response = NextResponse.json({ success: true });
  const settings: SerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
  };

  response.headers.append('Set-Cookie', serialize('access_token', '', settings));
  response.headers.append('Set-Cookie', serialize('refresh_token', '', settings));

  return response;
}
