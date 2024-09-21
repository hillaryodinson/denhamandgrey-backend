"use server";
import { create, fetchAll } from "@/repository/member.repository";
import { memberSchema } from "@/schema/validations/index.schema";
import { MemberDTO, MemberWithSocial } from "@/types";
import { Member } from "@prisma/client";

/**
 * Creates a new member.
 *
 * @param {MemberDTO} data The data for the new member.
 * @returns {Promise<Member>} The created member.
 */
export const createMember = async (data: MemberDTO): Promise<Member> => {
	const validated = memberSchema.safeParse(data);

	// Check if the data is valid, if not throw an error.
	if (validated.error) {
		throw new Error(validated.error.message);
	}

	// Create the member
	return await create(validated.data);
};

export const fetchAllMembers = async (): Promise<MemberWithSocial[]> => {
	return await fetchAll();
};
