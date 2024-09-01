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
    disabled: z.boolean(),
    trackEvents: z.boolean().default(true),
    defaultRule: RuleSchema,
    targeting: z.array(
      RuleSchema.extend({
        name: z.string().min(1, {
          message: "This field is required",
        }),
        query: z.string().min(1, {
          message: "This field is required",
        }),
      }),
    ),
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
      if (typeof variation.value != feature.type) {
        ctx.addIssue({
          code: z.ZodIssueCode.unrecognized_keys,
          path: [`variations.${i}.value`],
          keys: [variation.name],
          message: "Value must match selected type",
        });
      }
    });

    feature.targeting.forEach((rule, i) => {
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
// .refine(
//   (feature) =>
//     feature.variations.every((v) => {
//       switch (feature.type) {
//         case "string":
//           return typeof v == "string";
//         case "number":
//           return typeof v == "number";
//         case "boolean":
//           return typeof v == "boolean";
//         case "json":
//           return true;
//       }
//     }),
//   {
//     path: ["variations.0.value"],
//     message: "Values must match selected type",
//   },
// );
