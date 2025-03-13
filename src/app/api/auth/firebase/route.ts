import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import admin from '@/lib/firebase/firebase-admin';

export async function GET(req: Request) {
  const session = await getServerSession();
  if (!session || !session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Missing user ID' }, { status: 400 });
  }

  const customToken = await admin.auth().createCustomToken(id);

  return NextResponse.json({ token: customToken });
}
