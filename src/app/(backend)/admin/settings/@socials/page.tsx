"use client";
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

import { Input } from "@/components/ui/input";
import React, { useMemo, useState } from "react";
import { getSocialsColumn } from "./columns";
import { Social } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CircleUser } from "lucide-react";
import db from "@/server/db";
import PrintJSON from "@/components/custom/generic/print-json";

type ImagePreviewType = string | null;

export const socialSchema = z.object({
	name: z.string(),
	icon: z.string().optional(),
});

const Socials = () => {
	const [imagePreview, setImagePreview] = useState<ImagePreviewType>();
	const [uploadedFile, setUploadedFile] = useState<File>();

	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const columns: ColumnDef<Social>[] = useMemo(() => getSocialsColumn({}), []);

	const { data, isFetching } = useQuery({
		queryKey: ["fetchSocials"],
		queryFn: () => [],
	});
	const form = useForm<z.infer<typeof socialSchema>>({
		resolver: zodResolver(socialSchema),
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				const imageBase64 = reader.result as string;
				setImagePreview(imageBase64);
				setUploadedFile(file);
			};
			reader.readAsDataURL(file);
		}
	};

	const doSubmit = async (data: z.infer<typeof socialSchema>) => {
		let uploadedImageURL: { image: string; thumb: string } | null = null;

		//call api and upload document to server.
		if (uploadedFile) {
			const formData = new FormData();
			formData.append("image", uploadedFile);
			const response = await fetch("/api/uploader", {
				method: "POST",
				body: formData,
			});
			uploadedImageURL = await response.json();
		}
		data.icon = uploadedImageURL?.image || "";

		try {
			createSocial(data);
			alert("social platform was added successfully");
		} catch (error) {
			console.log(error);
			alert("An error occured");
		}
	};
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Social Links</CardTitle>
					<CardDescription className="flex justify-between items-center">
						<span>Support Social media platform for members</span>
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
			<Modal isOpen={isOpen} toggleOpen={setIsOpen} className="sm:max-w-md">
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
						<div className="flex items-center gap-4">
							<FormItem className="flex-1">
								<FormLabel>Upload Icon Image</FormLabel>
								<FormControl>
									<Input
										className="h-9"
										type="file"
										onChange={handleFileChange}
									/>
								</FormControl>
							</FormItem>

							<Avatar className="w-16 h-16 border">
								<AvatarImage src={imagePreview || undefined} alt="Preview" />
								<AvatarFallback>
									<CircleUser className="h-5 w-5" />
								</AvatarFallback>
							</Avatar>
						</div>

						<PrintJSON value={form.getFieldState("name")} />
						<PrintJSON value={form.getFieldState("icon")} />
						<PrintJSON value={form.formState} />

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
