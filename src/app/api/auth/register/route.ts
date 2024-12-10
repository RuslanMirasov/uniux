import { NextRequest, NextResponse } from 'next/server';
import addTokenToCookie from '@/lib/addTokenToCookie';
import { createTokens } from '@/lib/createToken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password, subscribe } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const newUser = await User.create({
      email,
      password,
      figmaId: null,
      subscribe: subscribe || false,
    });

    const { accessToken, refreshToken } = createTokens({ email: newUser.email, authType: newUser.authType });

    const response = NextResponse.json({ message: 'New accaunt is created' }, { status: 200 });

    await addTokenToCookie(response, accessToken, refreshToken);

    return response;
  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
