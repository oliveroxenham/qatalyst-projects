import { query } from "./_generated/server";

export const getDashboardData = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    
    // Calculate metrics
    const projectsInPortfolio = projects.length;
    const projectsUnderReview = projects.filter(p => 
      p.status === "Under Development" || p.status === "Under Validation"
    ).length;
    
    // Calculate total investment (mock data for now)
    const investmentUnderReview = 150000; // $150k
    const investmentDisbursed = 200000; // $200k
    
    // Calculate credits
    const creditsUnderReview = projects
      .filter(p => p.status === "Under Development" || p.status === "Under Validation")
      .reduce((sum, p) => {
        const annual = parseInt(p.estimatedEmissionReductions.annual.replace(/[^0-9]/g, '') || '0');
        return sum + annual;
      }, 0);
    
    const creditsContracted = projects
      .filter(p => p.status === "Registered")
      .reduce((sum, p) => {
        const annual = parseInt(p.estimatedEmissionReductions.annual.replace(/[^0-9]/g, '') || '0');
        return sum + annual;
      }, 0);
    
    // Value of credits (mock calculation - $10 per tCO2e)
    const valueUnderReview = creditsUnderReview * 10;
    const valueContracted = creditsContracted * 10;
    
    // Get country distribution
    const countryDistribution = projects.reduce((acc, project) => {
      acc[project.country] = (acc[project.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Get project types distribution
    const projectTypes = projects.reduce((acc, project) => {
      acc[project.projectType] = (acc[project.projectType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Mock monthly data for charts
    const monthlyData = [
      { month: "Jan", projectsUnderReview: 12000, creditsContracted: 8000 },
      { month: "Feb", projectsUnderReview: 11000, creditsContracted: 9000 },
      { month: "Mar", projectsUnderReview: 10000, creditsContracted: 10000 },
      { month: "Apr", projectsUnderReview: 9000, creditsContracted: 11000 },
      { month: "May", projectsUnderReview: 8000, creditsContracted: 12000 },
      { month: "Jun", projectsUnderReview: 7000, creditsContracted: 11000 },
      { month: "Jul", projectsUnderReview: 6000, creditsContracted: 10000 },
      { month: "Aug", projectsUnderReview: 5000, creditsContracted: 9000 },
      { month: "Sep", projectsUnderReview: 4000, creditsContracted: 8000 },
      { month: "Oct", projectsUnderReview: 4000, creditsContracted: 7000 },
      { month: "Nov", projectsUnderReview: 3000, creditsContracted: 6000 },
      { month: "Dec", projectsUnderReview: 3000, creditsContracted: 5000 },
    ];
    
    // Get recent projects (last 8)
    const recentProjects = projects
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
      .slice(0, 8)
      .map(p => ({
        id: p._id,
        projectName: p.projectName,
        country: p.country,
        projectType: p.projectType,
        methodology: p.methodology.split(' ')[0], // Short version
      }));
    
    // Mock action items
    const actionItems = [
      { 
        project: projects[0]?.projectName || "Project 1", 
        actionType: "Action", 
        responsible: "Person Responsible" 
      },
      { 
        project: projects[1]?.projectName || "Project 2", 
        actionType: "Action", 
        responsible: "Person Responsible" 
      },
      { 
        project: projects[2]?.projectName || "Project 3", 
        actionType: "Action", 
        responsible: "Person Responsible" 
      },
      { 
        project: projects[3]?.projectName || "Project 4", 
        actionType: "Action", 
        responsible: "Person Responsible" 
      },
      { 
        project: projects[4]?.projectName || "Project 5", 
        actionType: "Action", 
        responsible: "Person Responsible" 
      },
    ];
    
    return {
      metrics: {
        projectsInPortfolio,
        projectsUnderReview,
        investmentUnderReview,
        investmentDisbursed,
        creditsUnderReview,
        creditsContracted,
        valueUnderReview,
        valueContracted,
      },
      countryDistribution,
      projectTypes,
      monthlyData,
      recentProjects,
      actionItems,
    };
  },
});