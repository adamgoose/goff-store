"use client";

import { createContext } from "react";
import { FeatureSchema } from "./schema";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Details from "./details";
import { Form } from "@/components/ui/form";
import Variations from "./variations";
import Debug from "./debug";
import TargetingRules from "./targeting-rules";
import Metadata from "./metadata";
import { Button } from "@/components/ui/button";

export interface FeatureFormContext {
  form: UseFormReturn<z.infer<typeof FeatureSchema>>;
  variations: UseFieldArrayReturn<z.infer<typeof FeatureSchema>, "variations">;
  targeting: UseFieldArrayReturn<z.infer<typeof FeatureSchema>, "targeting">;
  metadata: UseFieldArrayReturn<z.infer<typeof FeatureSchema>, "metadata">;
}

export const FeatureFormContext = createContext<FeatureFormContext>(
  {} as FeatureFormContext,
);

export interface FeatureFormProps {
  onSubmit?: (feature: z.infer<typeof FeatureSchema>) => any;
  updateFeature?: (
    name: string,
    feature: z.infer<typeof FeatureSchema>,
  ) => Promise<any>;
  initialValue?: z.infer<typeof FeatureSchema>;
}

export default function FeatureForm({ ...props }: FeatureFormProps) {
  const form = useForm<z.infer<typeof FeatureSchema>>({
    resolver: zodResolver(FeatureSchema),
    defaultValues: props.initialValue || {
      feature: "",
      type: "boolean",
      disable: false,
      trackEvents: true,
      defaultRule: {
        variation: "disabled",
      },
      variations: [
        {
          name: "disabled",
          value: false,
        },
        {
          name: "enabled",
          value: true,
        },
      ],
      metadata: [],
    },
  });

  const variations = useFieldArray({
    control: form.control,
    name: "variations",
  });

  const targeting = useFieldArray({
    control: form.control,
    name: "targeting",
  });

  const metadata = useFieldArray({
    control: form.control,
    name: "metadata",
  });

  const onSubmit = (feature: z.infer<typeof FeatureSchema>) => {
    if (props.onSubmit) {
      props.onSubmit(feature);
    }

    if (props.updateFeature) {
      props.updateFeature(feature.feature, feature);
    }
    //
  };

  return (
    <FeatureFormContext.Provider
      value={{ form, variations, targeting, metadata }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="col-span-1 flex flex-col flex-1 gap-4 md:gap-8">
              <Details />
              <Button>Submit</Button>
              <Debug />
            </div>
            <div className="col-span-2 flex flex-col flex-1 gap-4 md:gap-8">
              <Variations />
              <TargetingRules />
              <Metadata />
            </div>
          </div>
        </form>
      </Form>
    </FeatureFormContext.Provider>
  );
}
