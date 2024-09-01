import { useContext } from "react";
import { FeatureFormContext } from "./feature-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function TargetingRules() {
  const { form, targeting } = useContext(FeatureFormContext);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Targeting Rules</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {targeting.fields.map((field, index) => (
            <div key={field.id}>
              <Separator />
              <div className="flex flex-row gap-4 items-end">
                <FormField
                  control={form.control}
                  name={`targeting.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`targeting.${index}.query`}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Query</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="defaultRule.variation"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Serve</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="default" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {form
                            .watch()
                            .variations.filter((variation) => !!variation.name)
                            .map((variation, index) => (
                              <SelectItem key={index} value={variation.name}>
                                {variation.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
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
                        onClick={() => targeting.remove(index)}
                      >
                        <X />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      Delete Targeting Rule
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
                  type="button"
                  size="icon"
                  onClick={() =>
                    targeting.append({
                      name: "",
                      query: "",
                      variation: "default",
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
