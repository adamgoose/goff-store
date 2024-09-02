import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ConfirmPopover from "@/components/ui/confirm-popover";
import { OctagonX } from "lucide-react";
import { destroyAccount } from "./actions";

export default function SupportPage() {
  return (
    <div className="grid grid-cols-3 gap-4 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Destroy Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <OctagonX />
            <AlertTitle>Destructive Action</AlertTitle>
            <AlertDescription>
              Deleting this account is permanent, and cannot be undone!
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <ConfirmPopover handleConfirm={destroyAccount}>
            <Button variant="destructive">Destroy Account</Button>
          </ConfirmPopover>
        </CardFooter>
      </Card>
    </div>
  );
}
