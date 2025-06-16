
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { User, UserRole, ProjectSpotlightData } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, Edit, Save, Users, Tv } from 'lucide-react';

const PROJECT_SPOTLIGHT_STORAGE_KEY = 'projectSpotlight_teamcore';

export default function AdminPage() {
  const { currentUser, getAllUsers, updateUserRole } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [users, setUsers] = useState<User[]>([]);
  const [spotlightData, setSpotlightData] = useState<ProjectSpotlightData>({
    title: 'Project Spotlight: Core Platform Alpha',
    description: 'Current focus is stabilizing the core platform features for an upcoming alpha release. Key areas include task management and role permissions.',
    button1Text: 'View Roadmap',
    button1Link: '#',
    button2Text: 'Join Testing',
    button2Link: '#',
  });

  useEffect(() => {
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'owner')) {
      router.replace('/dashboard'); 
      return;
    }
    setUsers(getAllUsers());

    if (typeof window !== 'undefined') {
      const storedSpotlight = localStorage.getItem(PROJECT_SPOTLIGHT_STORAGE_KEY);
      if (storedSpotlight) {
        try {
            setSpotlightData(JSON.parse(storedSpotlight));
        } catch (e) {
            console.error("Failed to parse spotlight data from localStorage", e);
            localStorage.removeItem(PROJECT_SPOTLIGHT_STORAGE_KEY);
        }
      }
    }
  }, [currentUser, router, getAllUsers]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      // Verification status is handled by updateUserRole based on the role
      await updateUserRole(userId, newRole);
      setUsers(getAllUsers()); 
      toast({ title: "User Updated", description: `User role changed to ${newRole}.` });
    } catch (error) {
      toast({ title: "Update Failed", description: (error as Error).message, variant: "destructive" });
    }
  };
  
  const handleSpotlightChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSpotlightData(prev => ({ ...prev, [name]: value }));
  };

  const saveSpotlightData = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PROJECT_SPOTLIGHT_STORAGE_KEY, JSON.stringify(spotlightData));
      toast({ title: "Spotlight Saved", description: "Project spotlight data has been updated." });
    }
  };


  if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'owner')) {
    return <p>Access Denied. Redirecting...</p>;
  }

  const availableRoles: UserRole[] = ['guest', 'verified', 'Developer', 'Builder', 'Designer', 'Community Manager', 'Moderator', 'Project Manager', 'admin', 'owner'];


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center"><ShieldCheck className="mr-3 h-8 w-8 text-primary"/>Admin Panel</CardTitle>
          <CardDescription>Manage users and site content for TeamCore.</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center"><Users className="mr-2 h-5 w-5"/>User Management</CardTitle>
          <CardDescription>View and manage user roles and verification status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell><Badge variant={user.role === 'admin' || user.role === 'owner' ? 'default' : 'secondary'}>{user.role}</Badge></TableCell>
                  <TableCell>{user.isVerified ? <Badge variant="default" className="bg-green-500/80 hover:bg-green-500/70">Yes</Badge> : <Badge variant="destructive">No</Badge>}</TableCell>
                  <TableCell>
                    {currentUser.id !== user.id && (currentUser.role === 'owner' || (user.role !== 'owner' && user.role !== 'admin')) && (currentUser.role === 'owner' || user.role !== 'owner') ? (
                       <Select 
                          value={user.role} 
                          onValueChange={(newRole: UserRole) => handleRoleChange(user.id, newRole)}
                          disabled={currentUser.role === 'admin' && (user.role === 'admin' || user.role === 'owner')} // Admin cannot change other admin or owner
                        >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Change role" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRoles.map(role => (
                             // Owner can assign any role. Admin cannot assign 'owner' or 'admin' to others.
                            (currentUser.role === 'owner' || (role !== 'owner' && role !== 'admin')) && 
                            <SelectItem key={role} value={role} disabled={currentUser.id === user.id && role !== currentUser.role}>
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                        <Badge variant="outline">N/A</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center"><Tv className="mr-2 h-5 w-5"/>Project Spotlight Editor</CardTitle>
          <CardDescription>Customize the project spotlight section on the main dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="spotlightTitle">Title</Label>
            <Input id="spotlightTitle" name="title" value={spotlightData.title} onChange={handleSpotlightChange} />
          </div>
          <div>
            <Label htmlFor="spotlightDescription">Description</Label>
            <Textarea id="spotlightDescription" name="description" value={spotlightData.description} onChange={handleSpotlightChange} rows={4} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="button1Text">Button 1 Text</Label>
              <Input id="button1Text" name="button1Text" value={spotlightData.button1Text || ''} onChange={handleSpotlightChange} placeholder="e.g., View Details"/>
            </div>
            <div>
              <Label htmlFor="button1Link">Button 1 Link/Action</Label>
              <Input id="button1Link" name="button1Link" value={spotlightData.button1Link || ''} onChange={handleSpotlightChange} placeholder="e.g., /dashboard/projects/azure-glade"/>
            </div>
          </div>
           <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="button2Text">Button 2 Text</Label>
              <Input id="button2Text" name="button2Text" value={spotlightData.button2Text || ''} onChange={handleSpotlightChange} placeholder="e.g., Contribute"/>
            </div>
            <div>
              <Label htmlFor="button2Link">Button 2 Link/Action</Label>
              <Input id="button2Link" name="button2Link" value={spotlightData.button2Link || ''} onChange={handleSpotlightChange} placeholder="e.g., /dashboard/tasks?filter=azure-glade"/>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveSpotlightData}><Save className="mr-2 h-4 w-4"/>Save Spotlight Settings</Button>
        </CardFooter>
      </Card>
      <p className="text-sm text-muted-foreground text-center">Note: User management and spotlight data are currently stored in browser localStorage for demo purposes and are not shared across users or sessions on different devices.</p>
    </div>
  );
}
