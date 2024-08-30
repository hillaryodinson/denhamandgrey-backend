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
