import { db } from "@/db/client";
import { features } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";

export default async function Layout({
  params,
  children,
}: {
  params: { feature: string };
  children: React.ReactNode;
}) {
  await db().query.features.findFirst({
    where: eq(features.name, params.feature),
  });

  return children;
}
