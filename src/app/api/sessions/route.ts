import { NextRequest, NextResponse } from 'next/server';
import { uploadVideo } from '@/lib/videoActions';
// import dbConnect from '@/lib/dbConnect';
// import Session from '@/models/Session';

export async function POST(req: NextRequest) {
  try {
    //  await dbConnect();
    const formData = await req.formData();
    const file = formData.get('video') || null;
    // const sessionData = formData.get('session');

    let sessionVideoUrl = null;

    if (file instanceof File) {
      sessionVideoUrl = await uploadVideo(file);
    }

    console.log('Видео загружено, вот Url :', sessionVideoUrl);

    return NextResponse.json({ message: 'Вывели данные в консоль' }, { status: 200 });
  } catch (error) {
    console.log('Create New Session ERROR: ', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
