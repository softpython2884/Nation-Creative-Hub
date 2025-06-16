
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Mock project data
const mockProjects = [
  { id: '1', name: 'The Azure Glade Expansion', description: 'Developing new region assets, quests, and NPCs.', status: 'In Progress', progress: 75, teamSize: 12, coverImage: 'https://placehold.co/600x400.png?text=Azure+Glade', dataAiHint: 'fantasy landscape' },
  { id: '2', name: 'Soundtrack Composition - Vol. II', description: 'Creating new musical scores for upcoming areas and events.', status: 'Planning', progress: 15, teamSize: 3, coverImage: 'https://placehold.co/600x400.png?text=Music+Notes', dataAiHint: 'music score' },
  { id: '3', name: 'UI Overhaul Initiative', description: 'Redesigning the main game interface for better UX.', status: 'On Hold', progress: 30, teamSize: 5, coverImage: 'https://placehold.co/600x400.png?text=UI+Sketch', dataAiHint: 'ui sketch' },
  { id: '4', name: 'Lore Bible Compilation', description: 'Consolidating all world lore into a central document.', status: 'Completed', progress: 100, teamSize: 2, coverImage: 'https://placehold.co/600x400.png?text=Ancient+Book', dataAiHint: 'old book' },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold flex items-center"><FolderKanban className="mr-3 h-8 w-8 text-primary"/>Projects Overview</CardTitle>
            <CardDescription>Manage and track all ongoing and planned projects for Nation Quest.</CardDescription>
          </div>
          <Button><PlusCircle className="mr-2 h-4 w-4"/>New Project (Soon)</Button>
        </CardHeader>
        <CardContent>
           <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search projects..." 
                className="pl-8 w-full md:w-1/3"
                disabled // Search not implemented yet
              />
            </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map(project => (
          <Card key={project.id} className="shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader className="p-0">
              <Image 
                src={project.coverImage} 
                alt={project.name} 
                width={600} 
                height={400} 
                className="rounded-t-lg object-cover aspect-[3/2]"
                data-ai-hint={project.dataAiHint}
              />
            </CardHeader>
            <CardContent className="pt-4 flex-grow">
              <CardTitle className="text-xl mb-1">{project.name}</CardTitle>
              <Badge variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'} 
                     className={`${project.status === 'Completed' ? 'bg-green-500/80 hover:bg-green-500/70' : project.status === 'In Progress' ? '' : 'border-destructive/50 text-destructive'}`}>
                {project.status}
              </Badge>
              <CardDescription className="mt-2 text-sm line-clamp-3">{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">{project.teamSize} Members</div>
              <Button variant="outline" size="sm" disabled>View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <p className="text-sm text-muted-foreground text-center">This is a placeholder page for project management. Full functionality requires backend integration.</p>
    </div>
  );
}

    