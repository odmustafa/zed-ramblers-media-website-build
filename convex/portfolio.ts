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
        title: "Ramblers Media Demo Reel",
        description: "Demo reel showcasing various projects produced by Ramblers Media Productions. A comprehensive overview of our video production capabilities across multiple formats and styles.",
        category: "Film Production",
        clientName: "Ramblers Media",
        clientCompany: "Ramblers Media Productions",
        videoUrl: "https://vimeo.com/262274926",
        videoType: "vimeo" as const,
        thumbnailUrl: "https://i.vimeocdn.com/video/691504548-9bd63ca14a442e74dfd5c9d177c91b5658c552d575a1cb21084cac1ad547ae57-d_640?region=us",
        featured: true,
        published: true,
        order: 1,
        tags: ["demo reel", "film production", "showcase", "various projects"]
      },
      {
        title: "Stereo Scenario - Open Your Mind (Official Music Video)",
        description: "Official music video for Stereo Scenario's 'Open Your Mind'. Professional music video production featuring creative cinematography and artistic direction. ©2014 Ramblers Media Productions/Stereo Scenario.",
        category: "Music Videos",
        clientName: "Stereo Scenario",
        clientCompany: "Stereo Scenario",
        videoUrl: "https://vimeo.com/107423141",
        videoType: "vimeo" as const,
        thumbnailUrl: "https://i.vimeocdn.com/video/490821304-0b386299d2e9bfef611268c74e8d50c6b44cac6986e7f178af4a6fff6aee5aa1-d_640?region=us",
        featured: true,
        published: true,
        order: 2,
        tags: ["music video", "stereo scenario", "official", "creative direction"]
      },
      {
        title: "Jarritos Commercial",
        description: "Professional commercial production for Jarritos featuring vibrant visuals and engaging storytelling. High-quality video advertising that captures the brand's authentic Mexican heritage and refreshing appeal.",
        category: "Video Advertising",
        clientName: "Jarritos",
        clientCompany: "Jarritos",
        videoUrl: "https://vimeo.com/263275698",
        videoType: "vimeo" as const,
        thumbnailUrl: "https://i.vimeocdn.com/video/692766727-3e079fc8d32575fc2d09f4d8f0023876ceb57f9b4a4d13e60f612a778ddcf3bd-d_640?region=us",
        featured: true,
        published: true,
        order: 3,
        tags: ["commercial", "video advertising", "brand", "jarritos"]
      },
      {
        title: "Stereo Scenario - Are We (Official Music Video) REMASTERED",
        description: "'Are We' by Stereo Scenario - remastered official music video showcasing enhanced visual quality and professional music video production. ©2013 Ramblers Media Productions.",
        category: "Music Videos",
        clientName: "Stereo Scenario",
        clientCompany: "Stereo Scenario",
        videoUrl: "https://vimeo.com/130045627",
        videoType: "vimeo" as const,
        thumbnailUrl: "https://i.vimeocdn.com/video/522017004-45967e2abb8a6a1e984989efac42329c86fc56c1cfe796333ee98a281e9a71d9-d_640?region=us",
        featured: true,
        published: true,
        order: 4,
        tags: ["music video", "stereo scenario", "remastered", "official"]
      },
      {
        title: "Stereo Scenario - Rhythm of Life (Official Music Video)",
        description: "Official music video for Stereo Scenario's 'Rhythm of Life' featuring dynamic cinematography and creative visual storytelling. ©2015 Ramblers Media Productions/Stereo Scenario.",
        category: "Music Videos",
        clientName: "Stereo Scenario",
        clientCompany: "Stereo Scenario",
        videoUrl: "https://vimeo.com/126965340",
        videoType: "vimeo" as const,
        thumbnailUrl: "https://i.vimeocdn.com/video/517881784-f4cca7bc99f2fdb4215f13c4d3b5eac3f49048473e6cc07af68e0b75747275d5-d_640?region=us",
        featured: false,
        published: true,
        order: 5,
        tags: ["music video", "stereo scenario", "official", "rhythm of life"]
      },
      {
        title: "Angelino CrossFit (60sec.)",
        description: "High-energy 60-second promotional video for Angelino CrossFit showcasing the intensity and community of CrossFit training. Professional fitness video production with dynamic camera work. ©2015 Ramblers Media Productions.",
        category: "Video Advertising",
        clientName: "Angelino CrossFit",
        clientCompany: "Angelino CrossFit",
        videoUrl: "https://vimeo.com/121447803",
        videoType: "vimeo" as const,
        thumbnailUrl: "https://i.vimeocdn.com/video/509787042-abcc41b92e97ac424e9bbcd9230db63d16369c639c5dbe649f749d045c451203-d_640?region=us",
        featured: false,
        published: true,
        order: 6,
        tags: ["fitness", "crossfit", "promotional", "60 second"]
      },
      {
        title: "Pamela Anderson Shoot (Sample)",
        description: "Professional video production sample featuring high-end cinematography and production values. Showcases our capability in celebrity and high-profile video production work.",
        category: "Film Production",
        clientName: "Celebrity Client",
        clientCompany: "Entertainment Industry",
        videoUrl: "https://vimeo.com/123123552",
        videoType: "vimeo" as const,
        thumbnailUrl: "https://i.vimeocdn.com/video/512334338-c95104e70e80f1d4107409e41c2a46551667324d1585a1cb392d9436e15d3a8b-d_640?region=us",
        featured: false,
        published: true,
        order: 7,
        tags: ["celebrity", "high-end", "sample", "professional"]
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
