import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ALargeSmall,
  Braces,
  Hash,
  Plus,
  SquareCheckBig,
  X,
} from "lucide-react";
import * as React from "react";

export default function Dashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Feature</CardTitle>
        <CardDescription>Release your first Feature!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Flag Name</Label>
              <Input id="feature" placeholder="my_next_feature" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="boolean">
                    <SquareCheckBig size="14" />
                    Boolean
                  </SelectItem>
                  <SelectItem value="number">
                    <Hash size="14" />
                    Number
                  </SelectItem>
                  <SelectItem value="string">
                    <ALargeSmall size="14" />
                    String
                  </SelectItem>
                  <SelectItem value="json">
                    <Braces size="14" />
                    JSON
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-flow-col">
              <div className="flex flex-col items-center space-y-1.5">
                <Label htmlFor="disabled">Disabled</Label>
                <Switch id="disabled" color="red-500" />
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <Label htmlFor="track">Track Events</Label>
                <Switch id="track" checked />
              </div>
            </div>
            <Separator />
            <div className="flex flex-row gap-4 items-end">
              <div className="grow">
                <Label>Variation Name</Label>
                <Input />
              </div>
              <div className="grow">
                <Label>Value</Label>
                <Input />
              </div>
              <div className="shrink">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <X />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Delete Variation</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-end justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon">
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Add Variation</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
