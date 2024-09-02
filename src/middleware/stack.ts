import { ClerkMiddlewareAuth } from "@clerk/nextjs/server";
import { NextMiddleware, NextResponse } from "next/server";

export type MiddlewareFactory = (
  middleware: NextMiddleware,
  auth: ClerkMiddlewareAuth,
) => NextMiddleware;

export function stackMiddlewares(
  auth: ClerkMiddlewareAuth,
  functions: MiddlewareFactory[] = [],
  index = 0,
): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(auth, functions, index + 1);
    return current(next, auth);
  }
  return () => NextResponse.next();
}
