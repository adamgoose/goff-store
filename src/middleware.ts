import { clerkMiddleware } from "@clerk/nextjs/server";
import { stackMiddlewares } from "./middleware/stack";
import {
  withPermissionGuardedRoutes,
  withProtectedRoutes,
  withSetupRoutes,
} from "./middleware/clerk";

export default clerkMiddleware(
  (auth, req, event) => {
    return stackMiddlewares(auth, [
      withProtectedRoutes,
      withSetupRoutes,
      withPermissionGuardedRoutes,
    ])(req, event);
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
