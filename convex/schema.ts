import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Content management tables
  pages: defineTable({
    slug: v.string(),
    title: v.string(),
    content: v.string(),
    metaDescription: v.string(),
    metaTitle: v.string(),
    published: v.boolean(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published"]),

  // Equipment rental system
  equipment: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(), // Camera, Lighting, Audio, etc.
    pricePerDay: v.number(),
    pricePerWeek: v.number(),
    pricePerMonth: v.number(),
    availability: v.boolean(),
    imageUrl: v.optional(v.string()),
    specifications: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_availability", ["availability"]),

  // Rental requests
  rentalRequests: defineTable({
    userId: v.string(),
    equipmentId: v.id("equipment"),
    startDate: v.number(),
    endDate: v.number(),
    totalPrice: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed")
    ),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_equipment", ["equipmentId"])
    .index("by_status", ["status"]),

  // Contact/quote requests
  contactRequests: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    message: v.string(),
    serviceType: v.string(),
    projectType: v.optional(v.string()),
    timeline: v.optional(v.string()),
    budget: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("quoted"),
      v.literal("won"),
      v.literal("lost")
    ),
    createdAt: v.number(),
    respondedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),

  // User management (for admin purposes)
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("client"),
      v.literal("prospect")
    ),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    company: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  // Analytics and metrics
  pageViews: defineTable({
    page: v.string(),
    userId: v.optional(v.string()),
    sessionId: v.string(),
    timestamp: v.number(),
    userAgent: v.string(),
    referrer: v.optional(v.string()),
  })
    .index("by_page", ["page"])
    .index("by_timestamp", ["timestamp"]),

  // Testimonials/reviews
  testimonials: defineTable({
    clientName: v.string(),
    clientCompany: v.optional(v.string()),
    content: v.string(),
    rating: v.number(), // 1-5
    projectType: v.string(),
    featured: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_featured", ["featured"])
    .index("by_rating", ["rating"]),

  // Portfolio/reel items
  portfolio: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(), // Commercial, Corporate, Event, etc.
    clientName: v.optional(v.string()),
    clientCompany: v.optional(v.string()),
    videoUrl: v.string(), // YouTube, Vimeo, or direct video URL
    videoType: v.union(
      v.literal("youtube"),
      v.literal("vimeo"),
      v.literal("direct"),
      v.literal("embed")
    ),
    thumbnailUrl: v.optional(v.string()),
    featured: v.boolean(),
    published: v.boolean(),
    order: v.number(), // For custom ordering
    tags: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_featured", ["featured"])
    .index("by_published", ["published"])
    .index("by_order", ["order"]),
});
