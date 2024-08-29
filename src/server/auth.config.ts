import { User } from "@prisma/client";
import { NextAuthConfig } from "next-auth";
export const AuthConfig = {
	session: {
		strategy: "jwt",
	},
	providers: [],
} satisfies NextAuthConfig;
