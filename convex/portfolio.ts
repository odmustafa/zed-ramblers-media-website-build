import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all published portfolio items
export const getPublishedPortfolio = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("portfolio")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("asc")
      .collect();
  },
});

// Get featured portfolio items
export const getFeaturedPortfolio = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("portfolio")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("asc")
      .collect();
  },
});

// Get portfolio items by category
export const getPortfolioByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("portfolio")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .filter((q) => q.eq(q.field("published"), true))
      .order("asc")
      .collect();
  },
});

// Get all portfolio items (admin)
export const getAllPortfolio = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("portfolio")
      .withIndex("by_order")
      .order("asc")
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
    const portfolio = await ctx.db
      .query("portfolio")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("asc")
      .collect();

    // Extract unique categories
    const categories = [...new Set(portfolio.map(item => item.category))];

    return categories.sort();
  },
});

// Delete all portfolio items (admin)
export const deleteAllPortfolio = mutation({
  args: {},
  handler: async (ctx) => {
    const allPortfolio = await ctx.db
      .query("portfolio")
      .collect();

    for (const item of allPortfolio) {
      await ctx.db.delete(item._id);
    }

    return { success: true, message: `Deleted ${allPortfolio.length} portfolio items` };
  },
});

// Seed portfolio data
export const seedPortfolio = mutation({
  args: {},
  handler: async (ctx) => {
    const existingPortfolio = await ctx.db
      .query("portfolio")
      .order("asc")
      .collect();

    if (existingPortfolio.length > 0) {
      console.log("Portfolio already seeded");
      return;
    }

    const portfolioData = [
      {
        title: "Brand Campaign Video",
        description: "High-impact video advertising campaign for a leading tech company. Features dynamic cinematography, compelling storytelling, and performance-driven content that delivered exceptional engagement rates.",
        category: "Video Advertising",
        clientName: "Sarah Johnson",
        clientCompany: "TechCorp Industries",
        videoUrl: "https://vimeo.com/rmp/brand-campaign-2024",
        videoType: "vimeo" as const,
        thumbnailUrl: "",
        featured: true,
        published: true,
        order: 1,
        tags: ["video advertising", "brand campaign", "storytelling", "engagement"]
      },
      {
        title: "Indie Artist Music Video",
        description: "Creative music video production featuring innovative cinematography and artistic direction. Shot on location with professional lighting and post-production effects that perfectly complement the artist's vision.",
        category: "Music Videos",
        clientName: "Alex Rivera",
        clientCompany: "Independent Artist",
        videoUrl: "https://vimeo.com/rmp/indie-music-video",
        videoType: "vimeo" as const,
        thumbnailUrl: "",
        featured: true,
        published: true,
        order: 2,
        tags: ["music video", "indie artist", "cinematography", "creative direction"]
      },
      {
        title: "Short Film Production",
        description: "Compelling narrative short film showcasing our complete production capabilities from concept to final cut. Features professional cinematography, sound design, and post-production excellence.",
        category: "Film Production",
        clientName: "Director Maria Santos",
        clientCompany: "Independent Film Collective",
        videoUrl: "https://vimeo.com/rmp/short-film-2024",
        videoType: "vimeo" as const,
        thumbnailUrl: "",
        featured: true,
        published: true,
        order: 3,
        tags: ["film production", "narrative", "cinematography", "post-production"]
      },
      {
        title: "Product Advertisement",
        description: "Dynamic product advertisement combining sleek visuals with persuasive messaging. Optimized for multiple platforms and designed to drive conversions and brand awareness.",
        category: "Video Advertising",
        clientName: "Marketing Director",
        clientCompany: "InnovateLabs",
        videoUrl: "https://vimeo.com/rmp/product-ad-campaign",
        videoType: "vimeo" as const,
        thumbnailUrl: "",
        featured: false,
        published: true,
        order: 4,
        tags: ["video advertising", "product", "conversion", "multi-platform"]
      },
      {
        title: "Music Video - Electronic Artist",
        description: "Visually stunning music video for an electronic music artist featuring synchronized lighting effects, creative camera work, and seamless integration of visual effects with the musical rhythm.",
        category: "Music Videos",
        clientName: "DJ Phoenix",
        clientCompany: "Electronic Music Collective",
        videoUrl: "https://vimeo.com/rmp/electronic-music-video",
        videoType: "vimeo" as const,
        thumbnailUrl: "",
        featured: false,
        published: true,
        order: 5,
        tags: ["music video", "electronic", "visual effects", "lighting"]
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
