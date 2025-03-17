
import { FileText, ClipboardList, Clock, AlertCircle } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import DocumentsList from "./DocumentsList";
import ActivityList from "./ActivityList";
import ProjectAnalytics from "./ProjectAnalytics";

interface OverviewDashboardProps {
  project: {
    documents: any[];
    activities: any[];
    stats: {
      documents: number;
      completedTasks: number;
      pendingTasks: number;
      issues: number;
    };
  };
  onViewAllDocuments: () => void;
  onViewAllActivity: () => void;
}

const OverviewDashboard = ({ 
  project, 
  onViewAllDocuments, 
  onViewAllActivity 
}: OverviewDashboardProps) => {
  return (
    <div className="space-y-6">
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
        <DocumentsList 
          documents={project.documents} 
          isOverview={true} 
          onViewAllDocuments={onViewAllDocuments} 
        />
        <ActivityList 
          activities={project.activities} 
          isOverview={true} 
          onViewAllActivity={onViewAllActivity} 
        />
      </div>
      
      <ProjectAnalytics />
    </div>
  );
};

export default OverviewDashboard;
