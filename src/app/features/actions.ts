"use server";

import { db } from "@/db/client";
import { features } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function deleteFeature(id: string) {
  await db.delete(features).where(eq(features.id, id));
}

export async function setDefaultVariation(id: string, variation: string) {
  const feature = await db.query.features.findFirst({
    where: eq(features.id, id),
  });

  if (!feature) {
    throw new Error("Feature not found");
  }

  const hasNamedVariation = feature.spec.variations.some(
    (v) => v.name == variation,
  );
  if (!hasNamedVariation) {
    throw new Error("Variation not found");
  }

  feature.spec.defaultRule.variation = variation;
  await db
    .update(features)
    .set({ spec: feature.spec })
    .where(eq(features.id, id));
}
