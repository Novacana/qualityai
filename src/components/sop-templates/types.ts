
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
}
