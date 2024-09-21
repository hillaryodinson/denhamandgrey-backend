"use client";
import DataTable from "@/components/custom/generic/datatable";
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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { getMembersColumn } from "./columns";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useQueryClient } from "react-query";
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
import Tiptap from "@/components/custom/generic/editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser, X } from "lucide-react";
import PrintJSON from "@/components/custom/generic/print-json";
import { ImagePreviewType, MemberDTO, MemberWithSocial } from "@/types";
import { memberSchema } from "@/schema/validations/index.schema";
import { createMember, fetchAllMembers } from "./action";
import { toast } from "react-toastify";
import { ColumnDef } from "@tanstack/react-table";
import AddMemberForm from "./addMemberForm";
import EditMemberForm from "./editMemberForm";
import EditMemberPhotoForm from "./editMemberPhoto";

const MembersPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
	const [isOpenEditPhoto, setIsOpenEditPhoto] = useState<boolean>(false);
	const [editData, setEditData] = useState<MemberWithSocial>();

	const queryClient = useQueryClient();

	const { data, isFetching } = useQuery({
		queryKey: ["members"],
		queryFn: () => fetchAllMembers(),
		initialData: [],
	});

	const onDelete = (values: MemberWithSocial) => {};

	const onEdit = (values: MemberWithSocial) => {
		setEditData(() => ({ ...values }));
		setIsOpenEdit(true);
	};

	const onUpload = (values: string) => {
		setIsOpenEditPhoto(true);
	};

	const columns: ColumnDef<MemberWithSocial>[] = useMemo(
		() => getMembersColumn({ onEdit, onDelete, onUpload }),
		[]
	);

	const onSuccessFulCreate = () => {
		//refresh database data
		queryClient.invalidateQueries();
		//show success message
		toast("Member was added successfully", { type: "success" });
		//close modal
		setIsOpen(false);
	};

	const onSuccessFulUpdate = () => {
		//refresh database data
		queryClient.invalidateQueries();
		//show success message
		toast("Member was updated successfully", { type: "success" });
		//close modal
		setIsOpenEdit(false);
	};

	const onSuccessFulUpload = () => {
		//refresh database data
		queryClient.invalidateQueries();
		//show success message
		toast("Member photo was updated successfully", { type: "success" });
		//close modal
		setIsOpenEditPhoto(false);
	};

	const doModifySubmit = async (data: MemberWithSocial) => {};

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
					<DataTable columns={columns} data={data!} isFetching={isFetching} />
				</CardContent>
			</Card>
			<Modal
				isOpen={isOpen}
				toggleOpen={setIsOpen}
				className="min-w-fit max-h-screen overflow-y-auto">
				<h1 className="font-bold tracking-wide text-lg mb-2">Create Account</h1>
				<AddMemberForm onSuccessCallback={onSuccessFulCreate} />
			</Modal>
			<Modal
				isOpen={isOpenEdit}
				toggleOpen={setIsOpenEdit}
				className="min-w-fit max-h-screen overflow-y-auto">
				<h1 className="font-bold tracking-wide text-lg mb-2">Update Member</h1>
				<EditMemberForm
					onSuccessCallback={onSuccessFulUpdate}
					data={editData!}
				/>
			</Modal>
			<Modal
				isOpen={isOpenEditPhoto}
				toggleOpen={setIsOpenEditPhoto}
				className="min-w-fit max-h-screen overflow-y-auto">
				<h1 className="font-bold tracking-wide text-lg mb-2">
					Update Member Photo
				</h1>
				<EditMemberPhotoForm onSuccessCallback={onSuccessFulUpload} />
			</Modal>
		</>
	);
};

export default MembersPage;
