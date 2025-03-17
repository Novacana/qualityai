
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "./StatCard";
import ProjectCard from "./ProjectCard";
import RecentActivity from "./RecentActivity";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

const Dashboard = () => {
  // Mock data for the dashboard
  const stats = [
    { 
      title: "Total Documents", 
      value: 142, 
      icon: FileText, 
      description: "Across all projects"
    },
    { 
      title: "Completed Tasks", 
      value: 78, 
      icon: CheckCircle, 
      description: "Out of 94 total tasks",
      trend: { value: 12, isPositive: true }
    },
    { 
      title: "Pending Reviews", 
      value: 23, 
      icon: Clock, 
      description: "5 due today"
    },
    { 
      title: "Quality Issues", 
      value: 7, 
      icon: AlertCircle, 
      description: "2 high priority",
      trend: { value: 3, isPositive: false }
    }
  ];
  
  const projects = [
    {
      title: "Nanomaterial Research",
      description: "Advanced materials research project",
      qmsType: "ISO 9001",
      progress: 75,
      team: [
        { name: "Alex Johnson", avatar: "" },
        { name: "Maria Garcia", avatar: "" },
        { name: "David Chen", avatar: "" },
      ]
    },
    {
      title: "Medical Device Prototype",
      description: "Implantable device development",
      qmsType: "ISO 13485",
      progress: 45,
      team: [
        { name: "Sarah Williams", avatar: "" },
        { name: "Robert Brown", avatar: "" },
        { name: "Emma Davis", avatar: "" },
        { name: "Michael Wilson", avatar: "" },
      ]
    },
    {
      title: "Food Packaging Material",
      description: "Eco-friendly food packaging materials",
      qmsType: "HACCP",
      progress: 90,
      team: [
        { name: "Jennifer Lee", avatar: "" },
        { name: "Thomas Miller", avatar: "" },
      ]
    },
    {
      title: "Pharmaceutical Compound",
      description: "Novel drug delivery system",
      qmsType: "cGMP",
      progress: 30,
      team: [
        { name: "James Taylor", avatar: "" },
        { name: "Patricia Moore", avatar: "" },
        { name: "Richard White", avatar: "" },
        { name: "Barbara Martin", avatar: "" },
        { name: "Daniel Anderson", avatar: "" },
      ]
    }
  ];
  
  const activities = [
    {
      id: "1",
      user: { name: "Maria Garcia", avatar: "" },
      action: "signed",
      target: "Quality Risk Assessment Document",
      timestamp: "Just now"
    },
    {
      id: "2",
      user: { name: "David Chen", avatar: "" },
      action: "created",
      target: "New HACCP Control Point",
      timestamp: "2 hours ago"
    },
    {
      id: "3",
      user: { name: "Sarah Williams", avatar: "" },
      action: "updated",
      target: "ISO 13485 Documentation",
      timestamp: "Yesterday at 15:30"
    },
    {
      id: "4",
      user: { name: "Robert Brown", avatar: "" },
      action: "commented on",
      target: "Risk Management Report",
      timestamp: "Yesterday at 10:15"
    },
    {
      id: "5",
      user: { name: "James Taylor", avatar: "" },
      action: "completed",
      target: "Training on cGMP Compliance",
      timestamp: "2 days ago"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <StatCard 
                key={i}
                title={stat.title} 
                value={stat.value} 
                icon={stat.icon} 
                description={stat.description}
                trend={stat.trend}
              />
            ))}
          </div>
        
          <h3 className="text-xl font-semibold mt-8 mb-4">Active Projects</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, i) => (
              <ProjectCard 
                key={i}
                title={project.title}
                description={project.description}
                qmsType={project.qmsType}
                progress={project.progress}
                team={project.team}
              />
            ))}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <RecentActivity activities={activities} />
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Overall status across projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">ISO 9001</div>
                      <div className="text-sm text-green-500 font-medium">Compliant</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">ISO 13485</div>
                      <div className="text-sm text-yellow-500 font-medium">In Progress</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">HACCP</div>
                      <div className="text-sm text-green-500 font-medium">Compliant</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">cGMP</div>
                      <div className="text-sm text-yellow-500 font-medium">In Progress</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">IEC 62366</div>
                      <div className="text-sm text-red-500 font-medium">Attention Needed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed performance metrics will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Analytics dashboard coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>Your assigned and upcoming tasks will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Task management interface coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
