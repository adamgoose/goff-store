"use server";

import { destroyTenant } from "@/services/tenants";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function destroyAccount() {
  const { userId, orgId } = auth();
  if (!orgId && !userId) {
    throw new Error("unauthorized");
  }

  const tenant = (orgId || userId).toLowerCase().replaceAll("_", "-");
  await destroyTenant(tenant);

  return redirect("/setup");
}
