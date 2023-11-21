import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    async authorized({ request: { nextUrl }, auth }) {
      console.log('Auhtorized', auth);
      const isSignPage = nextUrl.pathname === '/signup';
      if (isSignPage) return true;
      const isLoggedIn = !!auth?.user;

      if (!isLoggedIn && nextUrl.pathname !== '/') {
        return Response.redirect(new URL('/', nextUrl));
      }

      // Redirect unauthenticated users to the sign-in page
      if (!isLoggedIn && nextUrl.pathname === '/') {
        return true; // Allow access to the sign-in page if not logged in
      }

      // If the user is logged in and tries to access the sign-in page, redirect them
      if (isLoggedIn && nextUrl.pathname === '/') {
        return Response.redirect(new URL('/dashboard', nextUrl)); // Redirect to the notes or another appropriate page
      }

      // For all other cases, allow the user to access the requested URL
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
