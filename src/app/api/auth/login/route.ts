import { NextRequest, NextResponse } from 'next/server';
import addTokenToCookie from '@/lib/addTokenToCookie';
import { createTokens } from '@/lib/createToken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { message: 'Invalid email or password, please check your data and try again' },
        { status: 401 }
      );
    }

    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password, please check your data and try again' },
        { status: 401 }
      );
    }

    const { accessToken, refreshToken } = createTokens({ email: existingUser.email, authType: existingUser.authType });

    const response = NextResponse.json({ message: 'You are loged in' }, { status: 200 });

    await addTokenToCookie(response, accessToken, refreshToken);

    return response;
  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
