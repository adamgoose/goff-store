import { db } from "@/db/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Protect from "@/components/protect-server";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateEnvironmentDialog from "@/components/modals/create-environment";
import EnvironmentsTable from "@/components/tables/environments";

export const dynamic = "force-dynamic";

export default async function Environments() {
  const environments = await db().query.environments.findMany();
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <Card className="col-span-2">
        <div className="flex justify-between">
          <CardHeader>
            <CardTitle>Environments ({environments.length})</CardTitle>
          </CardHeader>
          <div className="m-6 flex flex-row gap-4">
            <Protect permission="org:environment:write">
              <CreateEnvironmentDialog>
                <Button size="icon">
                  <Plus />
                </Button>
              </CreateEnvironmentDialog>
            </Protect>
          </div>
        </div>
        <CardContent>
          <EnvironmentsTable data={environments} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>How to use Environments</CardTitle>
        </CardHeader>
        <CardContent>Intelligently</CardContent>
      </Card>
    </div>
  );
}
