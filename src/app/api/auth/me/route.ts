import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { cookies } from 'next/headers';

interface FigmaUserData {
  id: string;
  email: string;
  handle?: string;
  img_url?: string;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  let currentUser = null;

  if (!token) {
    return NextResponse.json(currentUser, { status: 200 });
  }

  try {
    const userInfoResponse = await fetch('https://api.figma.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userInfoResponse.ok) {
      return NextResponse.json(
        { message: 'Error get user data', status: userInfoResponse.status },
        { status: userInfoResponse.status }
      );
    }

    const userInfo: FigmaUserData = (await userInfoResponse.json()) as FigmaUserData;

    currentUser = {
      email: userInfo.email,
      handle: userInfo.handle || null,
      img_url: userInfo.img_url || null,
      figmaId: userInfo.id,
      authType: 'figma',
      subscribe: false,
    };

    return NextResponse.json({ ...currentUser }, { status: 200 });
  } catch (error) {
    console.error('Error request to Figma API:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
