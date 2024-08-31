import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureFormContext } from "./feature-form";
import { useContext } from "react";
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export default function Variations() {
  const { form, variations } = useContext(FeatureFormContext);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {variations.fields.map((field, index) => (
            <div key={field.id}>
              <Separator />
              <div className="flex flex-row gap-4 items-end">
                <FormField
                  control={form.control}
                  name={`variations.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="default" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variations.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Value</FormLabel>
                      <br />
                      <FormControl>
                        <>
                          {form.watch().type == "boolean" && (
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                          {form.watch().type == "string" && (
                            <Input {...field} />
                          )}
                          {form.watch().type == "number" && (
                            <Input type="number" {...field} />
                          )}
                          {form.watch().type == "json" && (
                            <Textarea {...field} />
                          )}
                        </>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="shrink">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => variations.remove(index)}
                      >
                        <X />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      Delete Variation
                    </TooltipContent>
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
                  size="icon"
                  onClick={() =>
                    variations.append({
                      name: "",
                    })
                  }
                >
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Add Variation</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
