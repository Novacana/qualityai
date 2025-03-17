
import { ClipboardList, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  status: string;
  dueDate: string;
  assignee: string;
}

interface TasksListProps {
  tasks: Task[];
}

const TasksList = ({ tasks }: TasksListProps) => {
  const getTaskStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "In Progress": return "outline";
      case "Pending": return "secondary";
      default: return "outline";
    }
  };

  const handleAddTask = () => {
    toast.info("Neue Aufgabe wird erstellt...");
  };

  const handleEditTask = (taskId: string) => {
    toast.info(`Aufgabe ${taskId} wird bearbeitet...`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Project Tasks</CardTitle>
        <Button onClick={handleAddTask}>
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map(task => (
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
                  onClick={() => handleEditTask(task.id)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksList;
