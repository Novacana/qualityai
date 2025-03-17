
import { useState } from "react";
import { ClipboardList, Calendar, User, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Task {
  id: string;
  title: string;
  status: string;
  dueDate: string;
  assignee: string;
  description?: string;
  priority?: string;
  comments?: { author: string; date: string; text: string }[];
}

interface TasksListProps {
  tasks: Task[];
}

const TasksList = ({ tasks: initialTasks }: TasksListProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    status: "Pending",
    dueDate: "",
    assignee: "",
    description: "",
    priority: "Medium",
  });
  const [newComment, setNewComment] = useState("");

  const getTaskStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "In Progress": return "outline";
      case "Pending": return "secondary";
      default: return "outline";
    }
  };

  const getPriorityBadgeVariant = (priority?: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "outline";
    }
  };

  const handleAddTask = () => {
    setShowAddDialog(true);
  };

  const handleViewTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setViewTask(task);
      setShowViewDialog(true);
    }
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setNewTask({
        ...task
      });
      setShowAddDialog(true);
    } else {
      toast.info(`Aufgabe ${taskId} wird bearbeitet...`);
    }
  };

  const handleSaveTask = () => {
    if (!newTask.title || !newTask.status || !newTask.dueDate) {
      toast.error("Bitte füllen Sie alle erforderlichen Felder aus");
      return;
    }

    const taskId = newTask.id || `task-${Date.now()}`;
    
    if (newTask.id) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, ...newTask as Task } 
          : task
      ));
      toast.success("Aufgabe wurde aktualisiert");
    } else {
      // Add new task
      const task: Task = {
        id: taskId,
        title: newTask.title || "",
        status: newTask.status || "Pending",
        dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
        assignee: newTask.assignee || "",
        description: newTask.description,
        priority: newTask.priority
      };
      
      setTasks([task, ...tasks]);
      toast.success("Neue Aufgabe wurde erstellt");
    }

    setNewTask({
      title: "",
      status: "Pending",
      dueDate: "",
      assignee: "",
      description: "",
      priority: "Medium",
    });
    setShowAddDialog(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !viewTask) return;
    
    const updatedTask = {
      ...viewTask,
      comments: [
        ...(viewTask.comments || []),
        {
          author: "Current User",
          date: new Date().toISOString().split('T')[0],
          text: newComment
        }
      ]
    };
    
    setTasks(tasks.map(task => 
      task.id === viewTask.id 
        ? updatedTask 
        : task
    ));
    
    setViewTask(updatedTask);
    setNewComment("");
    toast.success("Kommentar hinzugefügt");
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus } 
        : task
    ));
    
    toast.success(`Aufgabenstatus geändert auf ${newStatus}`);
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
              className="flex justify-between items-center p-3 border rounded-md hover:bg-muted transition-colors cursor-pointer"
              onClick={() => handleViewTask(task.id)}
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
                    {task.priority && (
                      <>
                        <span>•</span>
                        <Badge variant={getPriorityBadgeVariant(task.priority) as any} className="text-xs">
                          {task.priority}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <Badge variant={getTaskStatusBadgeVariant(task.status) as any}>
                  {task.status}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTask(task.id);
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">Keine Aufgaben vorhanden</p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={handleAddTask}
              >
                Aufgabe hinzufügen
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      {/* View Task Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {viewTask && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{viewTask.title}</DialogTitle>
                  <Badge variant={getTaskStatusBadgeVariant(viewTask.status) as any}>
                    {viewTask.status}
                  </Badge>
                </div>
                <DialogDescription>
                  Task ID: {viewTask.id}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Due Date</Label>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{viewTask.dueDate}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Assignee</Label>
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{viewTask.assignee}</span>
                    </div>
                  </div>
                </div>
                
                {viewTask.priority && (
                  <div>
                    <Label className="text-sm font-medium">Priority</Label>
                    <div className="mt-1">
                      <Badge variant={getPriorityBadgeVariant(viewTask.priority) as any}>
                        {viewTask.priority}
                      </Badge>
                    </div>
                  </div>
                )}
                
                {viewTask.description && (
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <div className="mt-1 p-3 bg-muted rounded-md text-sm">
                      {viewTask.description}
                    </div>
                  </div>
                )}
                
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button 
                      variant={viewTask.status === "Pending" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(viewTask.id, "Pending")}
                    >
                      Pending
                    </Button>
                    <Button 
                      variant={viewTask.status === "In Progress" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(viewTask.id, "In Progress")}
                    >
                      In Progress
                    </Button>
                    <Button 
                      variant={viewTask.status === "Completed" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(viewTask.id, "Completed")}
                    >
                      <CheckSquare className="h-4 w-4 mr-1" />
                      Completed
                    </Button>
                  </div>
                </div>
                
                {viewTask.comments && viewTask.comments.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Comments</Label>
                    <div className="mt-2 space-y-3">
                      {viewTask.comments.map((comment, index) => (
                        <div key={index} className="bg-muted p-3 rounded-md">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{comment.author}</span>
                            <span>{comment.date}</span>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="comment">Add Comment</Label>
                  <Textarea
                    id="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type your comment here..."
                    rows={2}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                    onClick={handleAddComment}
                  >
                    Add Comment
                  </Button>
                </div>
              </div>
              
              <DialogFooter>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleEditTask(viewTask.id)}
                  >
                    Edit Task
                  </Button>
                  <Button onClick={() => setShowViewDialog(false)}>
                    Close
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Task Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{newTask.id ? "Edit Task" : "Add New Task"}</DialogTitle>
            <DialogDescription>
              {newTask.id ? "Update task details" : "Create a new task for your project"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                placeholder="Task title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newTask.status} 
                  onValueChange={(value) => setNewTask({...newTask, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select 
                  value={newTask.priority} 
                  onValueChange={(value) => setNewTask({...newTask, priority: value})}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignee">Assignee</Label>
                <Input
                  id="assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                  placeholder="Assignee name"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Task description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTask}>
              {newTask.id ? "Update Task" : "Add Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TasksList;
