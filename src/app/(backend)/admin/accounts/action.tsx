"use server";
import { create, fetchAll } from "@/repository/user.repository";
import { AuthDTO } from "@/types";
import * as argon2 from "argon2";

export const createAccount = async (record: AuthDTO) => {
	let hashedPassword = null;
	let data = { ...record };

	if (!data.sendOnboardingEmail) {
		hashedPassword = await argon2.hash(record.password!);
		data = { ...record, password: hashedPassword };
	} else {
		//TODO: send an email to user with first time password link
	}
	return await create(data);
};

export const fetchAccounts = async () => {
	return await fetchAll();
};
