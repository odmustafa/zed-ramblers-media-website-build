import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all published portfolio items
export const getPublishedPortfolio = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("portfolio")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
  },
});

// Get featured portfolio items
export const getFeaturedPortfolio = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("portfolio")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});

// Get portfolio items by category
export const getPortfolioByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("portfolio")
      .filter((q) => q.eq(q.field("category"), args.category))
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
  },
});

// Get all portfolio items (admin)
export const getAllPortfolio = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("portfolio")
      .collect();
  },
});

// Get portfolio item by ID
export const getPortfolioById = query({
  args: { id: v.id("portfolio") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Add new portfolio item
export const addPortfolioItem = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    category: v.string(),
    clientName: v.optional(v.string()),
    clientCompany: v.optional(v.string()),
    videoUrl: v.string(),
    videoType: v.union(
      v.literal("youtube"),
      v.literal("vimeo"),
      v.literal("direct"),
      v.literal("embed")
    ),
    thumbnailUrl: v.optional(v.string()),
    featured: v.boolean(),
    published: v.boolean(),
    order: v.number(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    return await ctx.db.insert("portfolio", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update portfolio item
export const updatePortfolioItem = mutation({
  args: {
    id: v.id("portfolio"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    clientName: v.optional(v.string()),
    clientCompany: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    videoType: v.optional(v.union(
      v.literal("youtube"),
      v.literal("vimeo"),
      v.literal("direct"),
      v.literal("embed")
    )),
    thumbnailUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    published: v.optional(v.boolean()),
    order: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete portfolio item
export const deletePortfolioItem = mutation({
  args: { id: v.id("portfolio") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Update portfolio order
export const updatePortfolioOrder = mutation({
  args: {
    items: v.array(v.object({
      id: v.id("portfolio"),
      order: v.number(),
    }))
  },
  handler: async (ctx, args) => {
    for (const item of args.items) {
      await ctx.db.patch(item.id, {
        order: item.order,
        updatedAt: Date.now(),
      });
    }
  },
});

// Get portfolio categories
export const getPortfolioCategories = query({
  args: {},
  handler: async (ctx) => {
    const portfolio = await ctx.db.query("portfolio").collect();

    // Extract unique categories
    const categories = [...new Set(portfolio.map(item => item.category))];

    return categories.sort();
  },
});

// Seed portfolio data
export const seedPortfolio = mutation({
  args: {},
  handler: async (ctx) => {
    const existingPortfolio = await ctx.db.query("portfolio").collect();

    if (existingPortfolio.length > 0) {
      console.log("Portfolio already seeded");
      return;
    }

    const portfolioData = [
      {
        title: "Corporate Training Video Series",
        description: "A comprehensive training video series for a Fortune 500 company's employee onboarding program. Features professional narration, custom animations, and interactive elements.",
        category: "Corporate",
        clientName: "Sarah Johnson",
        clientCompany: "TechCorp Industries",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        videoType: "youtube" as const,
        thumbnailUrl: "",
        featured: true,
        published: true,
        order: 1,
        tags: ["corporate", "training", "animation", "narration"]
      },
      {
        title: "Product Launch Commercial",
        description: "High-energy commercial for a revolutionary tech product's market launch. Utilized drone cinematography, LED lighting arrays, and post-production visual effects.",
        category: "Commercial",
        clientName: "Mike Chen",
        clientCompany: "InnovateLabs",
        videoUrl: "https://vimeo.com/76979871",
        videoType: "vimeo" as const,
        thumbnailUrl: "",
        featured: true,
        published: true,
        order: 2,
        tags: ["commercial", "product launch", "drone", "VFX"]
      },
      {
        title: "Wedding Ceremony Coverage",
        description: "Intimate wedding ceremony documentation capturing the emotional moments of a beautiful outdoor celebration. Shot with multiple camera angles and professional audio recording.",
        category: "Wedding",
        clientName: "Emily & David",
        clientCompany: "",
        videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
        videoType: "youtube" as const,
        thumbnailUrl: "",
        featured: false,
        published: true,
        order: 3,
        tags: ["wedding", "ceremony", "emotional", "multi-camera"]
      },
      {
        title: "Live Event Streaming Setup",
        description: "Complete live streaming solution for a major corporate conference. Included 4K camera setup, professional lighting, and real-time streaming to thousands of remote viewers.",
        category: "Live Streaming",
        clientName: "Conference Director",
        clientCompany: "Global Tech Summit",
        videoUrl: "https://vimeo.com/253989945",
        videoType: "vimeo" as const,
        thumbnailUrl: "",
        featured: false,
        published: true,
        order: 4,
        tags: ["live streaming", "conference", "4K", "professional lighting"]
      },
      {
        title: "Documentary Short Film",
        description: "Award-winning short documentary exploring community resilience. Features intimate interviews, stunning b-roll footage, and a compelling narrative arc.",
        category: "Documentary",
        clientName: "Director",
        clientCompany: "Community Stories Project",
        videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
        videoType: "youtube" as const,
        thumbnailUrl: "",
        featured: true,
        published: true,
        order: 5,
        tags: ["documentary", "interviews", "community", "award-winning"]
      }
    ];

    for (const item of portfolioData) {
      await ctx.db.insert("portfolio", {
        ...item,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    console.log("Portfolio seeded successfully");
  },
});
