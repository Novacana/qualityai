
import { Button } from "@/components/ui/button";
import { Template } from "./types";
import { Download, FileText, Eye, Trash, Pencil } from "lucide-react";
import { useState } from "react";
import { TemplatePreviewDialog } from "./TemplatePreviewDialog";
import { useTemplateGeneration } from "@/hooks/useTemplateGeneration";

interface TemplateActionsProps {
  template: Template;
  onDownload?: (template: Template) => void;
  onDelete?: (template: Template) => void;
  onEdit?: (template: Template) => void;
}

export function TemplateActions({ 
  template, 
  onDownload, 
  onDelete, 
  onEdit 
}: TemplateActionsProps) {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const { isGenerating, checkOpenAIKey } = useTemplateGeneration();
  
  const handleView = () => {
    setViewDialogOpen(true);
  };

  const handleGenerate = async () => {
    if (checkOpenAIKey()) {
      setViewDialogOpen(true);
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        <Button size="sm" variant="outline" onClick={handleView}>
          <Eye className="h-4 w-4 mr-1" />
          Ansicht
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 mr-1 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Generiere...
            </>
          ) : (
            <>
              <FileText className="h-4 w-4 mr-1" />
              Generieren
            </>
          )}
        </Button>
      </div>
      <div className="flex space-x-2">
        {onEdit && (
          <Button size="sm" variant="outline" onClick={() => onEdit(template)}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
        {onDelete && (
          <Button size="sm" variant="outline" className="text-destructive" onClick={() => onDelete(template)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <TemplatePreviewDialog
        template={template}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        onDownload={onDownload}
      />
    </>
  );
}
