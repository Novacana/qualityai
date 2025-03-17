
import { Calendar, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface ProjectOverviewProps {
  project: {
    description: string;
    progress: number;
    startDate: string;
    targetDate: string;
    team: {
      id: string;
      name: string;
      role: string;
      avatar: string;
    }[];
  };
}

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleAddTeamMember = () => {
    toast.info("Teammitglied wird hinzugefügt...");
  };

  return (
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
              <button 
                className="h-12 w-12 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                onClick={handleAddTeamMember}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectOverview;
