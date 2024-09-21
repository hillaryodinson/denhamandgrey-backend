import Tiptap from "@/components/custom/generic/editor";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from "@/components/ui/select";
import { CircleUser, X } from "lucide-react";
import React from "react";
import { ImagePreviewType, MemberDTO, MemberWithSocial } from "@/types";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { createMember } from "./action";
import { memberType, SupportedSocialMediaPlatforms } from "@/config/constants";
import { memberSchema } from "@/schema/validations/index.schema";
import { z } from "zod";
import { MemberType } from "@prisma/client";

const EditMemberForm = ({
	onSuccessCallback,
	data,
}: {
	onSuccessCallback: () => void;
	data: z.infer<typeof memberSchema>;
}) => {
	const form = useForm<MemberWithSocial>({
		resolver: zodResolver(memberSchema),
		defaultValues: {
			name: "",
			position: "",
			photo: "",
			description: "",
			type: "management",
			socials: [{ platform: "", url: "", id: "", membersId: null }],
		},
		values: {
			id: "",
			name: data.name,
			position: data.position,
			photo: data.photo,
			description: data.description,
			type: data.type as MemberType,
			socials: data.socials.map((social) => ({
				platform: social.platform,
				url: social.url,
				id: social.id,
				membersId: social.membersId,
			})),
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: "socials",
		control: form.control,
	});

	const doSubmit = async (data: MemberDTO) => {
		try {
			//validate input
			await createMember(data);

			onSuccessCallback();
			//reset form
			form.reset();
		} catch (error) {
			console.log(error);
			toast("An error occured while trying to add member", { type: "error" });
		}
	};

	return (
		<Form {...form}>
			<form
				className="space-y-3 text-left"
				onSubmit={form.handleSubmit(doSubmit)}>
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
										placeholder="Tech specialist"
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
										<SelectTrigger className="md:w-[150px]">
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
				<FormField
					name="description"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Tiptap value={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="space-y-2">
					<div className="bg-blue-100 text-xs p-2 border border-blue-300 my-3 rounded-sm">
						<p>Please select a social media account </p>
					</div>
					{fields.map((social, index) => (
						<>
							<p className="text-red-500">{social.url}</p>
							<div
								className="flex justify-between items-center"
								key={social.id}>
								<FormField
									control={form.control}
									name={`socials.${index}.url`}
									render={({ field }) => (
										<FormItem className="w-full pr-4">
											<FormControl>
												<Input
													{...field}
													type="url"
													placeholder="https://"
													className="h-8 w-full text-xs"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name={`socials.${index}.platform`}
									control={form.control}
									render={({ field }) => (
										<FormItem className="pr-4">
											<FormControl>
												<Select
													// {...field}
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<SelectTrigger className="w-[150px] h-8">
														<SelectValue
															placeholder="Select platform"
															defaultValue={field.value}
														/>
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectLabel>Type</SelectLabel>
															{SupportedSocialMediaPlatforms?.map((option) => (
																<SelectItem
																	value={option.value}
																	key={option.value}>
																	{option.name}
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
								<Button
									variant={"ghost"}
									size={"icon"}
									onClick={() => {
										alert("deleting " + index);
										remove(index);
									}}>
									<X className="h-4 w-4" />
								</Button>
							</div>
						</>
					))}
					<div className="flex item-center justify-center">
						<Button
							onClick={() =>
								append({ platform: "", url: "", membersId: null, id: "" })
							}
							variant={"link"}
							className="text-sm"
							size={"sm"}
							type="button">
							Add Social Link
						</Button>
					</div>
				</div>
				<div className="pt-5">
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
};

export default EditMemberForm;
