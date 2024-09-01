"use client";

import FeatureForm from "@/components/forms/feature/feature-form";
import { createFeature } from "./actions";

export default function CreateFeature() {
  return <FeatureForm onSubmit={createFeature} />;
}
