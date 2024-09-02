"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { Input } from "../ui/input";

export interface RetrieverTokenDialogProps {
  children: React.ReactNode;
}

export default function RetrieverTokenDialog(props: RetrieverTokenDialogProps) {
  const { getToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!open) {
      setToken("");
      return;
    }

    getToken({
      template: "feature",
    }).then((token) => token && setToken(token));
  }, [open, getToken]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="max-w-[80vw]">
        <DialogHeader>
          <DialogTitle>Retriever Token</DialogTitle>
        </DialogHeader>

        <Input readOnly value={token} className="font-mono" />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
