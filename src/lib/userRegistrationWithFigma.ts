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

  await console.log('---------------------');
  await dbConnect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    console.log('Пользователь с таким email найден:', existingUser);

    // Проверяем, совпадает ли figmaId
    if (existingUser.figmaId === id) {
      console.log('figmaId совпадает, никаких действий не требуется.');
    } else {
      console.log('figmaId не совпадает.');
      // Тут можно выполнить дополнительные действия, если необходимо
    }
  } else {
    console.log('Пользователь с таким email не найден.');
  }
};

export default userRegistrationWithFigma;
