
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Template } from "./types";
import { useEffect } from "react";
import { useTemplateGeneration } from "@/hooks/useTemplateGeneration";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const { 
    generatedContent, 
    setGeneratedContent, 
    isGenerating, 
    generateDocument, 
    downloadDocument,
    hasApiKey 
  } = useTemplateGeneration();
  
  // Clear generated content when dialog is closed
  useEffect(() => {
    if (!open) {
      setGeneratedContent(null);
    }
  }, [open, setGeneratedContent]);
  
  const handleGenerate = async () => {
    console.log('Generate button clicked, hasApiKey:', hasApiKey);
    await generateDocument(template);
  };

  const handleDownload = () => {
    if (!generatedContent) {
      return;
    }
    
    downloadDocument(template, generatedContent, onDownload);
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
              {!hasApiKey ? (
                <Alert className="max-w-md">
                  <AlertTitle>OpenAI API Key fehlt</AlertTitle>
                  <AlertDescription>
                    Bitte konfigurieren Sie Ihren OpenAI API Key in den Einstellungen, um Dokumente zu generieren.
                    <div className="mt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href="/QMSSelection">Zu Einstellungen</a>
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <>
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
                </>
              )}
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
