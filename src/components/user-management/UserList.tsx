
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Users } from "lucide-react";
import { User } from "./types";
import UserCard from "./UserCard";

interface UserListProps {
  filteredUsers: User[];
}

const UserList: React.FC<UserListProps> = ({ filteredUsers }) => {
  return (
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
          <UserCard key={user.id} user={user} />
        ))}
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No users found matching your filters.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserList;
