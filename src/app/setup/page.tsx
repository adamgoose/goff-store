"use client";

import { Button } from "@/components/ui/button";
import { setupTenant } from "./actions";

export default function SetupPage() {
  return <Button onClick={() => setupTenant()}>Get Started</Button>;
}
