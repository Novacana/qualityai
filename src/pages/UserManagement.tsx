
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, ChevronDown, Users, Mail, Phone, Shield, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Admin" | "QMS Manager" | "Project Lead" | "Researcher" | "Viewer";
  status: "Active" | "Inactive" | "Pending";
  department: string;
  lastLogin: string;
  avatar?: string;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showInactiveUsers, setShowInactiveUsers] = useState(false);
  
  // Mock users data
  const users: User[] = [
    {
      id: "U-001",
      name: "Dr. Alexandra Johnson",
      email: "a.johnson@leibniz-inm.de",
      phone: "+49 123 456789",
      role: "Admin",
      status: "Active",
      department: "Nanomaterials Research",
      lastLogin: "Today, 09:45",
      avatar: "/placeholder.svg"
    },
    {
      id: "U-002",
      name: "Dr. Michael Schmidt",
      email: "m.schmidt@leibniz-inm.de",
      phone: "+49 123 456790",
      role: "QMS Manager",
      status: "Active",
      department: "Quality Assurance",
      lastLogin: "Today, 08:30",
      avatar: "/placeholder.svg"
    },
    {
      id: "U-003",
      name: "Dr. Sarah Wagner",
      email: "s.wagner@leibniz-inm.de",
      phone: "+49 123 456791",
      role: "Project Lead",
      status: "Active",
      department: "Medical Devices",
      lastLogin: "Yesterday, 17:15",
      avatar: "/placeholder.svg"
    },
    {
      id: "U-004",
      name: "Dr. Thomas Müller",
      email: "t.mueller@leibniz-inm.de",
      phone: "+49 123 456792",
      role: "Researcher",
      status: "Active",
      department: "Biomaterials",
      lastLogin: "Today, 10:22",
      avatar: "/placeholder.svg"
    },
    {
      id: "U-005",
      name: "Dr. Anna Becker",
      email: "a.becker@leibniz-inm.de",
      phone: "+49 123 456793",
      role: "Researcher",
      status: "Active",
      department: "Polymer Science",
      lastLogin: "2 days ago",
      avatar: "/placeholder.svg"
    },
    {
      id: "U-006",
      name: "Dr. David Klein",
      email: "d.klein@leibniz-inm.de",
      phone: "+49 123 456794",
      role: "Project Lead",
      status: "Active",
      department: "Surface Engineering",
      lastLogin: "Yesterday, 14:05",
      avatar: "/placeholder.svg"
    },
    {
      id: "U-007",
      name: "Dr. Julia Fischer",
      email: "j.fischer@leibniz-inm.de",
      phone: "+49 123 456795",
      role: "Viewer",
      status: "Inactive",
      department: "External Collaborator",
      lastLogin: "3 weeks ago",
      avatar: "/placeholder.svg"
    },
    {
      id: "U-008",
      name: "Dr. Robert Schneider",
      email: "r.schneider@leibniz-inm.de",
      phone: "+49 123 456796",
      role: "Researcher",
      status: "Pending",
      department: "New Materials",
      lastLogin: "Never",
      avatar: "/placeholder.svg"
    }
  ];
  
  // Get unique roles and departments for filtering
  const roles = Array.from(new Set(users.map(user => user.role)));
  const statuses = Array.from(new Set(users.map(user => user.status)));
  
  // Filter users based on search term, role, status, and inactive toggle
  const filteredUsers = users.filter(user => 
    (searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (roleFilter === null || user.role === roleFilter) &&
    (statusFilter === null || user.status === statusFilter) &&
    (showInactiveUsers || user.status !== "Inactive")
  );
  
  // Determine badge color based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      default:
        return "outline";
    }
  };

  // Determine badge color based on role
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Admin":
        return "destructive";
      case "QMS Manager":
        return "default";
      case "Project Lead":
        return "info";
      case "Researcher":
        return "outline";
      case "Viewer":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        
        <Button onClick={() => toast.info("Add user functionality coming soon")}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          {/* Role Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-1">
                <Filter className="h-4 w-4 mr-1" />
                <span>{roleFilter || "Role"}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRoleFilter(null)}>
                All Roles
              </DropdownMenuItem>
              {roles.map((role) => (
                <DropdownMenuItem key={role} onClick={() => setRoleFilter(role)}>
                  {role}
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
              {statuses.map((status) => (
                <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="show-inactive" 
          checked={showInactiveUsers}
          onCheckedChange={setShowInactiveUsers}
        />
        <Label htmlFor="show-inactive">Show inactive users</Label>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4 sm:col-span-3">User</div>
                <div className="col-span-4 sm:col-span-3 hidden sm:block">Department</div>
                <div className="col-span-2 hidden md:block">Role</div>
                <div className="col-span-2 hidden lg:block">Status</div>
                <div className="col-span-4 sm:col-span-2 text-right">Actions</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 space-y-2">
            {filteredUsers.map((user) => (
              <div 
                key={user.id}
                className="grid grid-cols-12 gap-4 py-3 border-b last:border-0 items-center"
              >
                <div className="col-span-4 sm:col-span-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-3 hidden sm:block text-sm">
                  <div>{user.department}</div>
                  <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                    <Phone className="h-3 w-3 mr-1" />
                    {user.phone}
                  </div>
                </div>
                <div className="col-span-2 hidden md:block">
                  <Badge variant={getRoleBadgeVariant(user.role) as any} className="justify-center">
                    <Shield className="h-3 w-3 mr-1" />
                    {user.role}
                  </Badge>
                </div>
                <div className="col-span-2 hidden lg:block">
                  <Badge variant={getBadgeVariant(user.status) as any}>
                    {user.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {user.lastLogin}
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-2 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.info("Edit user functionality coming soon")}
                  >
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px]">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => toast.info("Reset password functionality coming soon")}>
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("View permissions functionality coming soon")}>
                        View Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("View audit log functionality coming soon")}>
                        View Audit Log
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => toast.info("Deactivate user functionality coming soon")}
                      >
                        {user.status === "Active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No users found matching your filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
