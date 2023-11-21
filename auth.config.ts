import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user.role;
      console.log('Log', role);
      const validPath =
        nextUrl.pathname.startsWith('/admin') ||
        nextUrl.pathname.startsWith('/student');
      if (validPath) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (role === 'admin' && nextUrl.pathname.startsWith('/admin')) {
          return true;
        } else if (
          role === 'student' &&
          nextUrl.pathname.startsWith('/student')
        ) {
          return false;
        }
        return Response.redirect(
          new URL(
            role === 'admin' ? '/admin/dashboard' : '/student/dashboard',
            nextUrl
          )
        );
      }
      return true;
    },
    async jwt({ token, user, profile, session, account }) {
      if (user) {
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ user, session, token }) {
      session.user.id = token.sub as string;
      session.user.role = (token.role as string) || null;
      return session;
    },
  },
} satisfies NextAuthConfig;
