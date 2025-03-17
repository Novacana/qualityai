
import { User } from "./types";

export const mockUsers: User[] = [
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
