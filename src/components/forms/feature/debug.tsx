import { useContext } from "react";
import { FeatureFormContext } from "./feature-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Debug() {
  const { form } = useContext(FeatureFormContext);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <pre>{JSON.stringify(form.watch(), null, "  ")}</pre>
      </CardContent>
    </Card>
  );
}
