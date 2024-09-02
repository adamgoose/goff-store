"use server";

import { createTenant } from "@/services/tenants";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function setupTenant() {
  const { userId, orgId } = auth();
  if (!orgId && !userId) {
    throw new Error("unauthenticated");
  }

  const tenant = (orgId || userId).toLowerCase().replaceAll("_", "-");
  await createTenant(tenant);

  return redirect("/features");
}
