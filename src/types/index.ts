import { memberSchema } from "@/schema/validations/index.schema";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// export type User = Prisma.;
export type AuthDTO = {
	name: string;
	email: string;
	password: string;
	sendOnboardingEmail: boolean;
};

export type MemberDTO = z.infer<typeof memberSchema>;
export type MemberWithSocial = Prisma.MemberGetPayload<{
	include: { socials: true };
}>;
export type ImagePreviewType = string | null;
