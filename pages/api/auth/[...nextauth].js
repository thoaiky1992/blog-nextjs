import { connectDB } from "@/libraries/db-connect";
import { User } from "@/models/user";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { getSession } from "next-auth/react";
import bcryptjs from "bcryptjs";
import { SESSION_MAX_AGE } from "@/constants";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "thoaiky1992@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) return null;

        const isMatch = await bcryptjs.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) return null;

        return user;
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE,
  },
  callbacks: {
    async session({ session, token }) {
      await connectDB();
      const user = await User.findById(token?.sub)
        .select("-password -__v")
        .exec();
      session = {
        ...session,
        user,
      };
      return session;
    },
  },
  pages: {
    signIn: "/admin/login", //Need to define custom login page (if using)
  },
});
