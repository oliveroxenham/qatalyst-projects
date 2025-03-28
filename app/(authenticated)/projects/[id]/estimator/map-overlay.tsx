'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/qbutton';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

// Sample data for the charts
const carbonData = [
  { name: '2018', value: 245 },
  { name: '2019', value: 298 },
  { name: '2020', value: 276 },
  { name: '2021', value: 310 },
  { name: '2022', value: 325 },
];

const revenueData = [
  { name: 'Q1', value: 42000 },
  { name: 'Q2', value: 55000 },
  { name: 'Q3', value: 48000 },
  { name: 'Q4', value: 62000 },
];

// Sample deforestation data
const deforestationTimeData = [
  { year: '2015', area: 3200 },
  { year: '2016', area: 2800 },
  { year: '2017', area: 3100 },
  { year: '2018', area: 2400 },
  { year: '2019', area: 1900 },
  { year: '2020', area: 1700 },
  { year: '2021', area: 1500 },
  { year: '2022', area: 1200 },
];

// Sample biodiversity data
const biodiversityScores = [
  { year: 2019, score: 64 },
  { year: 2020, score: 68 },
  { year: 2021, score: 72 },
  { year: 2022, score: 78 },
];

// Sample community data
const communityProjects = [
  { name: 'Sustainable farming', participants: 45, status: 'Active' },
  { name: 'Ecotourism initiative', participants: 32, status: 'Active' },
  { name: 'Forest rangers program', participants: 18, status: 'Active' },
  { name: 'Artisan craft co-op', participants: 27, status: 'Active' },
];

// Sample risk data
const riskAssessment = [
  { category: 'Political', level: 'Medium', score: 65 },
  { category: 'Financial', level: 'Low', score: 82 },
  { category: 'Environmental', level: 'Low', score: 85 },
  { category: 'Social', level: 'Very Low', score: 90 },
];

// Sample compliance data
const complianceChecklist = [
  { requirement: 'Baseline documentation', status: 'Completed', date: '2018-05-12' },
  { requirement: 'Carbon quantification', status: 'Completed', date: '2018-07-24' },
  { requirement: 'Leakage assessment', status: 'Completed', date: '2018-08-15' },
  { requirement: 'Permanence risk analysis', status: 'Completed', date: '2018-09-03' },
  { requirement: 'Verification audit', status: 'Completed', date: '2022-10-28' },
  { requirement: 'Monitoring report', status: 'In progress', date: '2023-02-01' },
];

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

interface MapOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MapOverlay: React.FC<MapOverlayProps> = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState<string>('information');

  const tabs: TabItem[] = [
    {
      id: 'information',
      label: 'Information',
      content: (
        <div className="space-y-6 p-4">
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Carbon data</h3>
            <div className="h-48">
              <ChartContainer
                config={{
                  carbonCredits: {
                    label: 'Carbon Credits',
                    color: '#10b981',
                  },
                }}
              >
                <BarChart data={carbonData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff80" />
                  <YAxis stroke="#ffffff80" />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    name="Carbon Credits (tons)" 
                    fill="var(--color-carbonCredits, #10b981)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Location data</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/60">Area</p>
                <p className="text-sm font-medium text-white">2,500 hectares</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Forest type</p>
                <p className="text-sm font-medium text-white">Tropical rainforest</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Region</p>
                <p className="text-sm font-medium text-white">Seima, Cambodia</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Project start</p>
                <p className="text-sm font-medium text-white">2018</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Estimated revenue</h3>
            <div className="h-48">
              <ChartContainer
                config={{
                  revenue: {
                    label: 'Revenue',
                    color: '#6366f1',
                  },
                }}
              >
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff80" />
                  <YAxis stroke="#ffffff80" />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    name="Revenue (USD)" 
                    fill="var(--color-revenue, #6366f1)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'historical',
      label: 'Historical',
      content: (
        <div className="space-y-6 p-4">
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Historical deforestation</h3>
            <p className="text-sm text-white/70 mb-4">
              The Seima project area has experienced consistent deforestation pressure over the past decade, primarily
              due to agricultural expansion and illegal logging.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/60">Annual loss rate</p>
                <p className="text-sm font-medium text-white">1.2%</p>
              </div>
              <div>
                <p className="text-xs text-white/60">5-year trend</p>
                <p className="text-sm font-medium text-white">Decreasing</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Major drivers</p>
                <p className="text-sm font-medium text-white">Agriculture, logging</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Risk level</p>
                <p className="text-sm font-medium text-white">Medium</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Conservation efforts</h3>
            <p className="text-sm text-white/70 mb-4">
              Multiple conservation programs have been established in the area since 2015, contributing to the 
              declining deforestation rate.
            </p>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-white/60">Community involvement</p>
                <p className="text-sm font-medium text-white">High</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Enforcement</p>
                <p className="text-sm font-medium text-white">Improved since 2019</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Funding sources</p>
                <p className="text-sm font-medium text-white">REDD+, private, government</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leakage',
      label: 'Leakage area',
      content: (
        <div className="space-y-6 p-4">
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Leakage zone details</h3>
            <p className="text-sm text-white/70 mb-4">
              The project has established a 10km buffer zone around the project area to monitor and account for 
              potential activity displacement (leakage).
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/60">Buffer zone size</p>
                <p className="text-sm font-medium text-white">10km / 45,000ha</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Monitoring frequency</p>
                <p className="text-sm font-medium text-white">Quarterly</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Detected leakage</p>
                <p className="text-sm font-medium text-white">Minimal (2%)</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Communities</p>
                <p className="text-sm font-medium text-white">12 villages</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Mitigation strategies</h3>
            <p className="text-sm text-white/70 mb-4">
              The project employs several strategies to minimize leakage effects in the surrounding areas.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <p className="text-sm text-white">Alternative livelihood programs for local communities</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <p className="text-sm text-white">Agroforestry initiatives to reduce pressure on forests</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <p className="text-sm text-white">Extended patrol activities in buffer zones</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <p className="text-sm text-white">Coordination with adjacent land managers</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'geospatial',
      label: 'Geospatial Data',
      content: (
        <div className="space-y-6 p-4">
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Deforestation Trends</h3>
            <p className="text-sm text-white/70 mb-4">
              Satellite-based deforestation analysis shows a decreasing trend in forest loss over the past 8 years 
              within the project area.
            </p>
            <div className="h-48">
              <ChartContainer
                config={{
                  deforestation: {
                    label: 'Deforestation',
                    color: '#ef4444',
                  },
                }}
              >
                <AreaChart data={deforestationTimeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" stroke="#ffffff80" />
                  <YAxis stroke="#ffffff80" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="area"
                    name="Deforested Area (hectares)"
                    fill="#ef444480"
                    stroke="#ef4444"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Deforestation Hotspots</h3>
            <p className="text-sm text-white/70 mb-4">
              Analysis of deforestation patterns reveals specific hotspots where forest loss has been concentrated.
            </p>
            <div className="h-48 bg-black/20 rounded-lg overflow-hidden relative">
              {/* Simulated deforestation heatmap */}
              <div className="absolute inset-0 bg-[url('/cambodia.png')] bg-cover bg-center opacity-70"></div>
              
              {/* Hotspot indicators */}
              <div className="absolute top-[30%] left-[25%] w-6 h-6 rounded-full bg-red-500/40 animate-pulse border-2 border-red-500"></div>
              <div className="absolute top-[35%] left-[45%] w-8 h-8 rounded-full bg-red-500/40 animate-pulse border-2 border-red-500"></div>
              <div className="absolute top-[55%] left-[65%] w-4 h-4 rounded-full bg-red-500/40 animate-pulse border-2 border-red-500"></div>
              
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                Satellite data: 2022
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-white/60">Hotspot regions</p>
                <p className="text-sm font-medium text-white">3 identified</p>
              </div>
              <div>
                <p className="text-xs text-white/60">High risk areas</p>
                <p className="text-sm font-medium text-white">12% of project</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Monitoring frequency</p>
                <p className="text-sm font-medium text-white">Monthly</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Data source</p>
                <p className="text-sm font-medium text-white">Landsat/Sentinel</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Forest Cover Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-black/20 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/cambodia.png')] bg-cover bg-center opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/60 to-transparent"></div>
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  2015
                </div>
              </div>
              <div className="h-32 bg-black/20 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/cambodia.png')] bg-cover bg-center opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/40 to-transparent"></div>
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  2022
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-white/60">Forest cover change</p>
              <p className="text-sm font-medium text-white">-8.4% (2015-2022)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'biodiversity',
      label: 'Biodiversity',
      content: (
        <div className="space-y-6 p-4">
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Biodiversity Score</h3>
            <p className="text-sm text-white/70 mb-4">
              Biodiversity assessment scores have shown steady improvement since project implementation, indicating 
              successful ecosystem conservation efforts.
            </p>
            <div className="h-48">
              <ChartContainer
                config={{
                  biodiversity: {
                    label: 'Biodiversity',
                    color: '#059669',
                  },
                }}
              >
                <BarChart data={biodiversityScores}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" stroke="#ffffff80" />
                  <YAxis stroke="#ffffff80" domain={[0, 100]} />
                  <Tooltip />
                  <Bar 
                    dataKey="score" 
                    name="Biodiversity Score (0-100)" 
                    fill="#059669" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Species Monitoring</h3>
            <p className="text-sm text-white/70 mb-4">
              Regular monitoring has documented the presence of several indicator species, confirming the health of the ecosystem.
            </p>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/60">Mammals</p>
                  <p className="text-xs font-medium text-white">14 species</p>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full mt-1">
                  <div className="h-full rounded-full bg-green-500" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/60">Birds</p>
                  <p className="text-xs font-medium text-white">87 species</p>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full mt-1">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/60">Reptiles</p>
                  <p className="text-xs font-medium text-white">23 species</p>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full mt-1">
                  <div className="h-full rounded-full bg-yellow-500" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/60">Amphibians</p>
                  <p className="text-xs font-medium text-white">11 species</p>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full mt-1">
                  <div className="h-full rounded-full bg-purple-500" style={{ width: '58%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Threatened Species</h3>
            <p className="text-sm text-white/70 mb-4">
              The project area serves as critical habitat for several endangered species.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/60">Critically endangered</p>
                <p className="text-sm font-medium text-white">3 species</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Endangered</p>
                <p className="text-sm font-medium text-white">7 species</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Vulnerable</p>
                <p className="text-sm font-medium text-white">12 species</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Near threatened</p>
                <p className="text-sm font-medium text-white">18 species</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'community',
      label: 'Community',
      content: (
        <div className="space-y-6 p-4">
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Community Engagement</h3>
            <p className="text-sm text-white/70 mb-4">
              The project actively involves local communities in conservation and sustainable development activities.
            </p>
            <div className="space-y-4">
              {communityProjects.map((project, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-white">{project.name}</p>
                    <p className="text-xs text-white/60">{project.participants} participants</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Stakeholder Distribution</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-500/20 mb-2">
                  <span className="text-lg font-bold text-white">12</span>
                </div>
                <p className="text-xs text-white/60">Villages</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-500/20 mb-2">
                  <span className="text-lg font-bold text-white">4</span>
                </div>
                <p className="text-xs text-white/60">Partnerships</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-yellow-500/20 mb-2">
                  <span className="text-lg font-bold text-white">850+</span>
                </div>
                <p className="text-xs text-white/60">Community members</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-purple-500/20 mb-2">
                  <span className="text-lg font-bold text-white">6</span>
                </div>
                <p className="text-xs text-white/60">Training programs</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'risk',
      label: 'Risk Profile',
      content: (
        <div className="space-y-6 p-4">
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Risk Assessment</h3>
            <p className="text-sm text-white/70 mb-4">
              Overall project risk profile is low, with well-managed mitigation strategies in place.
            </p>
            <div className="space-y-4">
              {riskAssessment.map((risk, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{risk.category}</span>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      risk.level === "Very Low" ? "bg-green-500/20 text-green-400" :
                      risk.level === "Low" ? "bg-blue-500/20 text-blue-400" :
                      risk.level === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    )}>
                      {risk.level}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-black/20 rounded-full">
                    <div className="h-full rounded-full bg-green-500" style={{ width: `${risk.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Certification Status</h3>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <p className="text-sm font-medium text-white">Verified Carbon Standard (VCS)</p>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <p className="text-sm font-medium text-white">Climate, Community & Biodiversity (CCB) Standards</p>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <p className="text-sm font-medium text-white">SOCIALCARBON Standard (pending)</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <p className="text-sm font-medium text-white/60">Gold Standard (not applicable)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'compliance',
      label: 'Compliance',
      content: (
        <div className="space-y-6 p-4">
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Compliance Checklist</h3>
            <p className="text-sm text-white/70 mb-4">
              The project adheres to all relevant standards and methodologies for REDD+ carbon projects.
            </p>
            <div className="space-y-3">
              {complianceChecklist.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={cn(
                    "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                    item.status === "Completed" ? "bg-green-500/20" : "bg-yellow-500/20"
                  )}>
                    {item.status === "Completed" ? (
                      <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="#10b981" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="#facc15" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-white">{item.requirement}</p>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        item.status === "Completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                      )}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mt-0.5">
                      {item.status === "Completed" ? 
                        `Completed on ${new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : 
                        `Started on ${new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <h3 className="text-base font-medium mb-2 text-white">Verification Timeline</h3>
            <div className="relative pt-2">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>
              
              <div className="relative pl-10 pb-5">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500">
                  <span className="text-xs font-medium text-white">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Initial validation</p>
                  <p className="text-xs text-white/60">Completed August 2018</p>
                </div>
              </div>
              
              <div className="relative pl-10 pb-5">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500">
                  <span className="text-xs font-medium text-white">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">First verification</p>
                  <p className="text-xs text-white/60">Completed October 2020</p>
                </div>
              </div>
              
              <div className="relative pl-10 pb-5">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500">
                  <span className="text-xs font-medium text-white">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Second verification</p>
                  <p className="text-xs text-white/60">Completed October 2022</p>
                </div>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center border-2 border-yellow-500">
                  <span className="text-xs font-medium text-white">4</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Third verification</p>
                  <p className="text-xs text-white/60">Scheduled October 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  if (!open) return null;

  return (
    <div className="absolute top-20 right-4 w-[400px] max-h-[calc(100%-2rem)] rounded-lg overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-xl z-10">
      <div className="border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-medium text-white">Project Details</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white hover:bg-white/10" 
            onClick={() => onOpenChange(false)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        </div>
        
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="flex px-4 space-x-1 min-w-min">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.id 
                    ? "border-b-2 border-primary text-white" 
                    : "text-white/60 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-[calc(100vh-16rem)]">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};