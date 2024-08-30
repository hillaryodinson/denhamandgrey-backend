"use client";
import DataTableColumnHeader from "@/components/custom/generic/datatable-column-header";
import LogoutMenuItem from "@/components/custom/generic/logout-dropdown-menu-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
	BanIcon,
	CheckCircle2Icon,
	CircleUser,
	EllipsisVertical,
	PenSquareIcon,
	TrashIcon,
} from "lucide-react";

interface ColumnProps {
	onEdit?: (user: User) => void;
	onDelete?: (user: User) => void;
	onBanned?: (user: User) => void;
	onUnBanned?: (user: User) => void;
}

export const getAccountColumns = ({
	onEdit,
	onDelete,
	onBanned,
	onUnBanned,
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
		cell: ({ row }) => {
			const currentUser = row.original;
			return onEdit || onDelete || onBanned || onUnBanned ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="rounded-full">
							<EllipsisVertical className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{onEdit && (
							<DropdownMenuItem
								onClick={() => onEdit && onEdit(currentUser)}
								className="flex items-center justify-normal">
								<PenSquareIcon className="h-4 w-4 mr-2" />
								<span>Edit</span>
							</DropdownMenuItem>
						)}
						{onDelete && (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => onDelete && onDelete(currentUser)}
									className="flex items-center justify-normal">
									<TrashIcon className="h-4 w-4 mr-2" />
									<span>Delete</span>
								</DropdownMenuItem>
							</>
						)}
						{onBanned && (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => onBanned && onBanned(currentUser)}
									className="flex items-center justify-normal">
									<BanIcon className="h-4 w-4 mr-2" />
									<span>Ban Account</span>
								</DropdownMenuItem>
							</>
						)}
						{onUnBanned && (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => onUnBanned && onUnBanned(currentUser)}
									className="flex items-center justify-normal">
									<CheckCircle2Icon className="h-4 w-4 mr-2" />
									<span>Restore Account</span>
								</DropdownMenuItem>
							</>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			) : null;
		},
	},
];
