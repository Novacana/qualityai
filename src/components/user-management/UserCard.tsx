
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "./types";
import { getBadgeVariant, getRoleBadgeVariant, getInitials } from "./utils";
import UserActions from "./UserActions";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-12 gap-4 py-3 border-b last:border-0 items-center">
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
      <div className="col-span-4 sm:col-span-2">
        <UserActions 
          userId={user.id} 
          userName={user.name}
          status={user.status}
        />
      </div>
    </div>
  );
};

export default UserCard;
