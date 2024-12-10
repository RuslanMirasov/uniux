import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

if (!SECRET_KEY || !REFRESH_SECRET_KEY) {
  throw new Error('Missing secret keys in environment variables');
}

interface IUser {
  email: string;
  authType: 'local' | 'figma';
}

export const createTokens = (user: IUser) => {
  const accessToken = jwt.sign({ email: user.email, authType: user.authType }, SECRET_KEY, { expiresIn: '1h' });

  const refreshToken = jwt.sign({ email: user.email, authType: user.authType }, REFRESH_SECRET_KEY, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};
