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
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}
function Modal({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  className,
}: modalProps) {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className={cn("overflow-y-auto", className)}>
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
