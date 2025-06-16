
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Users, ListChecks, LayoutDashboard, Workflow } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";

export default function HomePage() {
  const features = [
    {
      icon: <ListChecks className="h-8 w-8 text-primary" />,
      title: "Robust Task Management",
      description: "Organize project milestones, track progress with intuitive to-do lists, and manage notes efficiently.",
      link: "/dashboard/tasks",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Vibrant Community Hub",
      description: "Connect with team members, manage roles, and foster collaboration.",
      link: "/dashboard/community",
    },
    {
      icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
      title: "Personalized Dashboards",
      description: "Get a tailored overview of your tasks, notifications, and contributions at a glance.",
      link: "/dashboard",
    },
    {
      icon: <Workflow className="h-8 w-8 text-primary" />,
      title: "Seamless Integrations",
      description: "Stay updated with notifications, engage in forums, and manage project workflows.",
      link: "/dashboard/integrations",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30 dark:from-background dark:to-primary/10">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-center">
          <div className="flex items-center gap-x-8">
            <Logo />
            <nav className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="#features">Features</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#community">Community</Link>
              </Button>
              <ThemeToggle />
              <Button asChild>
                <Link href="/auth/login">Enter Platform</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container text-center">
            <h1 className="text-4xl font-headline font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              TeamCore
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl">
              The Collaborative Workspace Platform. <br />
              Uniting teams to build the future.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/auth/login">Explore TeamCore</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background/50 dark:bg-background/80">
          <div className="container">
            <h2 className="text-3xl font-headline font-bold text-center sm:text-4xl">
              Everything Your Team Needs in One Place
            </h2>
            <p className="mt-4 mb-12 text-center text-lg text-foreground/70">
              Streamline your workflow and collaboration with our powerful set of tools.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="items-center">
                    {feature.icon}
                    <CardTitle className="mt-4 text-xl text-center">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{feature.description}</CardDescription>
                    <div className="mt-4 text-center">
                      <Button variant="link" asChild>
                        <Link href={feature.link}>
                          <span>Discover <span className="sr-only">{feature.title}</span></span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-headline font-bold sm:text-4xl">
                  Build with a Thriving Team
                </h2>
                <p className="mt-4 text-lg text-foreground/70">
                  TeamCore is designed for collaborative project development. Connect, manage roles, and contribute to an ever-evolving workspace.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Collaborate on exciting projects",
                    "Share your skills and learn from others",
                    "Help shape the future of your projects",
                    "Evolving roles and recognition for your contributions",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link href="/dashboard/community">Meet the Team</Link>
                  </Button>
                </div>
              </div>
               {/* <div className="flex items-center justify-center">
                <Users className="w-64 h-64 text-primary/30" data-ai-hint="team collaboration" />
              </div> */}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-background">
        <div className="container text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} TeamCore. All rights reserved.</p>
          <p className="text-sm mt-1">Powered by teamwork and innovation.</p>
        </div>
      </footer>
    </div>
  );
}
