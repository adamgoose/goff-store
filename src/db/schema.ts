import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import { FeatureSchema } from "@/components/forms/feature/schema";

export const features = sqliteTable("features", {
  // id: text("id")
  //   .primaryKey()
  //   .$defaultFn(() => createId()),
  name: text("name").notNull().primaryKey(),
  spec: text("spec", { mode: "json" })
    .$type<z.infer<typeof FeatureSchema>>()
    .notNull(),
});

export const environments = sqliteTable("environments", {
  name: text("name").notNull().primaryKey(),
});
