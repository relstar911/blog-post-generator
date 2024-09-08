import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

// Extend the Session and JWT interfaces to include the user id
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id: string;
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (res.data.user) {
            return res.data.user;
          }
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
