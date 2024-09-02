"use client";

import { useState } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface ConfirmPopoverProps {
  children: React.ReactNode;
  prompt?: React.ReactNode;
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;

  onCancel?: () => any;
  handleConfirm: () => Promise<any>;
}

export default function ConfirmPopover({
  children,
  prompt = "Are you sure?",
  cancelText = "Never mind...",
  confirmText = "Yes, I'm sure!",
  onCancel,
  ...rest
}: ConfirmPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="flex flex-col align-stretch gap-4">
        {prompt}
        <Button
          variant="secondary"
          onClick={() => {
            setOpen(false);
            onCancel && onCancel();
          }}
        >
          {cancelText}
        </Button>
        <Button onClick={() => rest.handleConfirm()}>{confirmText}</Button>
      </PopoverContent>
    </Popover>
  );
}
