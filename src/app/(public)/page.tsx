"use client";
import SectionWrapper from "@/components/custom/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schema/validations/index.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-select";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { doCredentialSignin, doSocialLogin } from "./actions";
import SocialAuth from "@/components/custom/generic/social-auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Home() {
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const attempt = async (values: { email: string; password: string }) => {
		const { email, password } = values;
		//TODO: validate data here...
		const response = await doCredentialSignin({ email, password });
		if (!response) {
			toast("invalid username or password", { type: "error" });
			return;
		}
		router.push("/admin");
	};

	return (
		<div className="grainy-light relative bg-slate-50">
			<section className="md:bg-profile relative h-screen">
				<SectionWrapper className="relative flex flex-col justify-center items-center">
					<Card className="w-full max-w-sm">
						<CardHeader className="text-center pb-10">
							<CardTitle className="text-2xl">Login</CardTitle>
							<CardDescription>
								Enter your email below to login to your account.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<div className="space-y-4">
								<Form {...form}>
									<form
										className="grid gap-2"
										onSubmit={form.handleSubmit(attempt)}>
										<FormField
											name="email"
											control={form.control}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															{...field}
															type="email"
															placeholder="m@example.com"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											name="password"
											control={form.control}
											render={({ field }) => (
												<FormItem>
													<div className="flex justify-between">
														<FormLabel>Password</FormLabel>
														<Link
															href="#"
															className="ml-auto inline-block text-sm underline"
															prefetch={false}>
															Forgot your password?
														</Link>
													</div>
													<FormControl>
														<Input
															{...field}
															type="password"
															placeholder="******"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button
											className="w-full"
											type="submit"
											name="action"
											value="credentials">
											Sign in
										</Button>
									</form>
								</Form>
								<SocialAuth />
							</div>
						</CardContent>
					</Card>
				</SectionWrapper>
			</section>
		</div>
	);
}
