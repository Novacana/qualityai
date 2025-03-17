
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
}

export interface NewDocument {
  title: string;
  type: string;
  project: string;
  qmsType: string;
  description?: string;
  content?: string;
}
