"use server";

import { FeatureSchema } from "@/components/forms/feature/schema";
import { z } from "zod";
import { db } from "@/db/client";
import { features } from "@/db/schema";

export async function createFeature(feature: z.infer<typeof FeatureSchema>) {
  const result = await db()
    .insert(features)
    .values([
      {
        name: feature.feature,
        spec: feature,
      },
    ]);

  return result.toJSON();
}
