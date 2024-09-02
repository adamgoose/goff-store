import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { tenantExists } from "./services/tenants";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/features(.*)"]);
const isSetupRoute = createRouteMatcher(["/setup(.*)"]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
    const { userId, orgId } = auth();
    const tenant = (orgId || userId || "").toLowerCase().replaceAll("_", "-");
    const exists = await tenantExists(tenant);

    if (!isSetupRoute(req) && !exists) {
      return NextResponse.redirect(new URL("/setup", req.url));
    }
    if (isSetupRoute(req) && exists) {
      return NextResponse.redirect(new URL("/features", req.url));
    }
  },
  {
    debug: false,
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
