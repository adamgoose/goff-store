import { z } from "zod";

export const RuleSchema = z.object({
  name: z.string().optional(),
  query: z.string().optional(),
  variation: z.string(),
  percentage: z.record(z.string(), z.number()).optional(),
  disable: z.boolean().optional(),
});

export const Pairs = z.array(
  z.object({
    name: z.string(),
    value: z.any(),
  }),
);

export const FeatureSchema = z.object({
  feature: z.string({
    required_error: "You must name your feature!",
  }),
  type: z.enum(["boolean", "number", "string", "json"]),
  disabled: z.boolean(),
  tracked: z.boolean().default(true),
  defaultRule: RuleSchema,
  targeting: z.array(RuleSchema),
  variations: Pairs,
  metadata: Pairs,
});
