
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectOverview from "@/components/projects/ProjectOverview";
import OverviewDashboard from "@/components/projects/OverviewDashboard";
import DocumentsList from "@/components/projects/DocumentsList";
import TasksList from "@/components/projects/TasksList";
import IssuesList from "@/components/projects/IssuesList";
import ActivityList from "@/components/projects/ActivityList";

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

  const handleViewAllDocuments = () => {
    setActiveTab("documents");
  };

  const handleViewAllActivity = () => {
    setActiveTab("activity");
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <ProjectHeader project={project} />
      <ProjectOverview project={project} />
      
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewDashboard 
            project={project}
            onViewAllDocuments={handleViewAllDocuments}
            onViewAllActivity={handleViewAllActivity}
          />
        </TabsContent>
        
        <TabsContent value="documents">
          <DocumentsList documents={project.documents} />
        </TabsContent>
        
        <TabsContent value="tasks">
          <TasksList tasks={project.tasks} />
        </TabsContent>
        
        <TabsContent value="issues">
          <IssuesList issues={project.issues} />
        </TabsContent>
        
        <TabsContent value="activity">
          <ActivityList activities={project.activities} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
