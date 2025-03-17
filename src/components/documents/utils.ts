
import { FileCheck, FileText } from "lucide-react";
import { AuditEntry } from "./types";

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

export const createAuditEntry = (
  username: string, 
  action: AuditEntry["action"], 
  details: string,
  previousVersion?: string,
  newVersion?: string
): AuditEntry => {
  return {
    id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    username,
    action,
    details,
    previousVersion,
    newVersion
  };
};
