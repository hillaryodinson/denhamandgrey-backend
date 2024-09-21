import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React, { SetStateAction } from "react";

interface modalProps {
	isOpen: boolean;
	toggleOpen: React.Dispatch<SetStateAction<boolean>>;
	title?: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
}
function Modal({
	isOpen,
	toggleOpen,
	title,
	description,
	children,
	className,
}: modalProps) {
	return (
		<Dialog onOpenChange={toggleOpen} open={isOpen}>
			<DialogContent className={cn(className)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
					<div className="grid gap-4 py-4">{children}</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default Modal;
