"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set Mapbox access token
if (process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
}

const COLORS = ["#6B7280", "#9CA3AF", "#D1D5DB"];

// Mapbox component
function GeoDistributionMap({ countryDistribution }: { countryDistribution: Record<string, number> }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng] = useState(0);
  const [lat] = useState(20);
  const [zoom] = useState(1.5);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom: zoom,
      projection: "mercator", // Use 2D mercator projection instead of globe
    });

    map.current.on("load", () => {
      if (!map.current) return;

      // Add country highlights
      const activeCountries = Object.keys(countryDistribution).filter(
        (country) => countryDistribution[country] > 0
      );

      // Add a source for country boundaries
      map.current.addSource("countries", {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1",
      });

      // Add fill layer for active countries
      map.current.addLayer({
        id: "active-countries-fill",
        type: "fill",
        source: "countries",
        "source-layer": "country_boundaries",
        paint: {
          "fill-color": "#10B981",
          "fill-opacity": 0.7,
        },
        filter: ["in", "name_en", ...activeCountries],
      });

      // Add outline for all countries
      map.current.addLayer({
        id: "countries-outline",
        type: "line",
        source: "countries",
        "source-layer": "country_boundaries",
        paint: {
          "line-color": "#FFFFFF",
          "line-width": 0.5,
        },
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lng, lat, zoom, countryDistribution]);

  return <div ref={mapContainer} className="h-full w-full rounded-lg" />;
}

export default function DashboardClient() {
  const dashboardData = useQuery(api.dashboard.getDashboardData);

  if (!dashboardData) {
    return <DashboardSkeleton />;
  }

  const {
    metrics,
    countryDistribution,
    projectTypes,
    monthlyData,
    recentProjects,
    actionItems,
  } = dashboardData;

  // Format numbers for display
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Prepare data for pie chart
  const pieData = Object.entries(projectTypes).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projects in Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.projectsInPortfolio}</div>
            <p className="text-xs text-muted-foreground">projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projects under Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.projectsUnderReview}</div>
            <p className="text-xs text-muted-foreground">projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Credit under review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.creditsUnderReview)} tCO₂e</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Value of Credits under Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.valueUnderReview)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Investment Amount under Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.investmentUnderReview)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Investment Amount Disbursed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.investmentDisbursed)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Credits Contracted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.creditsContracted)} tCO₂e</div>
          </CardContent>
        </Card>
      </div>

      {/* World Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Geo distribution</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                Very Active
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                Inactive
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <GeoDistributionMap countryDistribution={countryDistribution} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Geo distribution</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                Very Active
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                Inactive
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <GeoDistributionMap countryDistribution={countryDistribution} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Annual Credits Issuance [Project under Review]
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value: any) => formatCurrency(value)} />
                  <Bar dataKey="projectsUnderReview" fill="#6B7280" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Annual Credits Issuance [Credits Contracted]
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value: any) => formatCurrency(value)} />
                  <Bar dataKey="creditsContracted" fill="#6B7280" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects and Other Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Projects Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projects</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Project type</TableHead>
                  <TableHead>Methodology (version)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      {project.projectName}
                    </TableCell>
                    <TableCell>{project.country}</TableCell>
                    <TableCell>{project.projectType}</TableCell>
                    <TableCell>{project.methodology}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4 space-y-2">
              <div>
                <span className="font-medium">Owner:</span>
              </div>
              <div>
                <span className="font-medium">Collaborators:</span>
              </div>
              <div>
                <span className="font-medium">Add Collaborators:</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Types Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">
                    Type {index + 1}: {Math.round((entry.value / metrics.projectsInPortfolio) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Action</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projects</TableHead>
                <TableHead>Action type / Person Responsible</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.project}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between">
                      <span>{item.actionType}</span>
                      <span className="text-muted-foreground">
                        {item.responsible}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-8 w-48" />
      
      {/* Metrics Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(7)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-16 mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Maps Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-64" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}