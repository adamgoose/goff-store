import { db } from "@/db/client";
import { currentTenant } from "@/services/tenants";
import { auth } from "@clerk/nextjs/server";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  auth().protect();

  const { sessionClaims } = auth();
  const tenant = await currentTenant();

  const nbf = await kv.get<number>("nbf:" + tenant);
  if (nbf && (sessionClaims?.iat || 0) * 1000 < nbf) {
    return new NextResponse("Token Revoked", { status: 401 });
  }

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
          feature: undefined,
        },
      };
    }, {}),
  );
}
