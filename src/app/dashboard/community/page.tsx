"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { MessageCircle, UserPlus, Search } from 'lucide-react';
import Image from 'next/image';

interface CommunityMember {
  id: string;
  name: string;
  role: 'Composer' | 'Builder' | 'Designer' | 'Developer' | 'Writer';
  avatarUrl: string;
  bio: string;
  skills: string[];
  joinedDate: string;
}

const initialMembers: CommunityMember[] = [
  { id: '1', name: 'Elara Moonwhisper', role: 'Composer', avatarUrl: 'https://placehold.co/100x100.png?text=EM', bio: 'Crafting immersive soundscapes and epic scores for Nation Quest.', skills: ['Orchestration', 'Sound Design', 'MIDI'], joinedDate: '2023-05-15', },
  { id: '2', name: 'Grom Stonebeard', role: 'Builder', avatarUrl: 'https://placehold.co/100x100.png?text=GS', bio: 'Architect of grand castles and intricate dungeons. Loves a good challenge.', skills: ['Level Design', '3D Modeling', 'Texturing'], joinedDate: '2022-11-01', },
  { id: '3', name: 'Lyra Starweaver', role: 'Designer', avatarUrl: 'https://placehold.co/100x100.png?text=LS', bio: 'Visualizing the world of Nation Quest, from character concepts to UI.', skills: ['Concept Art', 'UI/UX', 'Illustration'], joinedDate: '2023-01-20', },
  { id: '4', name: 'Jax Coderius', role: 'Developer', avatarUrl: 'https://placehold.co/100x100.png?text=JC', bio: 'Bringing game mechanics to life with clean and efficient code.', skills: ['C++', 'Game Logic', 'AI Programming'], joinedDate: '2022-08-10', },
  { id: '5', name: 'Faelan Quillstrike', role: 'Writer', avatarUrl: 'https://placehold.co/100x100.png?text=FQ', bio: 'Weaving tales and lore that breathe life into Nation Quest.', skills: ['Storytelling', 'Dialogue', 'Worldbuilding'], joinedDate: '2023-03-05', },
  { id: '6', name: 'Seraphina Forgefire', role: 'Builder', avatarUrl: 'https://placehold.co/100x100.png?text=SF', bio: 'Expert in crafting unique environmental assets and props.', skills: ['Asset Creation', 'Sculpting', 'Optimization'], joinedDate: '2023-09-12', },
];

function MemberCard({ member }: { member: CommunityMember }) {
  const roleColors: { [key: string]: string } = {
    Composer: 'bg-purple-500/20 text-purple-700 dark:bg-purple-700/30 dark:text-purple-400 border-purple-500/30',
    Builder: 'bg-orange-500/20 text-orange-700 dark:bg-orange-700/30 dark:text-orange-400 border-orange-500/30',
    Designer: 'bg-pink-500/20 text-pink-700 dark:bg-pink-700/30 dark:text-pink-400 border-pink-500/30',
    Developer: 'bg-blue-500/20 text-blue-700 dark:bg-blue-700/30 dark:text-blue-400 border-blue-500/30',
    Writer: 'bg-teal-500/20 text-teal-700 dark:bg-teal-700/30 dark:text-teal-400 border-teal-500/30',
  };

  return (
    <Card className="shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
          <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="profile picture" />
          <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{member.name}</CardTitle>
        <Badge variant="outline" className={`mt-1 ${roleColors[member.role]}`}>{member.role}</Badge>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground text-center mb-3">{member.bio}</p>
        <div className="mb-2">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Skills:</h4>
          <div className="flex flex-wrap gap-1">
            {member.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Joined: {new Date(member.joinedDate).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <MessageCircle className="mr-2 h-4 w-4" /> Message
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const roles = ['All', ...new Set(initialMembers.map(member => member.role))];

  const filteredMembers = initialMembers.filter(member => {
    const nameMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = selectedRole === 'all' || member.role.toLowerCase() === selectedRole.toLowerCase();
    return nameMatch && roleMatch;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Community Hub</CardTitle>
          <CardDescription>Connect with the talented individuals building Nation Quest.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search members..." 
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => <SelectItem key={role} value={role.toLowerCase()}>{role}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button className="w-full md:w-auto">
              <UserPlus className="mr-2 h-4 w-4" /> Invite Member
            </Button>
          </div>
        </CardContent>
      </Card>

      {filteredMembers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
         <Card className="mt-6">
          <CardContent className="py-12 flex flex-col items-center justify-center text-center">
            <Search className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Members Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
