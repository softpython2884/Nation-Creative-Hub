
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { MessageCircle, UserPlus, Search, UserCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { UserRole } from '@/types';


interface CommunityMember {
  id: string;
  name: string;
  role: UserRole; 
  bio: string;
  skills: string[];
  joinedDate: string;
}

const initialMembers: CommunityMember[] = [
  { id: '1', name: 'Alex Johnson', role: 'Developer', bio: 'Full-stack dev, loves tackling complex problems.', skills: ['React', 'Node.js', 'Python'], joinedDate: '2023-05-15', },
  { id: '2', name: 'Maria Garcia', role: 'Designer', bio: 'Crafting intuitive and beautiful user experiences.', skills: ['UI/UX', 'Figma', 'Prototyping'], joinedDate: '2022-11-01', },
  { id: '3', name: 'Sam Chen', role: 'Project Manager', bio: 'Keeping projects on track and teams aligned.', skills: ['Agile', 'Scrum', 'Communication'], joinedDate: '2023-01-20', },
  { id: '4', name: 'Emily White', role: 'Builder', bio: 'Focused on infrastructure and deployment pipelines.', skills: ['Docker', 'Kubernetes', 'CI/CD'], joinedDate: '2022-08-10', },
  { id: '5', name: 'David Lee', role: 'Moderator', bio: 'Ensuring a healthy and productive community environment.', skills: ['Conflict Resolution', 'Content Moderation'], joinedDate: '2023-03-05', },
  { id: '6', name: 'Sarah Brown', role: 'Community Manager', bio: 'Engaging with users and gathering feedback.', skills: ['Social Media', 'Event Planning', 'Feedback Analysis'], joinedDate: '2024-01-05', },
  { id: '7', name: 'Tom Wilson', role: 'owner', bio: 'Overseeing project direction and strategy.', skills: ['Leadership', 'Strategy', 'Product Vision'], joinedDate: '2022-01-01', },
];

const roleColors: { [key in UserRole]?: string } = {
    Developer: 'bg-blue-500/20 text-blue-700 dark:bg-blue-700/30 dark:text-blue-400 border-blue-500/30',
    Designer: 'bg-pink-500/20 text-pink-700 dark:bg-pink-700/30 dark:text-pink-400 border-pink-500/30',
    Builder: 'bg-orange-500/20 text-orange-700 dark:bg-orange-700/30 dark:text-orange-400 border-orange-500/30',
    'Project Manager': 'bg-indigo-500/20 text-indigo-700 dark:bg-indigo-700/30 dark:text-indigo-400 border-indigo-500/30',
    Moderator: 'bg-yellow-500/20 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-400 border-yellow-500/30',
    'Community Manager': 'bg-green-500/20 text-green-700 dark:bg-green-700/30 dark:text-green-400 border-green-500/30',
    admin: 'bg-purple-500/20 text-purple-700 dark:bg-purple-700/30 dark:text-purple-400 border-purple-500/30',
    owner: 'bg-red-500/20 text-red-700 dark:bg-red-700/30 dark:text-red-400 border-red-500/30',
    guest: 'bg-gray-500/20 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400 border-gray-500/30',
    verified: 'bg-teal-500/20 text-teal-700 dark:bg-teal-700/30 dark:text-teal-400 border-teal-500/30',
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
        <Badge variant="outline" className={`mt-1 ${roleColors[member.role] || 'bg-gray-500/20 text-gray-700 border-gray-500/30'}`}>{member.role}</Badge>
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

  const roles: UserRole[] = ['guest', 'verified', 'Developer', 'Builder', 'Designer', 'Community Manager', 'Moderator', 'Project Manager', 'admin', 'owner'];
  const displayRoles = ['All', ...roles];


  const filteredMembers = initialMembers.filter(member => {
    const nameMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = selectedRole === 'all' || member.role.toLowerCase() === selectedRole.toLowerCase();
    const skillMatch = searchTerm === '' || member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return (nameMatch || skillMatch) && roleMatch;
  });

  const handleOpenMessageDialog = (recipientName: string) => {
    setMessageRecipient(recipientName);
    setIsMessageDialogOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message UI Demo", description: `Message to ${messageRecipient} would be sent. (This is a UI demo only)`});
    setIsMessageDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Team Hub</CardTitle>
          <CardDescription>Connect with the talented individuals building TeamCore.</CardDescription>
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
                {displayRoles.map(role => <SelectItem key={role} value={role.toLowerCase()}>{role}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button className="w-full md:w-auto" disabled> 
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
       <p className="text-sm text-muted-foreground text-center">Community features like real-time messaging and inviting members require backend integration.</p>
    </div>
  );
}
