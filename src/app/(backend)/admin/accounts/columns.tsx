"use client";
import DataTableColumnHeader from "@/components/custom/generic/datatable-column-header";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

interface ColumnProps {
	onEdit?: (user: User) => void;
	onDelete?: (user: User) => void;
}

export const getAccountColumns = ({
	onEdit,
	onDelete,
}: ColumnProps): ColumnDef<User>[] => [
	{
		id: "no",
	},
	{
		id: "name",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="Name" />;
		},
		accessorFn: (row) => `${row.name}`,
		accessorKey: "name",
	},
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
