
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Template, TemplateCategory } from "./types";
import { TemplatesList } from "./TemplatesList";

interface TemplateTabsProps {
  templates: Template[];
  templateCategories: TemplateCategory[];
  onDownload: (template: Template) => void;
  onDelete: (template: Template) => void;
  onStatusChange: (template: Template, newStatus: 'draft' | 'published' | 'archived') => void;
}

export const TemplateTabs = ({
  templates,
  templateCategories,
  onDownload,
  onDelete,
  onStatusChange
}: TemplateTabsProps) => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">Alle Vorlagen</TabsTrigger>
        {templateCategories.map(category => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="all" className="space-y-4">
        <TemplatesList
          templates={templates}
          templateCategories={templateCategories}
          onDownload={onDownload}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      </TabsContent>
      
      {templateCategories.map(category => (
        <TabsContent key={category.id} value={category.id} className="space-y-4">
          <TemplatesList
            templates={templates}
            templateCategories={templateCategories}
            onDownload={onDownload}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            filterCategory={category.id}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
