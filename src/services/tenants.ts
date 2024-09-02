"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@tursodatabase/api";
import { kv } from "@vercel/kv";

const turso = createClient({
  org: process.env.TURSO_ORG_NAME!,
  token: process.env.TURSO_API_TOKEN!,
});

export async function mkTenant(userId: string | null, orgId?: string | null) {
  return (orgId || userId || "").toLowerCase().replaceAll("_", "-");
}

export async function currentTenant() {
  const { userId, orgId } = auth();
  return await mkTenant(userId, orgId);
}

export async function tenantExists(tenant: string) {
  return !!(await kv.get("tenant:" + tenant));
}

export async function createTenant(tenant: string) {
  if (await tenantExists(tenant)) return;

  const db = await turso.databases.create(tenant, {
    group: "goff-store",
    schema: process.env.TURSO_SCHEMA_DATABASE!,
  });

  await kv.set("tenant:" + tenant, db);
  await setNbf(tenant);
}

export async function destroyTenant(tenant: string) {
  await turso.databases.delete(tenant);
  await kv.del("tenant:" + tenant);
}

export async function setNbf(tenant: string) {
  await kv.set("nbf:" + tenant, Date.now());
}
