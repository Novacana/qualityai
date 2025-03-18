
import React from "react";
import { User } from "./types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface EditUserSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onUserChange: (user: User) => void;
  onSave: (user: User) => void;
  roles: string[];
  statuses: string[];
}

const EditUserSheet: React.FC<EditUserSheetProps> = ({
  open,
  onOpenChange,
  user,
  onUserChange,
  onSave,
  roles,
  statuses,
}) => {
  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription>
            Make changes to the user's information.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input 
                id="edit-name"
                value={user.name}
                onChange={(e) => onUserChange({...user, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input 
                id="edit-email"
                value={user.email}
                onChange={(e) => onUserChange({...user, email: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input 
                id="edit-phone"
                value={user.phone}
                onChange={(e) => onUserChange({...user, phone: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-department">Department</Label>
              <Input 
                id="edit-department"
                value={user.department}
                onChange={(e) => onUserChange({...user, department: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-role">Role</Label>
              <Select 
                value={user.role}
                onValueChange={(value) => onUserChange({...user, role: value as User["role"]})}
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
                value={user.status}
                onValueChange={(value) => onUserChange({...user, status: value as User["status"]})}
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
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={() => onSave(user)}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditUserSheet;
