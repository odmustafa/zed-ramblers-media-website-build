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
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed")
    ),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // For now, we'll use a placeholder userId - in production this would come from Clerk auth
    const userId = "placeholder-user-id";

    return await ctx.db.insert("rentalRequests", {
      userId,
      equipmentId: args.equipmentId,
      startDate: args.startDate,
      endDate: args.endDate,
      totalPrice: args.totalPrice,
      status: args.status,
      notes: args.notes,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Get rental requests for a user
export const getUserRentalRequests = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rentalRequests")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get all rental requests (admin)
export const getAllRentalRequests = query({
  args: {},
  handler: async (ctx) => {
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
