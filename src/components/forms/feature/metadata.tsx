import { useContext } from "react";
import { FeatureFormContext } from "./feature-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export default function Metadata() {
  const { form, metadata } = useContext(FeatureFormContext);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metadata</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {metadata.fields.map((field, index) => (
            <div key={field.id}>
              <Separator />
              <div className="flex flex-row gap-4 items-end">
                <FormField
                  control={form.control}
                  name={`metadata.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Key</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`metadata.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="shrink">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => metadata.remove(index)}
                      >
                        <X />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">Delete Key</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
          <Separator />
          <div className="flex flex-row gap-4 items-end justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  onClick={() =>
                    metadata.append({
                      name: "",
                      value: "",
                    })
                  }
                >
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Add Key Value Pair</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
