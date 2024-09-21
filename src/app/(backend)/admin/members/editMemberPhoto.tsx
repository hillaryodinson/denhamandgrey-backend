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

const EditMemberPhotoForm = ({
	onSuccessCallback,
}: {
	onSuccessCallback: () => void;
}) => {
	const [imagePreview, setImagePreview] = React.useState<ImagePreviewType>();
	const [uploadedFile, setUploadedFile] = React.useState<File>();

	const form = useForm<MemberWithSocial>({
		resolver: zodResolver(memberSchema),
		defaultValues: {
			name: "",
			position: "",
			photo: "",
			description: "",
			type: "management",
			socials: [{ platform: "", url: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: "socials",
		control: form.control,
	});

	const doSubmit = async (data: MemberDTO) => {
		try {
			//call api and upload document to server.
			if (typeof uploadedFile != "undefined") {
				const formData = new FormData();
				formData.append("image", uploadedFile);
				const response = await fetch("/api/image-manager/upload", {
					method: "POST",
					body: formData,
				});
				const uploadedImageURL = await response.json();
				//if valid add photourl to payload
				data.photo = uploadedImageURL?.data.image;
			}

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

	/**
	 * Handles the file input change event
	 * @param event the change event
	 */
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Get the selected file
		const file = event.target.files?.[0];
		if (!file) return;

		// Read the file and generate a base64 preview
		const reader = new FileReader();
		reader.onload = () => {
			// Set the preview image
			const imageBase64 = reader.result as string;
			setImagePreview(imageBase64);
			setUploadedFile(file);
		};
		// Start reading the file
		reader.readAsDataURL(file);
	};

	return (
		<Form {...form}>
			<form
				className="space-y-3 text-left"
				onSubmit={form.handleSubmit(doSubmit)}>
				<div className="flex items-center gap-4">
					<FormItem className="flex-1">
						<FormLabel>Upload Photo</FormLabel>
						<FormControl>
							<Input className="h-9" type="file" onChange={handleFileChange} />
						</FormControl>
					</FormItem>

					<Avatar className="w-16 h-16 border">
						<AvatarImage src={imagePreview || undefined} alt="Preview" />
						<AvatarFallback>
							<CircleUser className="h-5 w-5" />
						</AvatarFallback>
					</Avatar>
				</div>

				<div className="pt-5">
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
};

export default EditMemberPhotoForm;
