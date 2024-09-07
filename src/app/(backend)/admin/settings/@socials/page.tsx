import DataTable from "@/components/custom/generic/datatable";
import Modal from "@/components/custom/generic/modal";
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
} from "@/components/ui/form";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React, { useMemo } from "react";
import { getSocialsColumn } from "./columns";
import { Social } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const socialSchema = z.object({
	name: z.string(),
	icon: z.string(),
});
const Socials = () => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const columns: ColumnDef<Social>[] = useMemo(() => getSocialsColumn({}), []);
	const { data, isFetching } = useQuery({
		queryKey: ["fetchSocials"],
		queryFn: () => [],
	});
	const form = useForm({
		resolver: zodResolver(socialSchema),
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

						<div className="pt-5">
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</Form>
			</Modal>
		</>
	);
};

export default Socials;
