import { getServerSession } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { ensurePortalProfileForUser } from "@/lib/portal-profile";

const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "";

export function isGoogleAuthEnabled() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && authSecret);
}

export const authOptions = {
  secret: authSecret || undefined,
  providers: isGoogleAuthEnabled()
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
      ]
    : [],
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        try {
          await ensurePortalProfileForUser({ account, user });
        } catch (error) {
          console.error("Unable to sync Google user into Supabase.", error);
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }

      if (user?.name) {
        token.name = user.name;
      }

      if (user?.email) {
        token.email = user.email;
      }

      if (user?.image) {
        token.picture = user.image;
      }

      return token;
    },

    async redirect({ baseUrl, url }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      try {
        const targetUrl = new URL(url);

        if (targetUrl.origin === baseUrl) {
          return url;
        }
      } catch {}

      return `${baseUrl}/dashboard`;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id;
        session.user.email = token.email ?? session.user.email;
        session.user.image = token.picture ?? session.user.image;
      }

      return session;
    }
  }
};

export const nextAuthHandler = NextAuth(authOptions);

export function getServerAuthSession() {
  return getServerSession(authOptions);
}
