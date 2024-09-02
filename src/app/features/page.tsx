import ImportFeatures from "@/components/modals/import-features";
import FeaturesTable from "@/components/tables/features";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { db } from "@/db/client";
import { features } from "@/db/schema";
import { Import, Plus } from "lucide-react";
import Link from "next/link";
import { importFeatures } from "./actions";
import { asc } from "drizzle-orm";
import RetrieverTokenDialog from "@/components/modals/retriever-token";
import Protect from "@/components/protect-server";

export const dynamic = "force-dynamic";

export default async function Features() {
  const data = await db().select().from(features).orderBy(asc(features.name));

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <Card className="col-span-2">
        <div className="flex justify-between">
          <CardHeader>
            <CardTitle>Features ({data.length})</CardTitle>
          </CardHeader>
          <div className="m-6 flex flex-row gap-4">
            <Protect permission="org:features:write">
              <ImportFeatures importFeatures={importFeatures}>
                <Button size="icon">
                  <Import />
                </Button>
              </ImportFeatures>
              <Tooltip>
                <TooltipTrigger>
                  <Button asChild size="icon">
                    <Link href="/features/create">
                      <Plus />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Add Feature</TooltipContent>
              </Tooltip>
            </Protect>
          </div>
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
        <CardFooter>
          <RetrieverTokenDialog>
            <Button>Get Retriever Token</Button>
          </RetrieverTokenDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
