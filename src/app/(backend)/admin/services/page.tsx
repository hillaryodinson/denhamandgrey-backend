"use client";
import DataTable from "@/components/custom/generic/datatable";
import { SlideSheet } from "@/components/custom/generic/slide-sheet";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React, { useCallback, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { getMembersColumn } from "./columns";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Member } from "@prisma/client";
import { z } from "zod";
import { useQuery } from "react-query";
import Modal from "@/components/custom/generic/modal";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const socialSchema = z.object({
	socialId: z.string(),
	url: z.string(),
});

export const memberSchema = z.object({
	name: z.string(),
	position: z.string(),
	photo: z.string(),
	description: z.string(),
	type: z.string(),
	socials: z.array(socialSchema),
});

const ServicesPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const memberType = ["management", "board"];

	const { data, isFetching } = useQuery({
		queryKey: ["members"],
		queryFn: () => [],
	});

	const columns = useMemo(() => getMembersColumn({}), []);

	const form = useForm({
		resolver: zodResolver(memberSchema),
	});

	const doSubmit = () => {};

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Members</CardTitle>
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
			<Modal isOpen={isOpen} toggleOpen={setIsOpen} className="min-w-fit">
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

						<div className="md:flex justify-between items-center">
							<FormField
								control={form.control}
								name="position"
								render={({ field }) => (
									<FormItem className="w-full pr-4">
										<FormLabel>Position</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												placeholder="John Doe"
												className="h-9 w-full"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="type"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Member Type</FormLabel>
										<FormControl>
											<Select
												// {...field}
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<SelectTrigger className="w-[180px]">
													<SelectValue placeholder="Select a member type" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Type</SelectLabel>
														{memberType?.map((option) => (
															<SelectItem value={option} key={option}>
																{option}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="pt-5">
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</Form>
			</Modal>
		</>
	);
};

export default ServicesPage;
