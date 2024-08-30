"use server";
import db from "@/server/db";
import * as argon2 from "argon2";

export type AuthDTO = {
	name: string;
	email: string;
	password: string;
	sendOnboardingEmail: boolean;
};

export const createAccount = async (data: AuthDTO) => {
	let hashedPassword = null;
	if (!data.sendOnboardingEmail) {
		hashedPassword = await argon2.hash(data.password!);
	} else {
		//TODO: send an email to user with first time password link
	}

	const user = await db.user.create({
		data: {
			email: data.email,
			name: data.name,
			password: hashedPassword,
		},
	});
	return user;
};
