import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all available equipment
export const getAvailableEquipment = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("equipment")
      .withIndex("by_availability", (q) => q.eq("availability", true))
      .collect();
  },
});

// Get equipment by category
export const getEquipmentByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("equipment")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

// Get all equipment (admin)
export const getAllEquipment = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("equipment").collect();
  },
});

// Add new equipment (admin)
export const addEquipment = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.string(),
    pricePerDay: v.number(),
    pricePerWeek: v.number(),
    pricePerMonth: v.number(),
    availability: v.boolean(),
    imageUrl: v.optional(v.string()),
    specifications: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("equipment", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update equipment (admin)
export const updateEquipment = mutation({
  args: {
    id: v.id("equipment"),
    name: v.string(),
    description: v.string(),
    category: v.string(),
    pricePerDay: v.number(),
    pricePerWeek: v.number(),
    pricePerMonth: v.number(),
    availability: v.boolean(),
    imageUrl: v.optional(v.string()),
    specifications: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    await ctx.db.patch(id, {
      ...updateData,
      updatedAt: Date.now(),
    });
  },
});

// Delete equipment (admin)
export const deleteEquipment = mutation({
  args: { id: v.id("equipment") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Submit rental request
export const addRentalRequest = mutation({
  args: {
    equipmentId: v.id("equipment"),
    startDate: v.number(),
    endDate: v.number(),
    totalPrice: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get or create user in our database
    let user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    // If user doesn't exist, create them automatically
    if (!user) {
      const userId = await ctx.db.insert("users", {
        clerkId: identity.subject,
        email: identity.email || "",
        firstName: identity.givenName || undefined,
        lastName: identity.familyName || undefined,
        role: "client",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      user = await ctx.db.get(userId);
      if (!user) {
        throw new Error("Failed to create user. Please try again.");
      }
    }

    return await ctx.db.insert("rentalRequests", {
      userId: user.clerkId,
      equipmentId: args.equipmentId,
      startDate: args.startDate,
      endDate: args.endDate,
      totalPrice: args.totalPrice,
      status: "pending",
      notes: args.notes,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Get rental requests for current user
export const getUserRentalRequests = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    // Check if user exists in our database, if not create them
    let user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      // For queries, we can't create users, so just return empty array
      // User will be created when they perform their first mutation
      return [];
    }

    return await ctx.db
      .query("rentalRequests")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();
  },
});

// Get all rental requests (admin)
export const getAllRentalRequests = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user.role !== "admin") {
      throw new Error("Not authorized");
    }

    return await ctx.db
      .query("rentalRequests")
      .order("desc")
      .collect();
  },
});

// Update rental request status (admin)
export const updateRentalRequestStatus = mutation({
  args: {
    id: v.id("rentalRequests"),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user.role !== "admin") {
      throw new Error("Not authorized");
    }

    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

// Get rental requests by equipment ID
export const getRentalRequestsByEquipment = query({
  args: { equipmentId: v.id("equipment") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rentalRequests")
      .withIndex("by_equipment", (q: any) => q.eq("equipmentId", args.equipmentId))
      .collect();
  },
});
