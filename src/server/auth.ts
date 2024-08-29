import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./db";
import { User } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import { fetch } from "@/repository/user.repository";

export const { handlers, signIn, signOut, auth } = NextAuth({
	...AuthConfig,
	providers: [
		CredentialsProvider({
			authorize: async (credentials) => {
				if (credentials == null) return null;
				try {
					const user = false; //do user authenthication here;

					if (!user) {
						throw new Error("Invalid user or user does not exist");
					}

					return user;
				} catch (error: any) {
					throw new Error(error);
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	adapter: PrismaAdapter(db) as Adapter,
	callbacks: {
		// jwt({ token,  }) {
		// 	console.log(token, "USER: ", user);
		// },
		// session({ session, user, token }) {
		// 	console.log(session, user, token);
		// },
	},
});
