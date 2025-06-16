"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Save, UserCircle2, Palette, Lock } from "lucide-react";

export default function SettingsPage() {
  // Mock user data
  const user = {
    name: "Elara Moonwhisper",
    email: "elara.m@nationquest.dev",
    bio: "Crafting immersive soundscapes and epic scores for Nation Quest.",
    avatarUrl: "https://placehold.co/100x100.png?text=EM",
    prefersDarkTheme: true,
    emailNotifications: {
      taskUpdates: true,
      communityNews: true,
      securityAlerts: true,
    }
  };

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
                  <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user portrait" />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" defaultValue={user.bio} placeholder="Tell us a bit about yourself..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full"><Save className="mr-2 h-4 w-4" />Save Profile</Button>
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
              <Button variant="outline">Change Password</Button>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold">Email Notifications:</h4>
                <div className="flex items-center justify-between p-2 rounded-md border">
                  <Label htmlFor="task-email">Task Updates & Mentions</Label>
                  <Switch id="task-email" defaultChecked={user.emailNotifications.taskUpdates} />
                </div>
                <div className="flex items-center justify-between p-2 rounded-md border">
                  <Label htmlFor="community-email">Community Newsletters</Label>
                  <Switch id="community-email" defaultChecked={user.emailNotifications.communityNews} />
                </div>
                <div className="flex items-center justify-between p-2 rounded-md border">
                  <Label htmlFor="security-email">Security Alerts</Label>
                  <Switch id="security-email" defaultChecked={user.emailNotifications.securityAlerts} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full"><Save className="mr-2 h-4 w-4" />Save Preferences</Button>
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
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
