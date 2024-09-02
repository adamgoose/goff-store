"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import * as yaml from "yaml";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { FeatureFlag } from "@/goff";
import { z } from "zod";
import { FeatureSchema } from "../forms/feature/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

export interface ImportFeaturesProps {
  children: React.ReactNode;
  importFeatures: (
    newFeatures: z.infer<typeof FeatureSchema>[],
  ) => Promise<any>;
}

export default function ImportFeatures(props: ImportFeaturesProps) {
  const [open, setOpen] = useState(false);
  const [rawYaml, setRawYaml] = useState("");
  const [data, setData] = useState<
    z.infer<typeof FeatureSchema>[] | undefined
  >();
  const [yamlError, setYamlError] = useState();

  useEffect(() => {
    console.log("trying...");
    try {
      const result = yaml.parse(rawYaml, {
        prettyErrors: true,
      });

      const newData = [];
      for (const feature in result) {
        newData.push(convertImportableFeature(feature, result[feature]));
      }

      setData(newData);
      setYamlError(undefined);
    } catch (e: any) {
      console.log(e);
      setYamlError(e);
      setData(undefined);
    }
  }, [rawYaml]);

  const convertImportableFeature = (
    feature: string,
    spec: FeatureFlag<any>,
  ): z.infer<typeof FeatureSchema> => {
    const variation = spec.variations[Object.keys(spec.variations)[0]];
    let type: string = typeof variation;
    if (type == "object") {
      type = "json";
    }

    return FeatureSchema.parse({
      feature,
      type,
      ...spec,
      variations: Object.keys(spec.variations).map((variation) => ({
        name: variation,
        value: spec.variations?.[variation],
      })),
      metadata: Object.keys(spec.metadata || {}).map((key) => ({
        name: key,
        value: spec.metadata?.[key],
      })),
    });
  };

  const onSubmit = async () => {
    try {
      props.importFeatures(data!);

      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="max-w-[80vw]">
        <DialogHeader>
          <DialogTitle>Import Features</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 md:gap-8">
          <Textarea
            placeholder="features.yaml"
            value={rawYaml}
            onChange={(e) => setRawYaml(e.target.value)}
            rows={8}
            className="font-mono"
          />

          <ScrollArea className="col-span-2 max-h-[80vh] w-full">
            {yamlError && <pre>{JSON.stringify(yamlError, null, "  ")}</pre>}
            {!yamlError && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Default Variation</TableHead>
                    <TableHead>Variations</TableHead>
                    <TableHead>Targeting</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((feature) => (
                    <TableRow key={feature.feature}>
                      <TableCell>{feature.feature}</TableCell>
                      <TableCell>{feature.defaultRule.variation}</TableCell>
                      <TableCell className="text-center">
                        <Badge>{feature.variations.length}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {feature.targeting && (
                          <Badge>{feature.targeting?.length}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button disabled={!!yamlError} onClick={onSubmit}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
