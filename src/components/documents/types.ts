
export interface Document {
  id: string;
  title: string;
  type: "SOP" | "Template" | "Form" | "Record" | "Report";
  status: "Draft" | "In Review" | "Approved" | "Obsolete";
  project: string;
  qmsType: string;
  updatedAt: string;
  author: string;
  version: string;
  content?: string;
  description?: string;
  auditTrail?: AuditEntry[];
}

export interface NewDocument {
  title: string;
  type: string;
  project: string;
  qmsType: string;
  description?: string;
  content?: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  username: string;
  action: "Created" | "Modified" | "Reviewed" | "Approved" | "Status Change" | "Obsoleted";
  details: string;
  previousVersion?: string;
  newVersion?: string;
}
