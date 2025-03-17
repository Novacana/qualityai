
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import UserFilters from "@/components/user-management/UserFilters";
import UserList from "@/components/user-management/UserList";
import { mockUsers } from "@/components/user-management/mock-data";
import { User } from "@/components/user-management/types";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showInactiveUsers, setShowInactiveUsers] = useState(false);
  
  // Get unique roles and departments for filtering
  const roles = Array.from(new Set(mockUsers.map(user => user.role)));
  const statuses = Array.from(new Set(mockUsers.map(user => user.status)));
  
  // Filter users based on search term, role, status, and inactive toggle
  const filteredUsers = mockUsers.filter(user => 
    (searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (roleFilter === null || user.role === roleFilter) &&
    (statusFilter === null || user.status === statusFilter) &&
    (showInactiveUsers || user.status !== "Inactive")
  );

  const handleAddUser = () => {
    toast.info("Neuer Benutzer wird angelegt...");
    setTimeout(() => {
      toast.success("Benutzer wurde erfolgreich angelegt");
    }, 1500);
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
        
        <Button onClick={handleAddUser}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      
      <UserFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        showInactiveUsers={showInactiveUsers}
        setShowInactiveUsers={setShowInactiveUsers}
        roles={roles}
        statuses={statuses}
      />
      
      <div className="space-y-4">
        <UserList filteredUsers={filteredUsers} />
      </div>
    </div>
  );
};

export default UserManagement;
