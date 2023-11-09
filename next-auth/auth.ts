
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  
} from "next-auth";

import GoogleProvider, { } from 'next-auth/providers/google';
import { env } from "@/env.mjs";

export const authOptions: NextAuthOptions = {
secret: process.env.NEXTAUTH_SECRET ?? 'secret',
providers: [
  GoogleProvider({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
], 
};

export const getServerAuthSession = () => getServerSession(authOptions);
