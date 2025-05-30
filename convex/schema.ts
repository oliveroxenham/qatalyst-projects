import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
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
  }),
});