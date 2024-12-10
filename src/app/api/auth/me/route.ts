import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

interface FigmaUserData {
  id: string;
  email: string;
  handle?: string;
  authType?: string;
  img_url?: string;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  let currentUser = null;

  if (!token) {
    return NextResponse.json(currentUser, { status: 200 });
  }

  const decodedToken = jwt.decode(token) as { email?: string; authType?: string };

  try {
    if (decodedToken?.email && decodedToken?.authType) {
      await dbConnect();
      const userFromDb = await User.findOne({ email: decodedToken.email, authType: decodedToken.authType });

      currentUser = {
        email: userFromDb.email,
        handle: userFromDb.handle || null,
        img_url: userFromDb.img_url || null,
        figmaId: userFromDb._id,
        authType: 'local',
        subscribe: userFromDb.subscribe,
      };

      // Если пользователя не нашли, возвращаем ошибку
      if (!userFromDb) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
    } else {
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
        authType: userInfo.authType || 'figma',
        subscribe: false,
      };
    }

    console.log(currentUser);

    return NextResponse.json({ ...currentUser }, { status: 200 });
  } catch (error) {
    console.error('Error request to Figma API:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
