
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProjectCardProps {
  title: string;
  description: string;
  qmsType: string;
  progress: number;
  team: {
    name: string;
    avatar?: string;
  }[];
  status?: "Active" | "Pending" | "Completed";
  daysLeft?: number;
  lastUpdated?: string;
  onClick?: () => void;
}

const ProjectCard = ({ 
  title, 
  description, 
  qmsType, 
  progress, 
  team,
  status = "Active",
  daysLeft,
  lastUpdated,
  onClick
}: ProjectCardProps) => {
  // Helper function to get badge color based on QMS type
  const getBadgeVariant = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      "ISO 9001": "default",
      "ISO 13485": "secondary",
      "HACCP": "outline",
      "cGMP": "destructive",
    };

    return variants[type] || "outline";
  };

  // Helper function to get status badge color
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Pending":
        return "secondary";
      case "Completed":
        return "outline";
      default:
        return "outline";
    }
  };

  // Helper function to get progress color
  const getProgressColor = (value: number) => {
    if (value >= 75) return "bg-green-500";
    if (value >= 50) return "bg-yellow-500";
    if (value >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Card className="overflow-hidden card-hover transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium line-clamp-1">{title}</CardTitle>
            <CardDescription className="text-sm mt-1 line-clamp-2">{description}</CardDescription>
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            <Badge variant={getBadgeVariant(qmsType)} className="whitespace-nowrap">
              {qmsType}
            </Badge>
            {status && (
              <Badge variant={getStatusBadgeVariant(status)} className="whitespace-nowrap">
                {status}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2" 
              indicatorClassName={getProgressColor(progress)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            {daysLeft !== undefined && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{daysLeft} days left</span>
              </div>
            )}
            {lastUpdated && (
              <div className="flex items-center gap-1.5 justify-end">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">{lastUpdated}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex justify-between items-center border-t">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {team.slice(0, 3).map((member, i) => (
              <Avatar key={i} className="border-2 border-background h-7 w-7">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            ))}
            {team.length > 3 && (
              <div className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-background bg-muted text-muted-foreground text-xs">
                +{team.length - 3}
              </div>
            )}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 mr-1" /> 
            {team.length}
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClick || (() => toast.info("View project details functionality coming soon"))}
          className="text-xs"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
