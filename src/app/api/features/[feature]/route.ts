import { db } from "@/db/client";
import { features } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { feature: string } },
) {
  auth().protect();

  const feat = await db().query.features.findFirst({
    where: eq(features.name, params.feature),
  });

  if (!feat) {
    return new Response("Feature not found", { status: 404 });
  }

  return Response.json(feat.spec);
}
