import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import { logger } from '../../utils/logger'; // Ensure this path is correct

// Extend the Session and JWT interfaces
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }

  interface JWT {
    id: string;
    accessToken?: string;
  }
}

// Extend the PagesOptions type
import { PagesOptions } from 'next-auth';
import { NextApiRequest } from "next";
interface CustomPagesOptions extends Partial<PagesOptions> {
  signUp?: string;
}

// Extend the AuthOptions type to use CustomPagesOptions
interface CustomAuthOptions extends Omit<NextAuthOptions, 'pages'> {
  pages?: CustomPagesOptions;
}

// Extend the User type
interface CustomUser extends User {
  token?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        
        const isNewUser = (credentials as any).isNewUser === 'true';
        
        try {
          const endpoint = isNewUser ? '/auth/signup' : '/auth/login';
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            name: isNewUser ? (credentials as any).name : undefined,
            email: credentials.email,
            password: credentials.password,
          });

          if (res.data.user) {
            logger.info('User authenticated successfully', { userId: res.data.user.id, isNewUser });
            return { ...res.data.user, accessToken: res.data.token };
          }
          logger.warn('Authentication failed: No user data in response', { email: credentials.email });
          return null;
        } catch (error) {
          logger.error(error as Error, req as NextApiRequest);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = (user as CustomUser).token;
        logger.info('JWT callback: Token updated with user data', { userId: user.id });
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
        logger.info('Session callback: Session updated with token data', { userId: session.user.id });
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/signup' // New users will be directed here on first sign in
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, metadata) {
      logger.error(new Error(`NextAuth Error: ${code}`), metadata as unknown as NextApiRequest);
    },
    warn(code) {
      logger.warn(`NextAuth Warning: ${code}`);
    },
    debug(code, metadata) {
      logger.info(`NextAuth Debug: ${code}`, metadata);
    }
  }
};

export default NextAuth(authOptions);