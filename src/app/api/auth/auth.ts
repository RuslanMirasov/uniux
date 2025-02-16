import type { AuthOptions, User, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { handleGoogleProfile, authorizeUser, getUserCustomFieldsById } from '@/lib/authHelpers';

// Расширенные типы
interface ExtendedUser extends User {
  id: string;
  subscribe?: boolean;
}

interface ExtendedJWT extends JWT {
  id: string;
  subscribe: boolean;
}

interface ExtendedSession extends Session {
  user: Session['user'] & {
    id: string;
    subscribe: boolean;
  };
}

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
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
  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      if (user) {
        token.id = (user as ExtendedUser).id;
        token.subscribe = (user as ExtendedUser).subscribe ?? false;
        if (account?.provider === 'credentials') {
          const expiresIn = 60 * 60 * 24 * 7;
          token.expires = new Date(Date.now() + expiresIn * 1000).toISOString();
        }
      } else if (!token.subscribe && typeof token.id === 'string') {
        const dbUser = await getUserCustomFieldsById(token.id);
        token.subscribe = dbUser?.subscribe ?? false;
      }

      return token as ExtendedJWT;
    },
    async session({ session, token }): Promise<Session> {
      return {
        ...session,
        user: {
          ...session.user,
          id: (token as ExtendedJWT).id,
          subscribe: (token as ExtendedJWT).subscribe,
        },
        expires: (token as ExtendedJWT).expires ?? session.expires,
      } as ExtendedSession;
    },
  },
};

export default NextAuth(authOptions);
