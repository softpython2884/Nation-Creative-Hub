
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, PlusCircle, BookOpen, Code, Palette, Music, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const forumCategories = [
  { id: '1', name: 'General Discussion', description: 'Talk about anything Nation Quest related.', icon: <MessageSquare className="h-6 w-6 text-primary"/>, topics: 120, posts: 1500 },
  { id: '2', name: 'Quest Prototyping', description: 'Discuss and design new quests.', icon: <BookOpen className="h-6 w-6 text-primary"/>, topics: 45, posts: 300 },
  { id: '3', name: 'Development & Code', description: 'Technical discussions, bug reports, and coding help.', icon: <Code className="h-6 w-6 text-primary"/>, topics: 80, posts: 650 },
  { id: '4', name: 'Art & Design', description: 'Share your concepts, models, and visual ideas.', icon: <Palette className="h-6 w-6 text-primary"/>, topics: 60, posts: 450 },
  { id: '5', name: 'Music & Sound', description: 'Compose, share, and discuss audio for the project.', icon: <Music className="h-6 w-6 text-primary"/>, topics: 30, posts: 200 },
  { id: '6', name: 'Community Guidelines', description: 'Rules, announcements, and feedback.', icon: <Users className="h-6 w-6 text-primary"/>, topics: 10, posts: 50 },
];


export default function ForumsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold flex items-center"><MessageSquare className="mr-3 h-8 w-8 text-primary"/>Community Forums</CardTitle>
            <CardDescription>Engage in discussions, share ideas, and collaborate with the Nation Quest team.</CardDescription>
          </div>
          <Button disabled><PlusCircle className="mr-2 h-4 w-4"/>New Topic (Soon)</Button>
        </CardHeader>
        <CardContent>
           <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search topics & posts..." 
                className="pl-8 w-full md:w-1/3"
                disabled // Search not implemented yet
              />
            </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {forumCategories.map(category => (
          <Card key={category.id} className="shadow-sm hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              {category.icon}
              <div>
                <CardTitle className="text-xl">{category.name}</CardTitle>
                <CardDescription className="text-xs">{category.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{category.topics} Topics</span>
                <span>{category.posts} Posts</span>
              </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                    Enter Forum (Soon)
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <p className="text-sm text-muted-foreground text-center">This is a UI placeholder for the forums. A fully functional forum requires backend integration.</p>
    </div>
  );
}

    