"use server";

import { db } from "@/db/client";
import { features } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function deleteFeature(name: string) {
  await db().delete(features).where(eq(features.name, name));
}

export async function setDefaultVariation(name: string, variation: string) {
  const feature = await db().query.features.findFirst({
    where: eq(features.name, name),
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
  await db()
    .update(features)
    .set({ spec: feature.spec })
    .where(eq(features.name, name));
}
