
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Issue {
  id: string;
  title: string;
  priority: string;
  status: string;
  reported: string;
}

interface IssuesListProps {
  issues: Issue[];
}

const IssuesList = ({ issues }: IssuesListProps) => {
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "outline";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const handleReportIssue = () => {
    toast.info("Problem wird gemeldet...");
  };

  const handleViewIssue = (issueId: string) => {
    toast.info(`Problem ${issueId} wird angezeigt...`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Quality Issues</CardTitle>
        <Button onClick={handleReportIssue}>
          Report Issue
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.map(issue => (
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
                  onClick={() => handleViewIssue(issue.id)}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IssuesList;
