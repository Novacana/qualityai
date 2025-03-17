
export interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  type: string;
  updated: string;
  downloads: number;
  status?: 'draft' | 'published' | 'archived';
  tags?: string[];
  content?: string;
  qmsStandard?: string;
  author?: string;
  createdAt?: string;
  version?: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
}

export interface NewTemplate {
  title: string;
  category: string;
  description: string;
  type: string;
  tags?: string[];
  qmsStandard?: string;
}

export interface GenerateDocumentOptions {
  template: Template;
  qmsStandard?: string;
  language?: string;
  format?: 'text' | 'markdown' | 'html';
}
