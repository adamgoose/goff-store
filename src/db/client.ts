import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { features } from "./schema";
import { auth } from "@clerk/nextjs/server";

export const db = () => {
  const { orgId, userId } = auth();
  if (!orgId && !userId) {
    throw new Error("unauthenticated");
  }

  const tenant = (orgId || userId).toLowerCase().replaceAll("_", "-");
  console.log("TENANT", tenant);
  const url = `libsql://${tenant}-${process.env.TURSO_ORG_NAME}.turso.io`;
  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  return drizzle(client, { schema: { features } });
};
