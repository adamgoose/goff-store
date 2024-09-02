"use server";

import { createClient } from "@tursodatabase/api";
import { kv } from "@vercel/kv";

const turso = createClient({
  org: process.env.TURSO_ORG_NAME!,
  token: process.env.TURSO_API_TOKEN!,
});

function tenant(userId?: string, orgId?: string) {
  return (orgId || userId || "").toLowerCase().replaceAll("_", "-");
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
}

export async function destroyTenant(tenant: string) {
  await turso.databases.delete(tenant);
  await kv.del("tenant:" + tenant);
}
