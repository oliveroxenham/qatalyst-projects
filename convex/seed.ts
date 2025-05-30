import { mutation } from "./_generated/server";
import projectsData from "../mock/projects-data.json";

export const seedProjects = mutation({
  handler: async (ctx) => {
    // Check if projects already exist
    const existingProjects = await ctx.db.query("projects").collect();
    
    if (existingProjects.length > 0) {
      console.log("Projects already seeded");
      return { message: "Projects already exist in database" };
    }
    
    // Insert all projects from mock data
    for (const project of projectsData) {
      await ctx.db.insert("projects", project);
    }
    
    return { message: `Successfully seeded ${projectsData.length} projects` };
  },
});