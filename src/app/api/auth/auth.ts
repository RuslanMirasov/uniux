import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { handleGoogleProfile, authorizeUser } from '@/lib/authHelpers';

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 604800, // 7 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
      profile: handleGoogleProfile,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: authorizeUser,
    }),
  ],
};

export default NextAuth(authOptions);
