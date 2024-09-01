import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: `libsql://${process.env.TURSO_SCHEMA_DATABASE}-${process.env.TURSO_ORG_NAME}.turso.io`,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
