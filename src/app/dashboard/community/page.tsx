
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { MessageCircle, UserPlus, Search, UserCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


interface CommunityMember {
  id: string;
  name: string;
  role: 'Composer' | 'Builder' | 'Designer' | 'Developer' | 'Writer' | 'Community Manager';
  bio: string;
  skills: string[];
  joinedDate: string;
}

const initialMembers: CommunityMember[] = [
  { id: '1', name: 'Elara Moonwhisper', role: 'Composer', bio: 'Crafting immersive soundscapes and epic scores for Nation Quest.', skills: ['Orchestration', 'Sound Design', 'MIDI'], joinedDate: '2023-05-15', },
  { id: '2', name: 'Grom Stonebeard', role: 'Builder', bio: 'Architect of grand castles and intricate dungeons. Loves a good challenge.', skills: ['Level Design', '3D Modeling', 'Texturing'], joinedDate: '2022-11-01', },
  { id: '3', name: 'Lyra Starweaver', role: 'Designer', bio: 'Visualizing the world of Nation Quest, from character concepts to UI.', skills: ['Concept Art', 'UI/UX', 'Illustration'], joinedDate: '2023-01-20', },
  { id: '4', name: 'Jax Coderius', role: 'Developer', bio: 'Bringing game mechanics to life with clean and efficient code.', skills: ['C++', 'Game Logic', 'AI Programming'], joinedDate: '2022-08-10', },
  { id: '5', name: 'Faelan Quillstrike', role: 'Writer', bio: 'Weaving tales and lore that breathe life into Nation Quest.', skills: ['Storytelling', 'Dialogue', 'Worldbuilding'], joinedDate: '2023-03-05', },
  { id: '6', name: 'Seraphina Forgefire', role: 'Builder', bio: 'Expert in crafting unique environmental assets and props.', skills: ['Asset Creation', 'Sculpting', 'Optimization'], joinedDate: '2023-09-12', },
  { id: '7', name: 'Orion Vector', role: 'Community Manager', bio: 'Connecting with the community and fostering a positive environment.', skills: ['Communication', 'Event Planning', 'Social Media'], joinedDate: '2024-01-05', },
];

const roleColors: { [key: string]: string } = {
    Composer: 'bg-purple-500/20 text-purple-700 dark:bg-purple-700/30 dark:text-purple-400 border-purple-500/30',
    Builder: 'bg-orange-500/20 text-orange-700 dark:bg-orange-700/30 dark:text-orange-400 border-orange-500/30',
    Designer: 'bg-pink-500/20 text-pink-700 dark:bg-pink-700/30 dark:text-pink-400 border-pink-500/30',
    Developer: 'bg-blue-500/20 text-blue-700 dark:bg-blue-700/30 dark:text-blue-400 border-blue-500/30',
    Writer: 'bg-teal-500/20 text-teal-700 dark:bg-teal-700/30 dark:text-teal-400 border-teal-500/30',
    'Community Manager': 'bg-green-500/20 text-green-700 dark:bg-green-700/30 dark:text-green-400 border-green-500/30',
};

function MemberCard({ member, onMessage }: { member: CommunityMember; onMessage: (memberName: string) => void; }) {
  return (
    <Card className="shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
          <AvatarFallback>
            <UserCircle2 className="w-16 h-16 text-primary" />
          </AvatarFallback>
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
        <Button variant="outline" className="w-full" onClick={() => onMessage(member.name)}>
          <MessageCircle className="mr-2 h-4 w-4" /> Message (UI Demo)
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState('');
  const { toast } = useToast();

  const roles = ['All', ...Array.from(new Set(initialMembers.map(member => member.role)))];

  const filteredMembers = initialMembers.filter(member => {
    const nameMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = selectedRole === 'all' || member.role.toLowerCase() === selectedRole.toLowerCase();
    // Skill search (basic implementation: checks if any skill contains the search term)
    const skillMatch = searchTerm === '' || member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return (nameMatch || skillMatch) && roleMatch;
  });

  const handleOpenMessageDialog = (recipientName: string) => {
    setMessageRecipient(recipientName);
    setIsMessageDialogOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Actual send message logic would go here (requires backend)
    toast({ title: "Message UI Demo", description: `Message to ${messageRecipient} would be sent. (This is a UI demo only)`});
    setIsMessageDialogOpen(false);
  };

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
                placeholder="Search members or skills..." 
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
            <Button className="w-full md:w-auto" disabled> {/* Invite member functionality needs backend */}
              <UserPlus className="mr-2 h-4 w-4" /> Invite Member (Soon)
            </Button>
          </div>
        </CardContent>
      </Card>

      {filteredMembers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMembers.map(member => (
            <MemberCard key={member.id} member={member} onMessage={handleOpenMessageDialog} />
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

      {/* Message Dialog (UI Demo) */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message to {messageRecipient}</DialogTitle>
            <DialogDescription>
              This is a UI demonstration. Messages are not actually sent or stored without a backend.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <Textarea placeholder={`Type your message to ${messageRecipient}...`} rows={5} />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
       <p className="text-sm text-muted-foreground text-center">Community features like real-time messaging require backend integration.</p>
    </div>
  );
}

    