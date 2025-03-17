
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  ChevronLeft, 
  FileText, 
  Users, 
  Calendar, 
  ClipboardList, 
  Clock, 
  AlertCircle,
  BarChart,
  Activity,
  Shield
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatCard from "@/components/dashboard/StatCard";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock project data - in a real app this would be fetched from API
  const project = {
    id: id || "P-001",
    name: "Nanomaterial Research Project",
    description: "Investigation of novel nanomaterials for industrial applications focusing on surface properties and environmental impact. The project aims to develop sustainable materials with enhanced performance characteristics.",
    status: "Active",
    qmsType: "ISO 9001",
    startDate: "2023-04-15",
    targetDate: "2024-06-30",
    progress: 65,
    team: [
      { id: "U-001", name: "Dr. Alexandra Johnson", role: "Project Lead", avatar: "/placeholder.svg" },
      { id: "U-002", name: "Dr. Michael Schmidt", role: "QMS Manager", avatar: "/placeholder.svg" },
      { id: "U-003", name: "Dr. Sarah Wagner", role: "Researcher", avatar: "/placeholder.svg" },
      { id: "U-004", name: "Dr. Thomas Müller", role: "Researcher", avatar: "/placeholder.svg" }
    ],
    documents: [
      { id: "DOC-001", title: "Quality Management System Manual", type: "SOP", status: "Approved", updatedAt: "2023-09-15" },
      { id: "DOC-002", title: "Risk Assessment Report", type: "Report", status: "In Review", updatedAt: "2023-09-20" },
      { id: "DOC-003", title: "Equipment Calibration Log", type: "Form", status: "Approved", updatedAt: "2023-08-30" },
      { id: "DOC-004", title: "Material Safety Data Sheet", type: "Form", status: "Draft", updatedAt: "2023-09-18" }
    ],
    tasks: [
      { id: "T-001", title: "Complete risk assessment", status: "Completed", dueDate: "2023-09-15", assignee: "Dr. Michael Schmidt" },
      { id: "T-002", title: "Prepare monthly report", status: "In Progress", dueDate: "2023-09-30", assignee: "Dr. Alexandra Johnson" },
      { id: "T-003", title: "Review ISO documentation", status: "Pending", dueDate: "2023-10-10", assignee: "Dr. Sarah Wagner" },
      { id: "T-004", title: "Update material specifications", status: "Pending", dueDate: "2023-10-15", assignee: "Dr. Thomas Müller" }
    ],
    issues: [
      { id: "I-001", title: "Equipment calibration discrepancy", priority: "High", status: "Open", reported: "2023-09-10" },
      { id: "I-002", title: "Documentation procedure unclear", priority: "Medium", status: "In Review", reported: "2023-09-15" }
    ],
    activities: [
      { id: "A-001", user: "Dr. Alexandra Johnson", action: "updated", target: "project progress", timestamp: "Today, 09:45" },
      { id: "A-002", user: "Dr. Michael Schmidt", action: "added", target: "Risk Assessment Report", timestamp: "Yesterday, 16:30" },
      { id: "A-003", user: "Dr. Sarah Wagner", action: "completed", target: "equipment calibration", timestamp: "2 days ago" },
      { id: "A-004", user: "Dr. Thomas Müller", action: "commented on", target: "material specifications", timestamp: "3 days ago" }
    ],
    stats: {
      documents: 12,
      completedTasks: 8,
      pendingTasks: 5,
      issues: 2
    }
  };

  // Helper functions
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "success";
      case "Pending": return "warning";
      case "Completed": return "default";
      case "On Hold": return "secondary";
      default: return "outline";
    }
  };
  
  const getTaskStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "In Progress": return "warning";
      case "Pending": return "secondary";
      default: return "outline";
    }
  };
  
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "warning";
      case "Low": return "outline";
      default: return "outline";
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/projects">
                <ChevronLeft className="h-4 w-4 mr-1" /> 
                Back to Projects
              </Link>
            </Button>
            <Badge variant={getStatusBadgeVariant(project.status) as any}>
              {project.status}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <div className="flex items-center text-muted-foreground">
            <Shield className="h-4 w-4 mr-1" />
            <span>QMS Type: {project.qmsType}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => toast.info("Edit project functionality coming soon")}>
            Edit Project
          </Button>
          <Button onClick={() => toast.info("Generate report functionality coming soon")}>
            Generate Report
          </Button>
        </div>
      </div>
      
      <Card className="border-t-4 border-t-primary">
        <CardHeader className="pb-2">
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Progress</div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={project.progress} 
                    className="h-2"
                    indicatorClassName={project.progress > 66 ? "bg-green-500" : project.progress > 33 ? "bg-yellow-500" : "bg-red-500"}
                  />
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Start Date</div>
                  <div className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.startDate}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Target Date</div>
                  <div className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.targetDate}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-2">Team Members</div>
              <div className="flex flex-wrap gap-2">
                {project.team.map(member => (
                  <div key={member.id} className="flex items-center p-2 rounded-md border bg-background">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12"
                  onClick={() => toast.info("Add team member functionality coming soon")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="Documents" 
              value={project.stats.documents} 
              icon={FileText} 
              description="Project documentation"
            />
            <StatCard 
              title="Completed Tasks" 
              value={project.stats.completedTasks} 
              icon={ClipboardList} 
              description="Out of 13 total tasks"
              variant="success"
            />
            <StatCard 
              title="Pending Tasks" 
              value={project.stats.pendingTasks} 
              icon={Clock} 
              description="2 due this week"
              variant="warning"
            />
            <StatCard 
              title="Quality Issues" 
              value={project.stats.issues} 
              icon={AlertCircle} 
              description="1 high priority"
              variant="danger"
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.documents.slice(0, 3).map(doc => (
                  <div key={doc.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-3 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{doc.title}</div>
                        <div className="text-xs text-muted-foreground">Updated: {doc.updatedAt}</div>
                      </div>
                    </div>
                    <Badge variant={doc.status === "Approved" ? "success" : doc.status === "In Review" ? "warning" : "secondary"}>
                      {doc.status}
                    </Badge>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={() => setActiveTab("documents")}
                >
                  View All Documents
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.activities.slice(0, 3).map(activity => (
                  <div key={activity.id} className="flex gap-3 p-2 rounded-md hover:bg-muted">
                    <Activity className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={() => setActiveTab("activity")}
                >
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Analytics</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Project analytics visualization coming soon
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => toast.info("Analytics functionality coming soon")}
                >
                  Generate Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Project Documents</CardTitle>
              <Button 
                onClick={() => toast.info("Add document functionality coming soon")}
              >
                Add Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.documents.map(doc => (
                  <div 
                    key={doc.id}
                    className="flex justify-between items-center p-3 border rounded-md hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-muted mr-3">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-2">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>Updated: {doc.updatedAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={doc.status === "Approved" ? "success" : doc.status === "In Review" ? "warning" : "secondary"}>
                        {doc.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info("View document functionality coming soon")}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Project Tasks</CardTitle>
              <Button 
                onClick={() => toast.info("Add task functionality coming soon")}
              >
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.tasks.map(task => (
                  <div 
                    key={task.id}
                    className="flex justify-between items-center p-3 border rounded-md hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-muted mr-3">
                        <ClipboardList className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-2">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Due: {task.dueDate}</span>
                          <span>•</span>
                          <span>Assignee: {task.assignee}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getTaskStatusBadgeVariant(task.status) as any}>
                        {task.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info("Edit task functionality coming soon")}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="issues">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quality Issues</CardTitle>
              <Button 
                onClick={() => toast.info("Report issue functionality coming soon")}
              >
                Report Issue
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.issues.map(issue => (
                  <div 
                    key={issue.id}
                    className="flex justify-between items-center p-3 border rounded-md hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-muted mr-3">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{issue.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-2">
                          <span>Reported: {issue.reported}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityBadgeVariant(issue.priority) as any}>
                        {issue.priority}
                      </Badge>
                      <Badge>
                        {issue.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info("View issue functionality coming soon")}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Project Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.activities.map(activity => (
                  <div 
                    key={activity.id}
                    className="flex gap-3 p-3 border rounded-md hover:bg-muted transition-colors"
                  >
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarImage src="/placeholder.svg" alt={activity.user} />
                      <AvatarFallback>{getInitials(activity.user)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
