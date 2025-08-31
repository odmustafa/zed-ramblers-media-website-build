import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Submit a contact/quote request
export const submitContactRequest = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    message: v.string(),
    serviceType: v.string(),
    projectType: v.optional(v.string()),
    timeline: v.optional(v.string()),
    budget: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contactRequests", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
  },
});

// Get all contact requests (admin)
export const getAllContactRequests = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contactRequests")
      .order("desc")
      .collect();
  },
});

// Get contact requests by status (admin)
export const getContactRequestsByStatus = query({
  args: { status: v.union(v.literal("new"), v.literal("contacted"), v.literal("quoted"), v.literal("won"), v.literal("lost")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contactRequests")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

// Update contact request status (admin)
export const updateContactRequestStatus = mutation({
  args: {
    id: v.id("contactRequests"),
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("quoted"), v.literal("won"), v.literal("lost")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    await ctx.db.patch(args.id, {
      status: args.status,
      respondedAt: args.status !== "new" ? now : undefined,
    });
  },
});

// Get contact request by ID (admin)
export const getContactRequestById = query({
  args: { id: v.id("contactRequests") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
