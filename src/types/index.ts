import prisma from "@/server/db";
import { Prisma } from "@prisma/client";

// export type User = Prisma.;
export type AuthDTO = {
	name: string;
	email: string;
	password: string;
	sendOnboardingEmail: boolean;
};
