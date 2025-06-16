
"use client";

import React, { useState, useEffect } from 'react'; // Added useState and useEffect
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart as LineChartIconLucide, PieChartIcon, Users, ListChecks, Activity, ArrowRight, Lightbulb, Tv } from "lucide-react";
import Link from "next/link";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, Line, Pie, ResponsiveContainer, Cell, PieLabelRenderProps, PieChart, LineChart } from "recharts"; 
import { useAuth } from "@/contexts/auth-context";
import type { ProjectSpotlightData } from '@/types';

const PROJECT_SPOTLIGHT_STORAGE_KEY = 'projectSpotlight_nationquest';


const taskData = [
  { status: "To Do", count: 12, fill: "hsl(var(--chart-1))" },
  { status: "In Progress", count: 8, fill: "hsl(var(--chart-2))" },
  { status: "Completed", count: 25, fill: "hsl(var(--chart-3))" },
];

const activityData = [
  { date: "Mon", tasksCompleted: 5, newTasks: 3 },
  { date: "Tue", tasksCompleted: 7, newTasks: 2 },
  { date: "Wed", tasksCompleted: 3, newTasks: 5 },
  { date: "Thu", tasksCompleted: 6, newTasks: 4 },
  { date: "Fri", tasksCompleted: 8, newTasks: 1 },
  { date: "Sat", tasksCompleted: 2, newTasks: 0 },
  { date: "Sun", tasksCompleted: 4, newTasks: 2 },
];

const chartConfig = {
  tasksCompleted: {
    label: "Tasks Completed",
    color: "hsl(var(--chart-1))",
  },
  newTasks: {
    label: "New Tasks",
    color: "hsl(var(--chart-2))",
  },
} satisfies import("@/components/ui/chart").ChartConfig;


export default function DashboardPage() {
  const { currentUser } = useAuth(); 
  const totalTasks = taskData.reduce((acc, curr) => acc + curr.count, 0);
  const completedTasks = taskData.find(t => t.status === "Completed")?.count || 0;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const [spotlightData, setSpotlightData] = useState<ProjectSpotlightData>({
    title: 'Project Spotlight: The Azure Glade',
    description: 'Our current major focus is the development of the Azure Glade region. This involves new environmental assets, questlines, and NPC interactions.',
    button1Text: 'View Project Details',
    button1Link: '#',
    button2Text: 'Contribute',
    button2Link: '#',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSpotlight = localStorage.getItem(PROJECT_SPOTLIGHT_STORAGE_KEY);
      if (storedSpotlight) {
        try {
          setSpotlightData(JSON.parse(storedSpotlight));
        } catch (e) {
          console.error("Failed to parse spotlight data from localStorage", e);
          // Fallback to default if parsing fails
           localStorage.removeItem(PROJECT_SPOTLIGHT_STORAGE_KEY); // Clear potentially corrupted data
        }
      }
    }
  }, []);


  return (
    <div className="grid gap-6 md:gap-8">
      <Card className="col-span-1 md:col-span-2 lg:col-span-3 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Welcome back, {currentUser?.name || 'Developer'}!</CardTitle> 
          <Activity className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Here's what's happening with Nation Quest today. Let's build something amazing!</p>
          {currentUser?.role === 'guest' && (
            <p className="mt-2 text-sm text-destructive">Your account is pending verification by an administrator.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskData.find(t => t.status === "In Progress")?.count || 0}</div>
            <p className="text-xs text-muted-foreground">
              {taskData.find(t => t.status === "To Do")?.count || 0} tasks pending
            </p>
            <Button variant="link" size="sm" className="px-0 mt-2" asChild>
              <Link href="/dashboard/tasks">View All Tasks <ArrowRight className="ml-1 h-4 w-4"/></Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Project Completion</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionPercentage}%</div>
            <Progress value={completionPercentage} className="mt-2 h-2" aria-label={`${completionPercentage}% tasks completed`} />
            <p className="text-xs text-muted-foreground mt-1">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Community Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div> {/* Mock data */}
            <p className="text-xs text-muted-foreground">+5 new members this week</p> {/* Mock data */}
            <Button variant="link" size="sm" className="px-0 mt-2" asChild>
              <Link href="/dashboard/community">Manage Community <ArrowRight className="ml-1 h-4 w-4"/></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Overview of tasks by status.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={{}} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart> 
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={taskData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }: PieLabelRenderProps) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {taskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Tasks completed vs. new tasks over the past week.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}> 
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="tasksCompleted" stroke={chartConfig.tasksCompleted.color} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="newTasks" stroke={chartConfig.newTasks.color} strokeWidth={2} dot={false} />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-primary/10 border-primary/30 hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-primary flex items-center"><Tv className="mr-2 h-6 w-6"/>{spotlightData.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-1 w-full h-[200px] md:h-[300px] flex items-center justify-center bg-muted/50 rounded-md shadow-md">
            <Lightbulb className="w-20 h-20 md:w-24 md:h-24 text-primary" data-ai-hint="idea concept"/>
          </div>
          <div className="md:col-span-2">
            <p className="text-muted-foreground mb-4">
              {spotlightData.description}
            </p>
            <div className="flex gap-2 flex-wrap">
              {spotlightData.button1Text && spotlightData.button1Link && (
                 <Button asChild>
                    <Link href={spotlightData.button1Link}>{spotlightData.button1Text}</Link>
                 </Button>
              )}
              {spotlightData.button2Text && spotlightData.button2Link && (
                <Button variant="outline" asChild>
                    <Link href={spotlightData.button2Link}>{spotlightData.button2Text}</Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
       <p className="text-sm text-muted-foreground text-center col-span-full">Dashboard data is currently mocked. Project Spotlight content can be edited by admins in the Admin Panel (changes saved to localStorage).</p>
    </div>
  );
}

    