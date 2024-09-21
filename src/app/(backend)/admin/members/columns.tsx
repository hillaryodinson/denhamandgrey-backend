import DataTableColumnHeader from "@/components/custom/generic/datatable-column-header";
import { Button } from "@/components/ui/button";
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
	UploadIcon,
} from "lucide-react";
import CustomImage from "@/components/custom/generic/custom-image";
import { MemberWithSocial } from "@/types";

interface ColumnProps {
	onEdit?: (member: MemberWithSocial) => void;
	onDelete?: (member: MemberWithSocial) => void;
	onUpload?: (photoUrl: string) => void;
}

/**
 * Generate columns for the members data table.
 *
 * @param {ColumnProps} props Column props.
 * @param {function} [props.onEdit] Callback function when a member is edited.
 * @param {function} [props.onDelete] Callback function when a member is deleted.
 * @returns {ColumnDef<MemberWithSocial>[]} Data table columns.
 */
export const getMembersColumn = ({
	onEdit,
	onDelete,
	onUpload,
}: ColumnProps): ColumnDef<MemberWithSocial>[] => [
	{
		id: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		accessorKey: "name",
		cell: ({ row }) => {
			/**
			 * Render a row cell for the member's name.
			 *
			 * @param {React.ComponentProps<typeof DataTable>} props Row props.
			 * @returns {React.ReactNode} Row cell content.
			 */
			if (!row.original) {
				throw new Error("row.original is null");
			}

			return (
				<div className="flex items-center">
					{row.original.photo ? (
						<CustomImage
							src={row.original.photo}
							size="50px"
							alt="@avatar"
							className="rounded-full w-7 h-7 mr-2 border-2 border-slate-600 overflow-hidden"
						/>
					) : (
						<CircleUser className="h-6 w-6 mr-2" />
					)}
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
		accessorKey: "position",
	},
	{
		id: "type",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
		accessorKey: "type",
	},
	{
		id: "action",
		header: "",
		size: 50,
		cell: ({ row }) => {
			/**
			 * Render a row cell for the member's actions.
			 *
			 * @param {React.ComponentProps<typeof DataTable>} props Row props.
			 * @returns {React.ReactNode} Row cell content.
			 */
			if (!row.original) {
				throw new Error("row.original is null");
			}

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
								onClick={() => {
									if (onEdit) {
										onEdit(currentMember);
									}
								}}
								className="flex items-center justify-normal">
								<PenSquareIcon className="h-4 w-4 mr-2" />
								<span>Edit</span>
							</DropdownMenuItem>
						)}
						{onDelete && (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => {
										if (onDelete) {
											onDelete(currentMember);
										}
									}}
									className="flex items-center justify-normal">
									<TrashIcon className="h-4 w-4 mr-2" />
									<span>Delete</span>
								</DropdownMenuItem>
							</>
						)}
						{onUpload && (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => {
										if (onUpload) {
											onUpload(currentMember.photo);
										}
									}}
									className="flex items-center justify-normal">
									<UploadIcon className="h-4 w-4 mr-2" />
									<span>Update Photo</span>
								</DropdownMenuItem>
							</>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			) : null;
		},
	},
];
