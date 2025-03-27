'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/qbutton';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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
  ];

  if (!open) return null;

  return (
    <div className="absolute top-4 right-4 w-[400px] max-h-[calc(100%-2rem)] rounded-lg overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-xl z-10">
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
        
        <div className="flex px-4 space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
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
      
      <div className="overflow-y-auto max-h-[calc(100vh-16rem)]">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};