
import { useState, useEffect } from "react";
import { toast } from "sonner";
import UserFilters from "@/components/user-management/UserFilters";
import UserList from "@/components/user-management/UserList";
import { mockUsers } from "@/components/user-management/mock-data";
import { User } from "@/components/user-management/types";
import CreateUserDialog from "@/components/user-management/CreateUserDialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

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
      user.id === userId ? { ...user, status: "Inactive" } : user
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
      
      {/* Edit User Sheet - In a real implementation, this would be a form component */}
      <Sheet open={userActionSheet === "edit"} onOpenChange={() => setUserActionSheet(null)}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit User</SheetTitle>
            <SheetDescription>
              Make changes to the user's information.
            </SheetDescription>
          </SheetHeader>
          
          {selectedUser && (
            <div className="mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Name</Label>
                  <Input 
                    id="edit-name"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input 
                    id="edit-email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input 
                    id="edit-phone"
                    value={selectedUser.phone}
                    onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-department">Department</Label>
                  <Input 
                    id="edit-department"
                    value={selectedUser.department}
                    onChange={(e) => setSelectedUser({...selectedUser, department: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-role">Role</Label>
                  <Select 
                    value={selectedUser.role}
                    onValueChange={(value) => setSelectedUser({...selectedUser, role: value as User["role"]})}
                  >
                    <SelectTrigger id="edit-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={selectedUser.status}
                    onValueChange={(value) => setSelectedUser({...selectedUser, status: value as User["status"]})}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setUserActionSheet(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleUpdateUser(selectedUser)}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default UserManagement;
