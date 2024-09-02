"use client";

import { environments } from "@/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Protect from "../protect-client";
import { Button } from "../ui/button";
import Link from "next/link";
import { Edit, Trash } from "lucide-react";
import ConfirmPopover from "../ui/confirm-popover";

export default function EnvironmentsTable({
  data,
}: {
  data: (typeof environments.$inferSelect)[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Environment</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((environment) => (
          <TableRow key={environment.name}>
            <TableCell>{environment.name}</TableCell>
            <TableCell className="flex flex-row justify-end gap-3">
              <Protect permission="org:environment:write">
                <Button asChild size="icon">
                  <Link href={`/environments/${environment.name}`}>
                    <Edit />
                  </Link>
                </Button>
                <ConfirmPopover handleConfirm={async () => { }}>
                  <Button variant="destructive" size="icon">
                    <Trash />
                  </Button>
                </ConfirmPopover>
              </Protect>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
