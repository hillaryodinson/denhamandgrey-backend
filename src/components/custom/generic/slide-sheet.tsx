import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { SetStateAction } from "react";

export function SlideSheet({
	title,
	description,
	children,
	toggleOpen,
	isOpen,
}: {
	title?: string;
	description?: string;
	children: React.ReactNode;
	toggleOpen: React.Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
}) {
	return (
		<Sheet onOpenChange={toggleOpen} open={isOpen}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					<SheetDescription>{description}</SheetDescription>
				</SheetHeader>
				<div className="pt-[50px]">{children}</div>
			</SheetContent>
		</Sheet>
	);
}
