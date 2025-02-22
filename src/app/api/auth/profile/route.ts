import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function PATCH(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { name, currentpassword, newpassword, confirmpassword, subscribe, image } = await req.json();

  try {
    await dbConnect();
    const existingUser = await User.findOne({ email: session?.user?.email });

    if (!existingUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const updateData: Partial<typeof existingUser> = {};

    if (name && name !== existingUser.name) updateData.name = name;
    if (subscribe !== existingUser.subscribe) updateData.subscribe = subscribe;
    if (image && image !== existingUser.image) updateData.image = image;

    if (newpassword && newpassword === confirmpassword) {
      if (existingUser.password) {
        const isValidPassword = await existingUser.comparePassword(currentpassword);
        if (!isValidPassword) {
          return NextResponse.json(
            { message: '"Current password" does not match your account password' },
            { status: 400 }
          );
        }
      }
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newpassword, salt);
    }

    if (Object.keys(updateData).length > 0) {
      await User.findByIdAndUpdate(existingUser._id, updateData, { new: true });
    }

    return NextResponse.json({ message: 'User data is updated!' }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
