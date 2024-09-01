"use server";

import { FeatureSchema } from "@/components/forms/feature/schema";
import { db } from "@/db/client";
import { features } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function updateFeature(
  name: string,
  spec: z.infer<typeof FeatureSchema>,
) {
  await db().update(features).set({ spec }).where(eq(features.name, name));

  revalidatePath("/features");
  return redirect("/features");
}
