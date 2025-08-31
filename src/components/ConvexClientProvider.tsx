'use client'

import { ConvexProvider, ConvexReactClient } from "convex/react";
import convex from "@/lib/convex";

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only initialize Convex if we have a valid URL
  if (!process.env.NEXT_PUBLIC_CONVEX_URL && typeof window === 'undefined') {
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
