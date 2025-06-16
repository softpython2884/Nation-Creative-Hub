
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, MessageSquare, ShieldCheck, ExternalLink, Settings2 } from "lucide-react"; // Removed Users icon as it's not used
// Removed Image from 'next/image' as it's not used

// Mock Discord Icon SVG as lucide-react doesn't have it
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M20.297 2.657A10.82 10.82 0 0012.45.003C12.45.003 12.45.003 12.45.003a.08.08 0 00-.06.01c-1.68.43-3.24.99-4.68 1.67a.1.1 0 00-.06.08l-.96 4.03a.06.06 0 00.01.06s.43.72.93 1.23a.08.08 0 00.09.02c.2-.14.4-.27.6-.4a.06.06 0 00.02-.05c0-.02-.01-.04-.02-.06a11.11 11.11 0 01-1.3-1.51s-.02-.01-.04-.02a.09.09 0 00-.09.04c-.15.22-.3.46-.43.7a.1.1 0 00-.01.08c0 .03.01.06.02.08.1.19.2.38.32.57a.08.08 0 00.07.04c.22-.02.43-.05.64-.09a.06.06 0 00.05-.05c.02-.06.03-.12.04-.18a.08.08 0 00-.05-.09c-.54-.27-1.03-.62-1.03-.62a.08.08 0 00-.08.01L2.827 10.43a.08.08 0 00-.06.07c-.02.19-.02.38-.02.57 0 .02 0 .03.01.05.03.2.06.4.1.6a.07.07 0 00.08.05l.02-.01C4.997 10.45 7.427 8.6 7.427 8.6a.06.06 0 00.01-.08c-.01-.03-.01-.06-.02-.09a.09.09 0 00-.08-.06c-.12.01-.24.01-.36.01h-.02c-.15 0-.3-.01-.44-.02a.09.09 0 00-.09.07c-.52 1.01-.87 2.17-.87 2.17a.06.06 0 00.01.06c.08.15.17.3.27.44a.09.09 0 00.08.04l.1-.01.01-.01c.3-.07.6-.16.88-.26a.07.07 0 00.05-.06c.01-.02.01-.05.01-.07 0-.16-.06-.32-.14-.46a.07.07 0 00-.08-.04c-.01 0-.01 0-.02.01-.17.09-.34.2-.5.3a.09.09 0 00-.05.08c0 .01.01.03.01.04.02.08.04.17.07.25a.08.08 0 00.07.04c.33-.04.66-.1 1-.16a.06.06 0 00.04-.05s.38-2.46.43-2.65a.08.08 0 000-.06c0-.03-.01-.05-.02-.08a.08.08 0 00-.09-.05c-.05.01-.1.02-.14.03l-.02.01c-.19.09-.37.19-.55.3a.09.09 0 00-.05.08c0 .02.01.04.02.06l.01.02c.1.2.22.38.34.56a.08.08 0 00.07.04h.01c.4-.06.78-.16 1.15-.28a.06.06 0 00.04-.06c.01-.02.01-.05.01-.07v-.02c-.01-.16-.08-.31-.18-.44a.07.07 0 00-.08-.03l-.01.01c-.6.34-1.14.78-1.14.78a.06.06 0 00-.04.06c0 .02.01.04.02.05l2.39 3.01a.08.08 0 00.06.03h.01c1.4-.17 2.74-.57 4-1.12a.07.07 0 00.04-.06l.01-.03c.12-.67.12-1.35 0-2.02a.06.06 0 00-.05-.06c-.01 0-.01 0 0 0l-.02-.01c-.48-.21-.97-.38-1.47-.51a.09.09 0 00-.09.03c-.1.07-.18.15-.26.23a.07.07 0 000 .09c.08.14.17.28.28.41a.09.09 0 00.09.03c.16-.06.32-.13.48-.2a.06.06 0 00.04-.05c.01-.02.02-.04.02-.06a.08.08 0 00-.09-.08c-.03.01-.07.01-.1.02h0c-.6.16-1.18.42-1.72.74a.09.09 0 00-.05.08c-.01.02 0 .05.01.07l.31 1.34a.06.06 0 00.05.05c.01 0 .01 0 .02 0 .16-.03.32-.06.48-.1a.09.09 0 00.07-.08c.01-.03.01-.06.01-.09a.08.08 0 00-.06-.08c-.01 0-.03 0-.04-.01-.12.01-.23.02-.35.02h-.02c-.15 0-.3-.01-.44-.02a.09.09 0 00-.09.07c-.08.15-.16.29-.24.44a.06.06 0 000 .06s.22.93.22.93a.09.09 0 00.07.07l.02.01c.32.06.64.1.97.13a.08.08 0 00.07-.03c.1-.07.18-.15.26-.24a.06.06 0 000-.08c0-.01-.01-.02-.01-.03l-.28-1.2a.09.09 0 00-.08-.07h-.01c-.6.08-1.18.27-1.74.54a.09.09 0 00-.05.08c0 .02.01.05.02.07l.82 2.85a.06.06 0 00.05.05l.02.01c.5.1.99.16 1.48.19a.09.09 0 00.08-.04c.1-.08.18-.17.25-.26a.07.07 0 000-.09l-.01-.01c-.12-.2-.22-.41-.3-.63a.09.09 0 00-.08-.07h-.02c-.27.04-.54.06-.81.07a.08.08 0 00-.07.06v.01c-.02.09-.05.18-.08.27a.09.09 0 00.01.09c.01.01.01.01.02.01l.5.23c.02.01.03.01.05.01s.03 0 .05-.01l1.76-.8a.07.07 0 00.03-.06c.02-.06.02-.12.02-.18a.08.08 0 00-.05-.08c-.01 0-.01 0-.02 0L8.677 8.62a.06.06 0 00-.05.01c-.15.1-.29.2-.42.32a.09.09 0 00-.03.09c0 .03.01.05.02.08l.94 3.97a.06.06 0 00.06.05h.01c1.38-.03 2.74-.22 4.06-.57a.09.09 0 00.06-.08c.01-.02.01-.04.01-.06l.31-4.65a.06.06 0 00-.04-.06zM8.617 12.58c-.82.01-1.5-.71-1.5-1.58s.68-1.59 1.5-1.59c.82-.01 1.5.71 1.5 1.59s-.68 1.58-1.5 1.58zm6.48-1.5c0 .87-.68 1.58-1.5 1.58s-1.5-.71-1.5-1.58S12.917 9.5 13.6 9.5s1.49.72 1.49 1.58z" />
  </svg>
);


export default function IntegrationsPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Integrations & Roles</CardTitle>
          <CardDescription>Manage your connections, notifications, and understand your role within the Nation Quest community.</CardDescription>
        </CardHeader>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center gap-4">
          <Bell className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Control how you receive updates from Nation Quest.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-md border">
            <div>
              <Label htmlFor="task-updates" className="font-semibold">Task Updates</Label>
              <p className="text-sm text-muted-foreground">Receive notifications for new tasks, comments, and status changes.</p>
            </div>
            <Switch id="task-updates" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-3 rounded-md border">
            <div>
              <Label htmlFor="community-activity" className="font-semibold">Community Activity</Label>
              <p className="text-sm text-muted-foreground">Get notified about new forum posts, member achievements, and events.</p>
            </div>
            <Switch id="community-activity" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-3 rounded-md border">
            <div>
              <Label htmlFor="project-milestones" className="font-semibold">Project Milestones</Label>
              <p className="text-sm text-muted-foreground">Stay informed about major project updates and releases.</p>
            </div>
            <Switch id="project-milestones" />
          </div>
        </CardContent>
        <CardFooter>
          <Button><Settings2 className="mr-2 h-4 w-4"/>Save Notification Preferences</Button>
        </CardFooter>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Forums</CardTitle>
              <CardDescription>Engage in discussions, share ideas, and get help.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our community forums are the central place for all Nation Quest discussions.
              Participate in role-specific channels, general chat, or technical support threads.
            </p>
            <Button asChild variant="outline">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Visit Forums <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <DiscordIcon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Discord Integration</CardTitle>
              <CardDescription>Connect your Discord account for real-time updates.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Link your Nation Quest account with Discord to receive instant notifications, participate in voice chats,
              and get access to exclusive community channels.
            </p>
            <Button>
              <DiscordIcon className="mr-2 h-5 w-5" /> Connect to Discord
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center gap-4">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>User Roles & Evolution</CardTitle>
            <CardDescription>Understand how roles work and grow within the community.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            At Nation Quest, we value every contribution. Your role can evolve based on your activity, skills demonstrated,
            and leadership within the community. Start as an Adventurer and rise through the ranks!
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md bg-muted/50">
              <h4 className="font-semibold">Adventurer (New Member)</h4>
              <p className="text-xs text-muted-foreground mt-1">Explore, learn, and start contributing to tasks.</p>
            </div>
            <div className="p-4 border rounded-md bg-muted/50">
              <h4 className="font-semibold">Contributor (Active Member)</h4>
              <p className="text-xs text-muted-foreground mt-1">Consistently contributes to projects and discussions.</p>
            </div>
            <div className="p-4 border rounded-md bg-muted/50">
              <h4 className="font-semibold">Specialist (Skilled Role)</h4>
              <p className="text-xs text-muted-foreground mt-1">Recognized expertise in areas like Design, Composing, Building, etc.</p>
            </div>
            <div className="p-4 border rounded-md bg-muted/50">
              <h4 className="font-semibold">Mentor (Experienced Guide)</h4>
              <p className="text-xs text-muted-foreground mt-1">Helps guide new members and shares knowledge.</p>
            </div>
            <div className="p-4 border rounded-md bg-muted/50">
              <h4 className="font-semibold">Coordinator (Team Lead)</h4>
              <p className="text-xs text-muted-foreground mt-1">Leads specific projects or initiatives.</p>
            </div>
             <div className="p-4 border rounded-md bg-primary/10 border-primary/30">
              <h4 className="font-semibold text-primary">Legend (Visionary)</h4>
              <p className="text-xs text-muted-foreground mt-1">Significantly shapes the direction of Nation Quest.</p>
            </div>
          </div>
           <p className="text-sm text-muted-foreground">
            More details on role progression and benefits can be found in our community guidelines on the forums.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
