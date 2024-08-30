import db from "@/server/db";
import { AuthDTO } from "@/types";
import { User } from "@prisma/client";

export const create = async (data: AuthDTO) => {
	return await db.user.create({
		data: {
			email: data.email,
			name: data.name,
			password: data.password,
		},
	});
};
export const update = (id: string, data: {}) => {};
export const remove = (id: { id: string }) => {};

/**
 * Finds a user by id
 * @param id string
 * @returns User
 */
export const fetch = async (id: string): Promise<User | null> => {
	return await db.user.findUnique({
		where: {
			id,
		},
	});
};

/**
 * Fetch all accounts in the database
 * @returns User[]
 */
export const fetchAll = async (): Promise<User[]> => {
	return await db.user.findMany();
};
