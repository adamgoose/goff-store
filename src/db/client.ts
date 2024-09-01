import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { features } from "./schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema: { features } });
