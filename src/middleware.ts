// export { auth as middleware } from "@/server/auth";

import { NextRequest } from "next/server";
import { authRoutes, protectedRoutes, publicRoutes } from "./server/route";
import NextAuth from "next-auth";
import { AuthConfig } from "./server/auth.config";

const { auth } = NextAuth(AuthConfig);

export const config = {
	// matcher: ["/((?!/*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
	matcher: "/admin/(.+)?/",
};

export async function middleware(req: NextRequest) {
	const session = await auth();
	const isAuthenticated = !!session;

	console.log(
		"SESSION: ",
		session,
		isAuthenticated,
		protectedRoutes.includes(req.nextUrl.pathname)
	);

	if (
		!isAuthenticated &&
		(req.nextUrl.pathname !== "/" || !authRoutes.includes(req.nextUrl.pathname))
	) {
		const newUrl = new URL("/", req.nextUrl.origin);
		return Response.redirect(newUrl);
	}
}
