"use client";
import DataTableColumnHeader from "@/components/custom/generic/datatable-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleUser } from "lucide-react";

interface ColumnProps {
	onEdit?: (user: User) => void;
	onDelete?: (user: User) => void;
}

export const getAccountColumns = ({
	onEdit,
	onDelete,
}: ColumnProps): ColumnDef<User>[] => [
	{
		id: "name",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="Name" />;
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center">
					<Avatar className="w-5 h-5 mr-2">
						<AvatarImage src={row.original.image || undefined} alt="@avatar" />
						<AvatarFallback>
							<CircleUser className="h-5 w-5" />
						</AvatarFallback>
					</Avatar>{" "}
					<span className="capitalize">{row.original.name}</span>
				</div>
			);
		},
	},
	// {
	// 	id: "name",
	//
	// 	accessorFn: (row) => `${row.name}`,
	// 	accessorKey: "name",
	// },
	{
		id: "email",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="Email" />;
		},
		accessorFn: (row) => row.email,
	},
	{
		id: "role",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="Role" />;
		},
		accessorFn: (row) => row.role,
	},
	{
		id: "action",
		header: "",
		size: 50,
	},
];
