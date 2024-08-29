"use client";
import { Button } from "@/components/ui/button";
import { type Column } from "@tanstack/react-table";
import {
	ArrowDownIcon,
	ArrowUpIcon,
	CaretSortIcon,
	EyeNoneIcon,
} from "@radix-ui/react-icons";

import React from "react";

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
}
function DataTableColumnHeader<TData, TValue>({
	column,
	title,
}: DataTableColumnHeaderProps<TData, TValue>) {
	return (
		<Button
			variant="ghost"
			onClick={column.getToggleSortingHandler()}
			// onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		>
			<span>{title}</span>
			{column.getIsSorted() === "desc" ? (
				<ArrowDownIcon className="ml-2 h-4 w-4" />
			) : column.getIsSorted() === "asc" ? (
				<ArrowUpIcon className="ml-2 h-4 w-4" />
			) : (
				<CaretSortIcon className="ml-2 h-4 w-4" />
			)}
		</Button>
	);
}

export default DataTableColumnHeader;
