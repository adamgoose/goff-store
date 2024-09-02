import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stack";
import { createRouteMatcher } from "@clerk/nextjs/server";
import { mkTenant, tenantExists } from "../services/tenants";
import { notFound } from "next/navigation";

const isProtectedRoute = createRouteMatcher(["/features(.*)"]);
export const withProtectedRoutes: MiddlewareFactory = (next, auth) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    if (isProtectedRoute(req)) {
      auth().protect();
    }

    return next(req, _next);
  };
};

const isSetupRoute = createRouteMatcher(["/setup(.*)"]);
export const withSetupRoutes: MiddlewareFactory = (next, auth) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const { userId, orgId } = auth();
    const tenant = await mkTenant(userId, orgId);
    const exists = await tenantExists(tenant);

    if (!isSetupRoute(req) && !exists) {
      return NextResponse.redirect(new URL("/setup", req.url));
    }
    if (isSetupRoute(req) && exists) {
      return NextResponse.redirect(new URL("/features", req.url));
    }

    return next(req, _next);
  };
};

const permissionGuards = [
  {
    matcher: createRouteMatcher(["/support(.*)"]),
    permission: "org:account:support",
  },
  {
    matcher: createRouteMatcher(["/features/create(.*)"]),
    permission: "org:features:write",
  },
];

export const withPermissionGuardedRoutes: MiddlewareFactory = (next, auth) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const { orgId, has } = auth();

    if (!orgId) {
      return next(req, _next);
    }

    for (const i in permissionGuards) {
      const guard = permissionGuards[i];

      if (guard.matcher(req) && !has({ permission: guard.permission })) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return next(req, _next);
  };
};
