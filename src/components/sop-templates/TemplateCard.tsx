
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Template, TemplateCategory } from "./types";
import { TemplateMetadata } from "./TemplateMetadata";
import { TemplateActions } from "./TemplateActions";

interface TemplateCardProps {
  template: Template;
  templateCategories?: TemplateCategory[];
  onDownload?: (template: Template) => void;
  onDelete?: (template: Template) => void;
  onStatusChange?: (template: Template, newStatus: 'draft' | 'published' | 'archived') => void;
  onEdit?: (template: Template) => void;
  className?: string;
}

export function TemplateCard({ 
  template, 
  templateCategories, 
  onDownload, 
  onDelete, 
  onStatusChange,
  onEdit, 
  className 
}: TemplateCardProps) {
  const { title, description, status } = template;
  
  const statusColorMap: Record<string, string> = {
    draft: "text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20",
    published: "text-green-500 bg-green-500/10 hover:bg-green-500/20",
    archived: "text-gray-500 bg-gray-500/10 hover:bg-gray-500/20",
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:border-primary/50", className)}>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg text-left">{title}</CardTitle>
          {status && (
            <Badge variant="outline" className={statusColorMap[status]}>
              {status === "draft" && "Entwurf"}
              {status === "published" && "Veröffentlicht"}
              {status === "archived" && "Archiviert"}
            </Badge>
          )}
        </div>
        <CardDescription className="text-left">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 grid gap-2">
        <TemplateMetadata template={template} />
      </CardContent>
      <CardFooter className="p-4 border-t bg-muted/20 flex justify-between">
        <TemplateActions 
          template={template}
          onDownload={onDownload}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </CardFooter>
    </Card>
  );
}
