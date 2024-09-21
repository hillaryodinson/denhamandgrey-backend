import DataTableColumnHeader from "@/components/custom/generic/datatable-column-header";
import { Button } from "@/components/ui/button";
import { Member } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
	EllipsisVertical,
	PenSquareIcon,
	TrashIcon,
	CircleUser,
} from "lucide-react";

interface ColumnProps {
	onEdit?: (member: Member) => void;
	onDelete?: (member: Member) => void;
}

export const getMembersColumn = ({
	onEdit,
	onDelete,
}: ColumnProps): ColumnDef<Member>[] => [
	{
		id: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex items-center">
					<Avatar className="w-5 h-5 mr-2">
						<AvatarImage src={row.original.photo || undefined} alt="@avatar" />
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
		id: "position",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Position" />
		),
	},
	{
		id: "type",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
	},
	{
		id: "action",
		header: "",
		size: 50,
		cell: ({ row }) => {
			const currentMember = row.original;
			return onEdit || onDelete ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="rounded-full">
							<EllipsisVertical className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{onEdit && (
							<DropdownMenuItem
								onClick={() => onEdit && onEdit(currentMember)}
								className="flex items-center justify-normal">
								<PenSquareIcon className="h-4 w-4 mr-2" />
								<span>Edit</span>
							</DropdownMenuItem>
						)}
						{onDelete && (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => onDelete && onDelete(currentMember)}
									className="flex items-center justify-normal">
									<TrashIcon className="h-4 w-4 mr-2" />
									<span>Delete</span>
								</DropdownMenuItem>
							</>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			) : null;
		},
	},
];
