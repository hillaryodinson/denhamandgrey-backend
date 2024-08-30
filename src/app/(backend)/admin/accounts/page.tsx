"use client";
import React, { useMemo, useState } from "react";
import DataTable from "@/components/custom/generic/datatable";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

import { getAccountColumns } from "./columns";
import { SlideSheet } from "@/components/custom/generic/slide-sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import PrintJSON from "@/components/custom/generic/print-json";
import { toast } from "react-toastify";
import { createAccount, fetchAccounts } from "./action";
import { AuthDTO } from "@/types";
import { authSchema } from "@/schema/validations/index.schema";
import { useQuery, useQueryClient } from "react-query";

const AccountPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const columns = useMemo(() => getAccountColumns({}), []);
	const queryClient = useQueryClient();
	const form = useForm({
		resolver: zodResolver(authSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			sendOnboardingEmail: false,
		},
	});

	const { data, isFetching } = useQuery({
		queryKey: ["accounts"],
		queryFn: () => fetchAccounts(),
	});

	const doSubmit = async (values: AuthDTO) => {
		try {
			const validated = authSchema.safeParse(values);
			if (validated.error) {
				// Validation Errors
				throw new Error(validated.error.message);
			}
			await createAccount(validated.data as AuthDTO);

			toast("User was added successfully", { type: "success" });
			queryClient.invalidateQueries();
			form.reset();
			setIsOpen(false);
		} catch (error) {
			toast("An error occured user was not created", { type: "error" });
			console.log(error);
		}
	};

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Notifications</CardTitle>
					<CardDescription className="flex justify-between items-center">
						<span>You have 3 unread messages. </span>
						<Button
							size={"sm"}
							className="text-xs"
							onClick={() => setIsOpen((prev) => !prev)}>
							+ Add
						</Button>
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<DataTable
						columns={columns}
						data={data ?? []}
						isFetching={isFetching}
					/>
					{/* <PrintJSON value={data} /> */}
				</CardContent>
			</Card>
			<SlideSheet isOpen={isOpen} toggleOpen={setIsOpen}>
				<h1 className="font-bold tracking-wide text-lg mb-7">Create Account</h1>

				<Form {...form}>
					<form className="space-y-2" onSubmit={form.handleSubmit(doSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="text"
											placeholder="John Doe"
											className="h-9"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="email"
											placeholder="John Doe"
											className="h-9"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="sendOnboardingEmail"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Allow user create their password</FormLabel>
										<FormDescription className="text-xs">
											An onboarding email will be sent to this user with
											instructions on how to create password
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
						{form.getValues("sendOnboardingEmail") === true ? null : (
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="password"
												placeholder="*******"
												className="h-9"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<div className="pt-5">
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</Form>
			</SlideSheet>
		</>
	);
};

export default AccountPage;
