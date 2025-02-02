import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

interface DecodedToken {
  email: string;
  authType: 'local' | 'figma';
  exp?: number;
}

export async function GET() {
  await dbConnect(); // Подключаем базу данных

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value; // Используем правильное имя куки

  if (!token) {
    return NextResponse.json(null, { status: 200 });
  }

  try {
    let user;

    if (token.startsWith('figu_')) {
      const figmaResponse = await fetch('https://api.figma.com/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!figmaResponse.ok) {
        return NextResponse.json({ message: 'Failed to fetch Figma user data' }, { status: 401 });
      }

      const figmaData = await figmaResponse.json();
      const figmaId = figmaData.id; // Получаем figmaId

      if (!figmaId) {
        return NextResponse.json({ message: 'Invalid Figma response' }, { status: 401 });
      }

      user = await User.findOne({ authType: 'figma', figmaId });

      if (!user) {
        console.log('Figma user not found in database');
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as DecodedToken;

      if (!decodedToken.email || !decodedToken.authType) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
      }

      user = await User.findOne({ email: decodedToken.email, authType: decodedToken.authType });

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
    }

    const currentUser = {
      id: user.id,
      email: user.email,
      handle: user.handle || null,
      img_url: user.img_url || null,
      figmaId: user.figmaId || null,
      authType: user.authType,
      subscribe: user.subscribe,
    };

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
