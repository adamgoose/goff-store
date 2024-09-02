"use server";

import { FeatureSchema } from "@/components/forms/feature/schema";
import { z } from "zod";
import { db } from "@/db/client";
import { features } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFeature(feature: z.infer<typeof FeatureSchema>) {
  await db()
    .insert(features)
    .values([
      {
        name: feature.feature,
        spec: feature,
      },
    ]);

  revalidatePath("/features");
  return redirect("/features");
}
