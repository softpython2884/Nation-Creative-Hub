
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Save, UserCircle2, Palette, Lock } from "lucide-react";
import { useAuth } from "@/contexts/auth-context"; // Import useAuth
import { Badge } from "@/components/ui/badge"; // Import Badge
import { useToast } from "@/hooks/use-toast"; // Import useToast

export default function SettingsPage() {
  const { currentUser } = useAuth(); // Get current user
  const { toast } = useToast();

  // Mock settings data - in a real app, this would come from user preferences
  const userPreferences = {
    prefersDarkTheme: true, // Example, could be fetched
    emailNotifications: {
      taskUpdates: true,
      communityNews: true,
      securityAlerts: true,
    }
  };

  const handleSaveChanges = (section: string) => {
    // In a real app, you would send these changes to a backend
    toast({
      title: "Settings Saved (Demo)",
      description: `${section} preferences have been saved (client-side demo).`,
    });
  };

  if (!currentUser) {
    return <p>Loading user settings...</p>; // Or a loader component
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Settings</CardTitle>
          <CardDescription>Manage your account settings, profile, and preferences.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3">
              <UserCircle2 className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24 border-2 border-primary">
                  <AvatarFallback>
                     {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : <UserCircle2 className="w-16 h-16 text-primary" />}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" disabled>Change Avatar (Soon)</Button>
              </div>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={currentUser.name} />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={currentUser.email} disabled />
              </div>
               <div>
                <Label htmlFor="role">Current Role</Label>
                <Badge variant="outline" className="mt-1 block w-fit">{currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}</Badge>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" defaultValue={"User bio placeholder..."} placeholder="Tell us a bit about yourself..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSaveChanges("Profile")}><Save className="mr-2 h-4 w-4" />Save Profile</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3">
               <Palette className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl">Appearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 rounded-md border">
                <Label htmlFor="theme" className="font-semibold">Theme Preference</Label>
                <ThemeToggle />
              </div>
              <p className="text-sm text-muted-foreground mt-2 px-3">
                Choose between light, dark, or system default theme for the application.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3">
              <Lock className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl">Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" disabled>Change Password (Soon)</Button>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold">Email Notifications:</h4>
                <div className="flex items-center justify-between p-2 rounded-md border">
                  <Label htmlFor="task-email">Task Updates & Mentions</Label>
                  <Switch id="task-email" defaultChecked={userPreferences.emailNotifications.taskUpdates} />
                </div>
                <div className="flex items-center justify-between p-2 rounded-md border">
                  <Label htmlFor="community-email">Community Newsletters</Label>
                  <Switch id="community-email" defaultChecked={userPreferences.emailNotifications.communityNews} />
                </div>
                <div className="flex items-center justify-between p-2 rounded-md border">
                  <Label htmlFor="security-email">Security Alerts</Label>
                  <Switch id="security-email" defaultChecked={userPreferences.emailNotifications.securityAlerts} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSaveChanges("Security & Notification")}><Save className="mr-2 h-4 w-4" />Save Preferences</Button>
            </CardFooter>
          </Card>
          
           <Card className="shadow-sm hover:shadow-md transition-shadow border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive text-xl">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Be careful, these actions are irreversible.
              </p>
              <Button variant="destructive" disabled>Delete Account (Soon)</Button>
            </CardContent>
          </Card>
        </div>
      </div>
       <p className="text-sm text-muted-foreground text-center">Settings are illustrative. Full functionality requires backend integration.</p>
    </div>
  );
}

    