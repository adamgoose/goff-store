"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { features } from "@/db/schema";
import { Copy, Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { deleteFeature, setDefaultVariation } from "@/app/features/actions";

export default function FeaturesTable({
  data,
}: {
  data: (typeof features.$inferSelect)[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Feature</TableHead>
          <TableHead>Default Variation</TableHead>
          <TableHead className="text-center">Variations</TableHead>
          <TableHead className="text-center">Targeting</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((feature) => (
          <TableRow key={feature.name}>
            <TableCell className="flex flex-row flex-1 justify-between items-center">
              <span>{feature.name}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="outline">
                    <Copy size="12" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Copy</TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Select
                defaultValue={feature.spec.defaultRule.variation}
                onValueChange={(variation) =>
                  setDefaultVariation(feature.name, variation)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {feature.spec.variations.map((variation, index) => (
                    <SelectItem key={index} value={variation.name}>
                      {variation.name} ({JSON.stringify(variation.value)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-center">
              <Badge>{feature.spec.variations.length}</Badge>
            </TableCell>
            <TableCell className="text-center">
              <Badge>{feature.spec.targeting.length}</Badge>
            </TableCell>
            <TableCell className="flex flex-row justify-end gap-3">
              <Button size="icon">
                <Edit />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => deleteFeature(feature.name)}
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
