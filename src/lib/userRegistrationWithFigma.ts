import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

interface FigmaUserData {
  id: string;
  email: string;
  handle?: string;
  img_url?: string;
}

const userRegistrationWithFigma = async (data: FigmaUserData) => {
  const { id, email, handle, img_url } = data;
  console.log('data: ', data);

  await dbConnect();

  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.figmaId === id) return;

  if (existingUser) {
    existingUser.figmaId = id;
    existingUser.handle = handle;
    existingUser.img_url = img_url;
    existingUser.authType = 'figma';

    await existingUser.save();
    console.log('Пользователь обновлен');
  } else {
    const newUser = new User({
      email: email,
      handle: handle,
      img_url: img_url,
      figmaId: id,
      authType: 'figma',
    });

    await newUser.save();
    console.log('Новый пользователь создан');
  }
};

export default userRegistrationWithFigma;
