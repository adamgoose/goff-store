import FeatureForm from "@/components/forms/feature/feature-form";
import { db } from "@/db/client";
import { features } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateFeature } from "./actions";

export default async function EditFeature({
  params,
}: {
  params: { feature: string };
}) {
  const feature = await db().query.features.findFirst({
    where: eq(features.name, params.feature),
  });

  return (
    <FeatureForm initialValue={feature?.spec} updateFeature={updateFeature} />
  );
}
