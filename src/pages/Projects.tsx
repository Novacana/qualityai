
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, ArrowUpDown, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProjectCard from "@/components/dashboard/ProjectCard";

interface Project {
  id: string;
  name: string;
  description: string;
  qmsType: string;
  status: "Active" | "Pending" | "Completed";
  updatedAt: string;
  createdBy: string;
  progress?: number;
  team?: {
    name: string;
    avatar?: string;
  }[];
}

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [qmsFilter, setQmsFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "updatedAt" | "status">("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Mock projects data
  const projects: Project[] = [
    {
      id: "P-001",
      name: "Nanomaterial Research Project",
      description: "Investigating novel nanomaterials for industrial applications",
      qmsType: "ISO 9001",
      status: "Active",
      updatedAt: "2023-08-15",
      createdBy: "Dr. Alex Johnson",
      progress: 65,
      team: [
        { name: "Alex Johnson", avatar: "/placeholder.svg" },
        { name: "Maria Garcia", avatar: "/placeholder.svg" },
        { name: "James Wilson", avatar: "/placeholder.svg" },
        { name: "Sarah Lee", avatar: "/placeholder.svg" }
      ]
    },
    {
      id: "P-002",
      name: "Medical Device Prototype",
      description: "Development of implantable medical device prototype",
      qmsType: "ISO 13485",
      status: "Active",
      updatedAt: "2023-09-02",
      createdBy: "Dr. Sarah Williams",
      progress: 42,
      team: [
        { name: "Sarah Williams", avatar: "/placeholder.svg" },
        { name: "Michael Brown", avatar: "/placeholder.svg" },
        { name: "Emily Chen", avatar: "/placeholder.svg" }
      ]
    },
    {
      id: "P-003",
      name: "Food Packaging Material Analysis",
      description: "Eco-friendly food packaging materials research",
      qmsType: "HACCP",
      status: "Active",
      updatedAt: "2023-07-30",
      createdBy: "Dr. Jennifer Lee",
      progress: 78,
      team: [
        { name: "Jennifer Lee", avatar: "/placeholder.svg" },
        { name: "Robert Kim", avatar: "/placeholder.svg" }
      ]
    },
    {
      id: "P-004",
      name: "Pharmaceutical Compound Development",
      description: "Novel drug delivery system research",
      qmsType: "cGMP",
      status: "Pending",
      updatedAt: "2023-08-25",
      createdBy: "Dr. James Taylor",
      progress: 23,
      team: [
        { name: "James Taylor", avatar: "/placeholder.svg" },
        { name: "Lisa Wang", avatar: "/placeholder.svg" },
        { name: "David Smith", avatar: "/placeholder.svg" }
      ]
    },
    {
      id: "P-005",
      name: "Biodegradable Polymer Research",
      description: "Investigation of biodegradable polymers for medical applications",
      qmsType: "ISO 13485",
      status: "Completed",
      updatedAt: "2023-06-10",
      createdBy: "Dr. Daniel Anderson",
      progress: 100,
      team: [
        { name: "Daniel Anderson", avatar: "/placeholder.svg" },
        { name: "Rachel Green", avatar: "/placeholder.svg" }
      ]
    },
    {
      id: "P-006",
      name: "Surface Coating Technology",
      description: "Development of advanced surface coatings for industrial use",
      qmsType: "ISO 9001",
      status: "Active",
      updatedAt: "2023-09-10",
      createdBy: "Dr. Robert Brown",
      progress: 51,
      team: [
        { name: "Robert Brown", avatar: "/placeholder.svg" },
        { name: "Sophia Martinez", avatar: "/placeholder.svg" },
        { name: "Thomas Young", avatar: "/placeholder.svg" },
        { name: "Amanda Park", avatar: "/placeholder.svg" }
      ]
    }
  ];
  
  // Get unique QMS types for filtering
  const qmsTypes = Array.from(new Set(projects.map(project => project.qmsType)));
  
  // Filter projects based on search term, status, and QMS type
  let filteredProjects = projects.filter(project => 
    (searchTerm === "" || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.qmsType.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === null || project.status === statusFilter) &&
    (qmsFilter === null || project.qmsType === qmsFilter)
  );
  
  // Sort projects
  filteredProjects = filteredProjects.sort((a, b) => {
    if (sortBy === "name") {
      return sortDirection === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortBy === "updatedAt") {
      return sortDirection === "asc" 
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime() 
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (sortBy === "status") {
      return sortDirection === "asc" 
        ? a.status.localeCompare(b.status) 
        : b.status.localeCompare(a.status);
    }
    return 0;
  });
  
  // Toggle sort direction and update sort field
  const handleSort = (field: "name" | "updatedAt" | "status") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };
  
  // Determine badge color based on status
  const getBadgeVariant = (status: string) => {
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

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your quality management system projects
          </p>
        </div>
        
        <Button onClick={() => toast.info("Create project functionality coming soon")}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          {/* QMS Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-1">
                <Filter className="h-4 w-4 mr-1" />
                <span>{qmsFilter || "QMS Type"}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by QMS Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setQmsFilter(null)}>
                All Types
              </DropdownMenuItem>
              {qmsTypes.map((type) => (
                <DropdownMenuItem key={type} onClick={() => setQmsFilter(type)}>
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-1">
                <Filter className="h-4 w-4 mr-1" />
                <span>{statusFilter || "Status"}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>
                Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Sort Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleSort("name")}>
                  Name {sortBy === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("updatedAt")}>
                  Last Updated {sortBy === "updatedAt" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("status")}>
                  Status {sortBy === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden card-hover">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge variant={getBadgeVariant(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">QMS Type:</span>
                  <span className="font-medium">{project.qmsType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created by:</span>
                  <span>{project.createdBy}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last updated:</span>
                  <span>{project.updatedAt}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t flex justify-between">
              <Button variant="outline" size="sm" onClick={() => toast.info("View project details functionality coming soon")}>
                View Details
              </Button>
              <Button variant="default" size="sm" onClick={() => toast.info("Manage project functionality coming soon")}>
                Manage
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found. Try a different search term or create a new project.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
