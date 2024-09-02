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
    name: z.string().min(1, {
      message: "Name is required",
    }),
    value: z.any(),
  }),
);

export const FeatureSchema = z
  .object({
    feature: z.string().min(3, {
      message: "Feature must be at least three characters",
    }),
    type: z.enum(["boolean", "number", "string", "json"]),
    disable: z.boolean().optional(),
    trackEvents: z.boolean().default(true).optional(),
    defaultRule: RuleSchema,
    targeting: z
      .array(
        RuleSchema,
        // RuleSchema.extend({
        //   name: z.string().min(1, {
        //     message: "This field is required",
        //   }),
        //   query: z.string().min(1, {
        //     message: "This field is required",
        //   }),
        // }),
      )
      .optional(),
    variations: Pairs,
    metadata: z.array(
      z.object({
        name: z.string().min(1, {
          message: "Name is required",
        }),
        value: z.string().min(1, {
          message: "Value is required",
        }),
      }),
    ),
  })
  .refine(
    (feature) =>
      feature.variations.some((v) => v.name == feature.defaultRule.variation),
    {
      path: ["defaultRule.variation"],
      message: "Default Variation must exist",
    },
  )
  .superRefine((feature, ctx) => {
    feature.variations.forEach((variation, i) => {
      let type = feature.type == "json" ? "object" : feature.type;
      if (typeof variation.value != type) {
        ctx.addIssue({
          code: z.ZodIssueCode.unrecognized_keys,
          path: [`variations.${i}.value`],
          keys: [variation.name],
          message: "Value must match selected type",
        });
      }
    });

    feature.targeting?.forEach((rule, i) => {
      if (!feature.variations.some((v) => v.name == rule.variation)) {
        ctx.addIssue({
          code: z.ZodIssueCode.unrecognized_keys,
          path: [`targeting.${i}.variation`],
          keys: [rule.variation],
          message: "Variation must exist",
        });
      }
    });
  });
