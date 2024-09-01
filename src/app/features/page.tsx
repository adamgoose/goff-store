import FeaturesTable from "@/components/tables/features";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { db } from "@/db/client";
import { features } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Features() {
  auth().protect();
  const data = await db().select().from(features);

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <Card className="col-span-2">
        <div className="flex justify-between">
          <CardHeader>
            <CardTitle>Features ({data.length})</CardTitle>
          </CardHeader>
          <Tooltip>
            <TooltipTrigger>
              <Button asChild size="icon" className="m-6">
                <Link href="/features/create">
                  <Plus />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Add Feature</TooltipContent>
          </Tooltip>
        </div>
        <CardContent>
          <FeaturesTable data={data} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Configure Relay Proxy</CardTitle>
        </CardHeader>
        <CardContent>
          <pre>
            {`retriever:
  kind: http
  url: https://goff-store.vercel.app/api/features
  headers:
    Authorization: Bearer {TOKEN}
            `}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
