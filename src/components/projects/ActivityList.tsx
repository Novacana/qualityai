
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

interface ActivityListProps {
  activities: ActivityItem[];
  isOverview?: boolean;
  onViewAllActivity?: () => void;
}

const ActivityList = ({ activities, isOverview = false, onViewAllActivity }: ActivityListProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className={isOverview ? "text-lg" : ""}>
          {isOverview ? "Recent Activity" : "Project Activity"}
        </CardTitle>
      </CardHeader>
      <CardContent className={isOverview ? "space-y-4" : ""}>
        <div className="space-y-4">
          {(isOverview ? activities.slice(0, 3) : activities).map(activity => (
            <div 
              key={activity.id}
              className={isOverview 
                ? "flex gap-3 p-2 rounded-md hover:bg-muted" 
                : "flex gap-3 p-3 border rounded-md hover:bg-muted transition-colors"
              }
            >
              {isOverview ? (
                <Activity className="h-4 w-4 mt-0.5 text-muted-foreground" />
              ) : (
                <Avatar className="h-8 w-8 mt-0.5">
                  <AvatarImage src="/placeholder.svg" alt={activity.user} />
                  <AvatarFallback>{getInitials(activity.user)}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div className={isOverview ? "text-sm" : ""}>
                  <span className="font-medium">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </div>
                <div className={isOverview ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))}
          {isOverview && (
            <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={onViewAllActivity}
            >
              View All Activity
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityList;
