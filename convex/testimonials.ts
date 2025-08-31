import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all featured testimonials
export const getFeaturedTestimonials = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .collect();
  },
});

// Get all testimonials (admin)
export const getAllTestimonials = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .order("desc")
      .collect();
  },
});

// Get testimonials by rating
export const getTestimonialsByRating = query({
  args: { minRating: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("testimonials")
      .withIndex("by_rating", (q) => q.gte("rating", args.minRating))
      .order("desc")
      .collect();
  },
});

// Add new testimonial (admin)
export const addTestimonial = mutation({
  args: {
    clientName: v.string(),
    clientCompany: v.optional(v.string()),
    content: v.string(),
    rating: v.number(),
    projectType: v.string(),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("testimonials", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Update testimonial (admin)
export const updateTestimonial = mutation({
  args: {
    id: v.id("testimonials"),
    clientName: v.string(),
    clientCompany: v.optional(v.string()),
    content: v.string(),
    rating: v.number(),
    projectType: v.string(),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    await ctx.db.patch(id, updateData);
  },
});

// Delete testimonial (admin)
export const deleteTestimonial = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Seed testimonials data
export const seedTestimonials = mutation({
  args: {},
  handler: async (ctx) => {
    const existingTestimonials = await ctx.db
      .query("testimonials")
      .collect();

    if (existingTestimonials.length > 0) {
      return { success: true, message: "Testimonials already seeded" };
    }

    const testimonialsData = [
      {
        clientName: "Sarah Johnson",
        clientCompany: "TechCorp Industries",
        content: "Ramblers Media exceeded our expectations with their corporate training video series. The team was professional, creative, and delivered exactly what we needed on time and within budget. The final product has been instrumental in our employee onboarding process.",
        rating: 5,
        projectType: "Video Advertising",
        featured: true,
        createdAt: Date.now(),
      },
      {
        clientName: "Michael Rodriguez",
        clientCompany: "Creative Arts Collective",
        content: "Working with Ramblers Media on our music video was an incredible experience. They brought our artistic vision to life with stunning cinematography and creative direction. The attention to detail and professional execution was outstanding.",
        rating: 5,
        projectType: "Music Videos",
        featured: true,
        createdAt: Date.now(),
      },
      {
        clientName: "Emily Chen",
        clientCompany: "Indie Film Productions",
        content: "From concept to final cut, Ramblers Media delivered exceptional film production services. Their storytelling expertise and high-quality production values helped us create a compelling narrative that resonated with our audience.",
        rating: 5,
        projectType: "Film Production",
        featured: true,
        createdAt: Date.now(),
      },
      {
        clientName: "David Thompson",
        clientCompany: "Marketing Solutions Inc.",
        content: "The video advertising campaign created by Ramblers Media drove incredible engagement for our brand. Their understanding of our target audience and creative approach resulted in content that truly delivered results.",
        rating: 5,
        projectType: "Video Advertising",
        featured: true,
        createdAt: Date.now(),
      },
      {
        clientName: "Lisa Park",
        clientCompany: "Entertainment Group",
        content: "Ramblers Media's professionalism and creativity shine through in every project. They consistently deliver high-quality work that exceeds expectations. Their team is responsive, talented, and a pleasure to work with.",
        rating: 5,
        projectType: "Music Videos",
        featured: false,
        createdAt: Date.now(),
      },
      {
        clientName: "James Wilson",
        clientCompany: "Documentary Films LLC",
        content: "The documentary work produced by Ramblers Media was exceptional. Their ability to capture authentic moments and weave them into a compelling narrative is truly impressive. Highly recommended for any film production needs.",
        rating: 5,
        projectType: "Film Production",
        featured: false,
        createdAt: Date.now(),
      },
    ];

    for (const testimonial of testimonialsData) {
      await ctx.db.insert("testimonials", testimonial);
    }

    return { success: true, message: "Testimonials seeded successfully" };
  },
});
