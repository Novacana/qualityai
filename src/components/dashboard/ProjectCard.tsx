
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectCardProps {
  title: string;
  description: string;
  qmsType: string;
  progress: number;
  team: {
    name: string;
    avatar?: string;
  }[];
}

const ProjectCard = ({ title, description, qmsType, progress, team }: ProjectCardProps) => {
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

  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{title}</CardTitle>
            <CardDescription className="text-sm mt-1">{description}</CardDescription>
          </div>
          <Badge variant={getBadgeVariant(qmsType)}>{qmsType}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex justify-between items-center border-t">
        <div className="flex -space-x-2">
          {team.slice(0, 3).map((member, i) => (
            <Avatar key={i} className="border-2 border-background h-8 w-8">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-xs">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          ))}
          {team.length > 3 && (
            <div className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-background bg-muted text-muted-foreground text-xs">
              +{team.length - 3}
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          Updated 2d ago
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
