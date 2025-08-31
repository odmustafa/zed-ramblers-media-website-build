'use client'

import { ConvexProvider, ConvexReactClient } from "convex/react";
import convex from "@/lib/convex";

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // If no Convex URL is available, render children without Convex provider
  if (!process.env.NEXT_PUBLIC_CONVEX_URL && typeof window !== 'undefined') {
    console.warn('Convex URL not configured, some features may not work');
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
