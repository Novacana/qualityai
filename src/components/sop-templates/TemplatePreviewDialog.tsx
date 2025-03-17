
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Template } from "./types";
import { useState } from "react";
import { toast } from "sonner";
import { generateSOPDocument, getOpenAIKey } from "@/utils/openai";

interface TemplatePreviewDialogProps {
  template: Template;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload?: (template: Template) => void;
}

export function TemplatePreviewDialog({ 
  template, 
  open, 
  onOpenChange, 
  onDownload 
}: TemplatePreviewDialogProps) {
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
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
    a.download = `${template.title.replace(/\s+/g, '_')}.txt`;
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{template.title}</DialogTitle>
          <DialogDescription>
            {template.category} - {template.type}
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
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
  );
}
