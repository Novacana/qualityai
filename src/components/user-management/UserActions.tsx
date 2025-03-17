
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

interface UserActionsProps {
  userId: string;
  userName: string;
  status: string;
}

const UserActions: React.FC<UserActionsProps> = ({ userId, userName, status }) => {
  const handleEditUser = (userId: string) => {
    toast.info(`Bearbeite Benutzer ${userId}...`);
  };

  const handleResetPassword = (userId: string, userName: string) => {
    toast.info(`Passwort-Reset für ${userName} wird durchgeführt...`);
    setTimeout(() => {
      toast.success(`Passwort-Reset-Link wurde an ${userName} gesendet`);
    }, 1000);
  };

  const handleViewPermissions = (userId: string, userName: string) => {
    toast.info(`Berechtigungen für ${userName} werden angezeigt...`);
  };

  const handleViewAuditLog = (userId: string, userName: string) => {
    toast.info(`Audit-Log für ${userName} wird geladen...`);
  };

  const handleToggleUserStatus = (userId: string, userName: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    toast.info(`Status von ${userName} wird auf ${newStatus} geändert...`);
    setTimeout(() => {
      toast.success(`Status von ${userName} wurde auf ${newStatus} geändert`);
    }, 1000);
  };

  return (
    <div className="flex justify-end space-x-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleEditUser(userId)}
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
          <DropdownMenuItem onClick={() => handleResetPassword(userId, userName)}>
            Reset Password
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleViewPermissions(userId, userName)}>
            View Permissions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleViewAuditLog(userId, userName)}>
            View Audit Log
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-red-600"
            onClick={() => handleToggleUserStatus(userId, userName, status)}
          >
            {status === "Active" ? "Deactivate" : "Activate"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserActions;
