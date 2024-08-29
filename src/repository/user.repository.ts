import db from "@/server/db";
import { User } from "@prisma/client";

export const create = (id: string) => {};
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
