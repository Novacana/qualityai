
import { FileCheck, FileText } from "lucide-react";

export const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Draft":
      return "secondary";
    case "In Review":
      return "warning";
    case "Approved":
      return "success";
    case "Obsolete":
      return "destructive";
    default:
      return "outline";
  }
};

export const getDocumentIcon = (type: string) => {
  switch (type) {
    case "SOP":
    case "Template":
      return FileText;
    case "Form":
    case "Record":
    case "Report":
      return FileCheck;
    default:
      return FileText;
  }
};
