
import { useState, useEffect } from "react";
import { toast } from "sonner";
import UserFilters from "@/components/user-management/UserFilters";
import UserList from "@/components/user-management/UserList";
import { mockUsers } from "@/components/user-management/mock-data";
import { User } from "@/components/user-management/types";
import CreateUserDialog from "@/components/user-management/CreateUserDialog";
import EditUserSheet from "@/components/user-management/EditUserSheet";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showInactiveUsers, setShowInactiveUsers] = useState(false);
  
  // Use localStorage to persist users across page refreshes
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("qms-users");
    return savedUsers ? JSON.parse(savedUsers) : mockUsers;
  });
  
  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("qms-users", JSON.stringify(users));
  }, [users]);
  
  // Get unique roles and departments for filtering
  const roles = Array.from(new Set(users.map(user => user.role)));
  const departments = Array.from(new Set(users.map(user => user.department).filter(Boolean)));
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

  // State for user actions like viewing details, editing, or managing permissions
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userActionSheet, setUserActionSheet] = useState<"details" | "edit" | "permissions" | null>(null);

  const handleCreateUser = (newUserData: Omit<User, "id" | "lastLogin" | "avatar">) => {
    // In a real app, this would be an API call
    const newUser: User = {
      ...newUserData,
      id: `user-${Date.now()}`,
      lastLogin: "Never",
    };
    
    setUsers([newUser, ...users]);
    toast.success(`User ${newUser.name} created successfully`);
  };

  const handleUpdateUserStatus = (userId: string, newStatus: User["status"]) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    
    setUsers(updatedUsers);
    toast.success(`User status updated to ${newStatus}`);
  };
  
  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    if (!userToDelete) return;
    
    // Instead of hard deleting, mark as inactive
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: "Inactive" as const } : user
    );
    
    setUsers(updatedUsers);
    toast.success(`User ${userToDelete.name} has been deactivated`);
  };
  
  const handleViewUserDetails = (user: User) => {
    setSelectedUser(user);
    setUserActionSheet("details");
  };
  
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setUserActionSheet("edit");
  };
  
  const handleUpdateUser = (updatedUser: User) => {
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    
    setUsers(updatedUsers);
    setUserActionSheet(null);
    toast.success(`User ${updatedUser.name} updated successfully`);
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
        
        <CreateUserDialog 
          onCreateUser={handleCreateUser}
          roles={roles}
          departments={departments}
        />
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
        <UserList 
          filteredUsers={filteredUsers} 
          onDelete={handleDeleteUser}
          onStatusChange={handleUpdateUserStatus}
          onViewDetails={handleViewUserDetails}
          onEdit={handleEditUser}
        />
      </div>
      
      {/* User Details Sheet */}
      <Sheet open={userActionSheet === "details"} onOpenChange={() => setUserActionSheet(null)}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>User Details</SheetTitle>
            <SheetDescription>
              Detailed information about the selected user.
            </SheetDescription>
          </SheetHeader>
          
          {selectedUser && (
            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-muted p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedUser.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    selectedUser.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedUser.status}
                  </span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Email: {selectedUser.email}</p>
                  <p>Phone: {selectedUser.phone || "Not provided"}</p>
                  <p>Department: {selectedUser.department}</p>
                  <p>Role: {selectedUser.role}</p>
                  <p>Last Login: {selectedUser.lastLogin}</p>
                </div>
                
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setUserActionSheet("edit");
                    }}
                  >
                    Edit User
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-2">Recent Activity</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>No recent activity to display</span>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
      
      {/* Edit User Sheet - Using the new component */}
      <EditUserSheet
        open={userActionSheet === "edit"}
        onOpenChange={(open) => !open && setUserActionSheet(null)}
        user={selectedUser}
        onUserChange={setSelectedUser}
        onSave={handleUpdateUser}
        roles={roles}
        statuses={statuses}
      />
    </div>
  );
};

export default UserManagement;
