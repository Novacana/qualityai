
import { User } from "./types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, UserCheck, UserMinus, UserCog, Eye, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserListProps {
  filteredUsers: User[];
  onDelete: (userId: string) => void;
  onStatusChange: (userId: string, status: User["status"]) => void;
  onViewDetails: (user: User) => void;
  onEdit: (user: User) => void;
}

const UserList = ({ 
  filteredUsers, 
  onDelete, 
  onStatusChange,
  onViewDetails,
  onEdit
}: UserListProps) => {
  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No users found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredUsers.map((user) => (
        <Card key={user.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onViewDetails(user)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(user)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                {user.status !== "Active" && (
                  <DropdownMenuItem onClick={() => onStatusChange(user.id, "Active")}>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Set as Active
                  </DropdownMenuItem>
                )}
                {user.status !== "Pending" && (
                  <DropdownMenuItem onClick={() => onStatusChange(user.id, "Pending")}>
                    <UserCog className="h-4 w-4 mr-2" />
                    Set as Pending
                  </DropdownMenuItem>
                )}
                {user.status !== "Inactive" && (
                  <DropdownMenuItem onClick={() => onDelete(user.id)}>
                    <UserMinus className="h-4 w-4 mr-2" />
                    Deactivate User
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Role</p>
              <p>{user.role}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Department</p>
              <p>{user.department}</p>
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className={`px-2 py-1 rounded-full text-xs ${
              user.status === 'Active' ? 'bg-green-100 text-green-800' : 
              user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {user.status}
            </span>
            <span className="text-xs text-muted-foreground">
              Last login: {user.lastLogin}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
