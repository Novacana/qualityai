
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronLeft, Shield } from "lucide-react";

interface ProjectHeaderProps {
  project: {
    name: string;
    status: string;
    qmsType: string;
  };
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "success";
      case "Pending": return "outline";
      case "Completed": return "default";
      case "On Hold": return "secondary";
      default: return "outline";
    }
  };

  const handleEditProject = () => {
    toast.info("Projekt wird bearbeitet...");
  };

  const handleGenerateReport = () => {
    toast.info("Report wird generiert...");
    setTimeout(() => {
      toast.success("Report wurde erfolgreich generiert");
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/projects">
              <ChevronLeft className="h-4 w-4 mr-1" /> 
              Back to Projects
            </Link>
          </Button>
          <Badge variant={getStatusBadgeVariant(project.status) as "default" | "secondary" | "destructive" | "outline"}>
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
        <Button variant="outline" onClick={handleEditProject}>
          Edit Project
        </Button>
        <Button onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default ProjectHeader;
