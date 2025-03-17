
export interface User {
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
