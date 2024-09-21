import { z } from "zod";
import { socialSchema } from "./page";
import db from "@/server/db";

export const createSocial = async (data: z.infer<typeof socialSchema>) => {
	//validate input
	const validated = socialSchema.safeParse(data);
	if (validated.error) {
		throw new Error(validated.error.message);
	}

	await db.social.create({
		data: {
			name: data.name,
			icon: data.icon,
		},
	});
};
