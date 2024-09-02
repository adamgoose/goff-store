"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createEnvironment } from "@/app/environments/actions";

export type CreateEnvironmentDialogProps = React.PropsWithChildren<{
  //
}>;

export default function CreateEnvironmentDialog(
  props: CreateEnvironmentDialogProps,
) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Environment</DialogTitle>
        </DialogHeader>

        <Label>Environment Slug</Label>
        <Input
          placeholder="dev"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={!name}
            onClick={async () => {
              await createEnvironment(name);
              setOpen(false);
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
