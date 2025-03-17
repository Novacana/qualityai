
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Download, FileText, Eye, Trash, FileEdit, Pencil } from "lucide-react";
import { useState } from "react";
import { Template, TemplateCategory } from "./types";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { generateSOPDocument, getOpenAIKey } from "@/utils/openai";

// Fix the interface by removing the HTMLAttributes extension and defining all props explicitly
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
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { id, title, description, category, type, updated, downloads, status, tags } = template;
  
  const statusColorMap: Record<string, string> = {
    draft: "text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20",
    published: "text-green-500 bg-green-500/10 hover:bg-green-500/20",
    archived: "text-gray-500 bg-gray-500/10 hover:bg-gray-500/20",
  };

  const handleView = () => {
    setViewDialogOpen(true);
  };

  const handleGenerate = async () => {
    if (!getOpenAIKey()) {
      toast.error("Bitte konfigurieren Sie zuerst Ihren OpenAI API Key", {
        description: "Gehen Sie zu Einstellungen in der QMS Auswahl",
        action: {
          label: "Zu QMS Auswahl",
          onClick: () => {
            window.location.href = "/QMSSelection";
          }
        }
      });
      return;
    }
    
    setIsGenerating(true);
    try {
      const content = await generateSOPDocument(template);
      setGeneratedContent(content);
      setViewDialogOpen(true);
      toast.success("SOP-Dokument erfolgreich generiert");
    } catch (error) {
      console.error("Error generating document:", error);
      toast.error("Fehler bei der Dokumentgenerierung", { 
        description: (error as Error).message 
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedContent) {
      toast.error("Bitte generieren Sie zuerst das Dokument");
      return;
    }
    
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Dokument heruntergeladen");
    
    // Call the onDownload prop if provided
    if (onDownload) {
      onDownload(template);
    }
  };

  return (
    <>
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
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Kategorie</p>
              <p className="font-medium">{category}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Typ</p>
              <p className="font-medium">{type}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Aktualisiert</p>
              <p className="font-medium">{updated}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Downloads</p>
              <p className="font-medium">{downloads}</p>
            </div>
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 border-t bg-muted/20 flex justify-between">
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
        </CardFooter>
      </Card>

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {category} - {type}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-grow border rounded-md p-4 my-4">
            {generatedContent ? (
              <div className="whitespace-pre-wrap">
                {generatedContent}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <FileText className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Kein Inhalt generiert</h3>
                <p className="text-muted-foreground mt-2">
                  Klicken Sie auf "Generieren", um einen Inhalt für diese Vorlage zu erstellen.
                </p>
                <Button 
                  className="mt-4" 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Generiere...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generieren
                    </>
                  )}
                </Button>
              </div>
            )}
          </ScrollArea>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Schließen
            </Button>
            {generatedContent && (
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Herunterladen
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
