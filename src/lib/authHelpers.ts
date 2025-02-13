import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';
import User, { IUser } from '@/models/User';

interface CredentialsType {
  email: string;
  password: string;
}

export async function handleGoogleProfile(profile: { name: string; email: string; picture: string }) {
  await dbConnect();

  let user = await User.findOne({ email: profile.email });

  if (!user) {
    user = await User.create({
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      password: null,
      subscribe: false,
    });
  } else {
    const updateData: Partial<IUser> = {};

    if (!user.name) updateData.name = profile.name;
    if (!user.image) updateData.image = profile.picture;

    if (Object.keys(updateData).length > 0) {
      user = await User.findByIdAndUpdate(user._id, updateData, { new: true });
    }
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
  };
}

export async function authorizeUser(credentials: CredentialsType | undefined) {
  if (!credentials) throw new Error('Missing credentials');

  const { email, password } = credentials;

  await dbConnect();
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  if (!user.password || typeof user.password !== 'string') {
    throw new Error(
      'A user with this email has been registered with Google. Please login by clicking "Continue with Google" button.'
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name || null,
    image: user.image || null,
  };
}

export async function getUserCustomFieldsById(userId: string) {
  await dbConnect();
  const user = await User.findById(userId);
  return user ? { id: user._id.toString(), subscribe: user.subscribe } : null;
}
