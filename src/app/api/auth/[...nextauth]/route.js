// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("credentials", credentials);
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) return null;

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) return null;

//         return user;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt", // dùng JWT thay vì session DB
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: true,
//   pages: {
//     signIn: "/auth/login", // Trang login custom
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  // Bỏ adapter để dùng JWT
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            console.log("User not found");
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            console.log("Invalid password");
            return null;
          }

          console.log("User authenticated:", user);
          // Trả về object với các field cần thiết
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.username || user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Giữ JWT strategy
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
