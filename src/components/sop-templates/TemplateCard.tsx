
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Template, TemplateCategory } from "./types";
import { 
  BookOpen, 
  CheckSquare, 
  ChevronDown, 
  Download, 
  FileCheck, 
  FileSpreadsheet, 
  FileText,
  Tag 
} from "lucide-react";

interface TemplateCardProps {
  template: Template;
  templateCategories: TemplateCategory[];
  onDownload: (template: Template) => void;
  onDelete: (template: Template) => void;
  onStatusChange: (template: Template, newStatus: 'draft' | 'published' | 'archived') => void;
}

// Helper function to get the icon based on the document type
const getTemplateIcon = (type: string) => {
  switch (type) {
    case "Documentation":
      return BookOpen;
    case "Procedure":
      return FileCheck;
    case "Form":
      return FileSpreadsheet;
    case "Checklist":
      return CheckSquare;
    default:
      return FileText;
  }
};

const getStatusBadgeVariant = (status?: string) => {
  switch (status) {
    case "published":
      return "success";
    case "draft":
      return "warning";
    case "archived":
      return "secondary";
    default:
      return "outline";
  }
};

export const TemplateCard = ({ 
  template, 
  templateCategories, 
  onDownload, 
  onDelete, 
  onStatusChange 
}: TemplateCardProps) => {
  const Icon = getTemplateIcon(template.type);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">
            {template.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {template.status && (
              <Badge variant={getStatusBadgeVariant(template.status) as any}>
                {template.status === 'published' ? 'Veröffentlicht' : 
                 template.status === 'draft' ? 'Entwurf' : 'Archiviert'}
              </Badge>
            )}
            <Badge variant="outline">
              {template.type === 'Documentation' ? 'Dokumentation' :
               template.type === 'Procedure' ? 'Verfahren' :
               template.type === 'Form' ? 'Formular' : 'Checkliste'}
            </Badge>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon className="mr-1.5 h-4 w-4" />
          <span>Aktualisiert: {template.updated}</span>
          <span className="mx-1.5">•</span>
          <span>{template.downloads} Downloads</span>
        </div>
        {template.tags && template.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {template.tags.map((tag, idx) => (
              <div key={idx} className="text-xs flex items-center bg-muted rounded-full px-2 py-0.5">
                <Tag className="h-3 w-3 mr-1 text-muted-foreground" />
                {tag}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t">
        <Badge variant="secondary">
          {templateCategories.find(cat => cat.id === template.category)?.name}
        </Badge>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDownload(template)}
          >
            <Download className="mr-1.5 h-4 w-4" />
            Download
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.info("Vorschaufunktion kommt bald")}>
                Vorschau
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Bearbeitungsfunktion kommt bald")}>
                Bearbeiten
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusChange(template, 'published')}>
                Veröffentlichen
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(template, 'draft')}>
                Als Entwurf speichern
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(template, 'archived')}>
                Archivieren
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => onDelete(template)}
              >
                Löschen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
};
