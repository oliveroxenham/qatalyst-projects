'use client';

import { TopBar } from '@/components/topbar';
import { WorldMap } from '@/components/WorldMap/world-map';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { CalendarDays, ArrowUpRight, TrendingUp, Briefcase, DollarSign, Globe, Activity, ClipboardList, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for charts
const monthlyIssuance = [
  { name: 'Jan', credits: 5200 },
  { name: 'Feb', credits: 4800 },
  { name: 'Mar', credits: 6100 },
  { name: 'Apr', credits: 5400 },
  { name: 'May', credits: 7200 },
  { name: 'Jun', credits: 6800 },
  { name: 'Jul', credits: 8100 },
  { name: 'Aug', credits: 7600 },
  { name: 'Sep', credits: 9200 },
  { name: 'Oct', credits: 8400 },
  { name: 'Nov', credits: 9800 },
  { name: 'Dec', credits: 10600 },
];

const quarterlyPerformance = [
  { name: 'Q1 2023', actual: 16100, projected: 15000 },
  { name: 'Q2 2023', actual: 19400, projected: 18000 },
  { name: 'Q3 2023', actual: 24900, projected: 22000 },
  { name: 'Q4 2023', actual: 28800, projected: 25000 },
  { name: 'Q1 2024', actual: 32400, projected: 30000 },
];

const projectTypes = [
  { name: 'Forestry', value: 42 },
  { name: 'Renewable Energy', value: 28 },
  { name: 'Cookstoves', value: 15 },
  { name: 'Methane Capture', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const recentProjects = [
  { id: '1650', name: 'REDD+ Project in Cambodia', country: 'Cambodia', type: 'Conservation', status: 'In Progress', progress: 65 },
  { id: '2749', name: 'Brazil Forest Conservation Project', country: 'Brazil', type: 'Conservation', status: 'Completed', progress: 100 },
  { id: '3214', name: 'Solar Farm Implementation', country: 'Singapore', type: 'Renewable Energy', status: 'In Progress', progress: 40 },
  { id: '4532', name: 'Community Cookstove Program', country: 'Indonesia', type: 'Cookstove', status: 'Not Started', progress: 10 },
];

const alertItems = [
  { id: 1, title: 'Financial assessment pending', project: 'REDD+ Project in Cambodia', priority: 'High', date: '2 days ago' },
  { id: 2, title: 'Document verification needed', project: 'Brazil Forest Conservation Project', priority: 'Medium', date: '1 week ago' },
  { id: 3, title: 'ESG assessment pending', project: 'Solar Farm Implementation', priority: 'Low', date: '2 weeks ago' },
];

export default function DashboardClient() {
  const { t } = useTranslation();
  
  return (
    <div className="relative">
      <TopBar title={t('topbar.dashboard')}>
        <div className="flex justify-end w-full gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Last updated: Today, 10:45 AM</span>
          </div>
        </div>
      </TopBar>

      {/* Key metrics */}
      <div className="p-4 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        <Card className="p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="text-muted-foreground text-sm font-medium">
              {t('dashboard.totalProjects')}
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
              <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-2xl">48</span>
            <span className="text-green-600 dark:text-green-400 text-xs flex items-center">
              <ArrowUpRight className="h-3 w-3" /> +8%
            </span>
          </div>
          <Separator className="my-2" />
          <div className="text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 inline mr-1" /> Increased since last month
          </div>
        </Card>

        <Card className="p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="text-muted-foreground text-sm font-medium">
              {t('dashboard.projectsUnderReview')}
            </div>
            <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
              <ClipboardList className="h-4 w-4 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-2xl">56M</span>
            <span className="text-xs text-muted-foreground">USD</span>
          </div>
          <Separator className="my-2" />
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">12</span> projects currently in review
          </div>
        </Card>

        <Card className="p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="text-muted-foreground text-sm font-medium">
              {t('dashboard.amountContracted')}
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-2xl">30M</span>
            <span className="text-xs text-muted-foreground">USD</span>
          </div>
          <Separator className="my-2" />
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">18</span> contracted projects
          </div>
        </Card>

        <Card className="p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="text-muted-foreground text-sm font-medium">
              {t('dashboard.amountDisbursed')}
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
              <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-2xl">18.6M</span>
            <span className="text-xs text-muted-foreground">USD</span>
          </div>
          <Separator className="my-2" />
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">62%</span> of contracted amount
          </div>
        </Card>

        <Card className="p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="text-muted-foreground text-sm font-medium">
              {t('dashboard.portfolioValue')}
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
              <Activity className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-2xl">75.8M</span>
            <span className="text-xs text-muted-foreground">USD</span>
          </div>
          <Separator className="my-2" />
          <div className="text-xs text-muted-foreground">
            <span className="text-green-600 dark:text-green-400">↑ 12.4%</span> from previous quarter
          </div>
        </Card>
      </div>

      {/* Charts and map */}
      <div className="p-4 grid md:grid-cols-2 grid-cols-1 gap-4">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">{t('dashboard.geographicDistribution')}</h3>
            <Badge variant="outline" className="flex items-center gap-1">
              <Globe className="h-3 w-3" /> Global View
            </Badge>
          </div>
          <div className="h-[350px]">
            <WorldMap 
              countryColors={{
                "116": "fill-blue-500 hover:fill-blue-600", // Cambodia
                "076": "fill-green-500 hover:fill-green-600", // Brazil
                "702": "fill-purple-500 hover:fill-purple-600", // Singapore
                "360": "fill-amber-500 hover:fill-amber-600" // Indonesia
              }}
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-3 justify-center text-xs">
            <span className="font-medium">Countries with active projects:</span>
            {recentProjects.map((project) => (
              <div key={project.country} className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${
                  project.country === 'Cambodia' 
                    ? 'bg-blue-500' 
                    : project.country === 'Brazil'
                      ? 'bg-green-500'
                      : project.country === 'Singapore'
                        ? 'bg-purple-500'
                        : 'bg-amber-500'
                }`}></div>
                <span>{project.country}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">{t('dashboard.annualIssuance')}</h3>
            <Badge variant="outline">2023-2024</Badge>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyIssuance} margin={{ top: 5, right: 20, bottom: 30, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="credits" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Additional section: Project details and alerts */}
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <Card className="md:col-span-2 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">Recent Projects</h3>
            <Link href="/projects" className="text-sm text-blue-600 dark:text-blue-400 flex items-center hover:underline">
              View all <ArrowUpRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <Link href={`/projects/${project.id}/details`} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {project.name}
                      </Link>
                    </TableCell>
                    <TableCell>{project.country}</TableCell>
                    <TableCell>{project.type}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          project.status === 'Completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : project.status === 'In Progress'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                              : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="h-2" />
                        <span className="text-xs">{project.progress}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">Project Types</h3>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <Separator className="my-4" />
          <h3 className="font-medium mb-2">Alerts & Notifications</h3>
          <div className="space-y-2">
            {alertItems.map((alert) => (
              <div key={alert.id} className="flex items-start gap-2 text-sm p-2 rounded-md bg-neutral-50 dark:bg-neutral-900">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                <div>
                  <div className="font-medium">{alert.title}</div>
                  <div className="text-muted-foreground text-xs">
                    {alert.project} • {alert.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance trends */}
      <div className="p-4 grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">Credit Performance</h3>
            <Badge variant="outline">Quarterly</Badge>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quarterlyPerformance} margin={{ top: 5, right: 20, bottom: 30, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="projected" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 justify-center mt-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#8884d8] rounded-full"></div>
              <span>Actual Credits</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#82ca9d] rounded-full"></div>
              <span>Projected Credits</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">Team Activity</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-blue-100 text-blue-800">OO</Avatar>
              <div>
                <div className="font-medium">Oliver Oxenham</div>
                <div className="text-xs text-muted-foreground">
                  Completed financial assessment for <span className="text-blue-600 dark:text-blue-400">REDD+ Project in Cambodia</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground ml-auto">2h ago</div>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-green-100 text-green-800">JS</Avatar>
              <div>
                <div className="font-medium">Jane Smith</div>
                <div className="text-xs text-muted-foreground">
                  Added document to <span className="text-blue-600 dark:text-blue-400">Brazil Forest Conservation Project</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground ml-auto">Yesterday</div>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-purple-100 text-purple-800">TK</Avatar>
              <div>
                <div className="font-medium">Thomas King</div>
                <div className="text-xs text-muted-foreground">
                  Updated ESG assessment for <span className="text-blue-600 dark:text-blue-400">Solar Farm Implementation</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground ml-auto">2 days ago</div>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-amber-100 text-amber-800">MP</Avatar>
              <div>
                <div className="font-medium">Maria Perez</div>
                <div className="text-xs text-muted-foreground">
                  Created new project <span className="text-blue-600 dark:text-blue-400">Community Cookstove Program</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground ml-auto">1 week ago</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View all activity
            </Link>
          </div>
        </Card>
      </div>

    </div>
  );
}