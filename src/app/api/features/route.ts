import { db } from "@/db/client";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  auth().protect();

  const features = await db().query.features.findMany();

  return Response.json(
    features.reduce((acc, feature) => {
      return {
        ...acc,
        [feature.name]: {
          ...feature.spec,
          variations: feature.spec.variations.reduce(
            (acc, variation) => ({
              ...acc,
              [variation.name]: variation.value,
            }),
            {},
          ),
          metadata: feature.spec.metadata.reduce(
            (acc, metadata) => ({
              ...acc,
              [metadata.name]: metadata.value,
            }),
            {},
          ),
          type: undefined,
        },
      };
    }, {}),
  );
}
