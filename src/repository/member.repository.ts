import db from "@/server/db";
import { MemberDTO, MemberWithSocial } from "@/types";
import { Member, MemberType } from "@prisma/client";

export const create = async (data: MemberDTO) => {
	if (data.socials.length > 0) {
		return await db.member.create({
			data: {
				name: data.name,
				description: data.description,
				photo: data.photo,
				position: data.position,
				type: data.type as MemberType,
				socials: {
					createMany: {
						data: data.socials,
					},
				},
			},
		});
	} else {
		return await db.member.create({
			data: {
				name: data.name,
				description: data.description,
				photo: data.photo,
				position: data.position,
				type: data.type as MemberType,
			},
		});
	}
};

export const update = (id: string, data: {}) => {};
export const remove = (id: { id: string }) => {};

/**
 * Finds a member by id
 * @param id string
 * @returns Member
 */
export const fetch = async (id: string): Promise<Member | null> => {
	return await db.member.findUnique({
		where: {
			id,
		},
	});
};

/**
 * Fetch all members in the database
 *
 * @returns Promise<MemberWithSocial[]>
 */
export const fetchAll = async (): Promise<MemberWithSocial[]> => {
	return await db.member.findMany({
		include: {
			socials: true,
		},
	});
};
