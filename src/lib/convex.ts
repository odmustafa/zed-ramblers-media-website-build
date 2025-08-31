import { ConvexReactClient } from "convex/react";

// Use environment variable with fallback
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://optimistic-bear-863.convex.cloud";

const convex = new ConvexReactClient(convexUrl);

export default convex;
