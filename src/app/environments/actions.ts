"use server";

import { db } from "@/db/client";
import { environments } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createEnvironment(name: string) {
  await db().insert(environments).values([{ name }]);

  revalidatePath("/environments");
}
