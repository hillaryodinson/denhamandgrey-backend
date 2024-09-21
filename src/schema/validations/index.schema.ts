import { platform } from "os";
import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export const authSchema = z
	.object({
		name: z.string().min(1, "Name field is required"),
		email: z
			.string()
			.min(1, "Email field is required")
			.email("Please enter a valid email address"),
		password: z.string().optional(),
		sendOnboardingEmail: z.boolean(),
	})
	.superRefine((data, ctx) => {
		if (data.sendOnboardingEmail !== true && !data.password) {
			ctx.addIssue({
				path: ["password"],
				message: "Password is required and must be 6 characters or more",
				code: "custom",
			});
		}
		if (
			data.sendOnboardingEmail !== true &&
			data.password &&
			data.password.length < 6
		) {
			ctx.addIssue({
				path: ["password"],
				message: "Password must be 6 characters or more",
				code: "custom",
			});
		}
	});

export const socialSchema = z.object({
	platform: z
		.string()
		.min(1, { message: "Please select a social media platform" }),
	url: z.string().url({ message: "Please enter a valid url" }),
	membersId: z.string().nullable(),
	id: z.string().default(""),
});

export const memberSchema = z.object({
	id: z.string().nullable(),
	name: z.string(),
	position: z.string(),
	photo: z.string(),
	description: z.string(),
	type: z.string(),
	socials: z.array(socialSchema),
});
