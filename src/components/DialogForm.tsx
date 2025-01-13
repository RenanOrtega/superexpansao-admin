"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogForm({
  children,
  title,
  open,
  onOpenChange,
  trigger,
}: {
  children: React.JSX.Element;
  title: string;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  trigger: React.JSX.Element;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
