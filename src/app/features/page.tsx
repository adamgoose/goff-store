import FeaturesTable from "@/components/tables/features";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/db/client";
import { features } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Features() {
  const data = await db.select().from(features);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Features ({data.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <FeaturesTable data={data} />
      </CardContent>
    </Card>
  );
}
