
import { Template, TemplateCategory } from "./types";
import { TemplateCard } from "./TemplateCard";
import { EmptyTemplatesList } from "./EmptyTemplatesList";

interface TemplatesListProps {
  templates: Template[];
  templateCategories: TemplateCategory[];
  onDownload: (template: Template) => void;
  onDelete: (template: Template) => void;
  onStatusChange: (template: Template, newStatus: 'draft' | 'published' | 'archived') => void;
  filterCategory?: string;
}

export const TemplatesList = ({ 
  templates, 
  templateCategories, 
  onDownload, 
  onDelete, 
  onStatusChange,
  filterCategory
}: TemplatesListProps) => {
  // Apply category filter if provided
  const displayTemplates = filterCategory && filterCategory !== 'all' 
    ? templates.filter(template => template.category === filterCategory)
    : templates;

  if (displayTemplates.length === 0) {
    return <EmptyTemplatesList />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {displayTemplates.map(template => (
        <TemplateCard
          key={template.id}
          template={template}
          templateCategories={templateCategories}
          onDownload={onDownload}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};
