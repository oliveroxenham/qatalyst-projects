import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

export const getById = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});

export const getByFilter = query({
  args: {
    status: v.optional(v.string()),
    country: v.optional(v.string()),
    projectType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("projects");
    
    if (args.status) {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }
    if (args.country) {
      query = query.filter((q) => q.eq(q.field("country"), args.country));
    }
    if (args.projectType) {
      query = query.filter((q) => q.eq(q.field("projectType"), args.projectType));
    }
    
    return await query.collect();
  },
});

export const create = mutation({
  args: {
    projectName: v.string(),
    verraGsNumber: v.string(),
    country: v.string(),
    projectType: v.string(),
    methodology: v.string(),
    status: v.string(),
    issuanceTiming: v.string(),
    projectDeveloper: v.string(),
    projectArea: v.string(),
    projectLife: v.string(),
    creditType: v.string(),
    ccbGold: v.string(),
    ccpLabel: v.string(),
    corsiaLabel: v.string(),
    loaYN: v.string(),
    sylveraBeZeroRating: v.string(),
    sdgs: v.array(v.string()),
    estimatedEmissionReductions: v.object({
      projectLife: v.string(),
      annual: v.string(),
    }),
    owner: v.string(),
    created: v.string(),
    collaborators: v.array(v.string()),
    assessmentStatus: v.object({
      carbonAccounting: v.string(),
      permanence: v.string(),
      additionality: v.string(),
      coBenefitsSafeguarding: v.string(),
      financialAssessment: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", args);
  },
});