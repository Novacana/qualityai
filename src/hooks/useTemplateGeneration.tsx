
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Template } from "@/components/sop-templates/types";
import { generateSOPDocument, getOpenAIKey } from "@/utils/openai";

export function useTemplateGeneration() {
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  
  // Check for API key on mount
  useEffect(() => {
    setHasApiKey(!!getOpenAIKey());
  }, []);
  
  const checkOpenAIKey = (): boolean => {
    const key = getOpenAIKey();
    const hasKey = !!key;
    
    setHasApiKey(hasKey);
    
    if (!hasKey) {
      toast.error("Bitte konfigurieren Sie zuerst Ihren OpenAI API Key", {
        description: "Gehen Sie zu Einstellungen in der QMS Auswahl",
        action: {
          label: "Zu QMS Auswahl",
          onClick: () => {
            window.location.href = "/QMSSelection";
          }
        }
      });
      return false;
    }
    return true;
  };

  const generateDocument = async (template: Template) => {
    if (!checkOpenAIKey()) return null;
    
    setIsGenerating(true);
    try {
      const content = await generateSOPDocument(template);
      setGeneratedContent(content);
      toast.success("SOP-Dokument erfolgreich generiert");
      return content;
    } catch (error) {
      console.error("Error generating document:", error);
      toast.error("Fehler bei der Dokumentgenerierung", { 
        description: (error as Error).message 
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadDocument = (template: Template, content: string, onDownload?: (template: Template) => void) => {
    const blob = new Blob([content], { type: 'text/plain' });
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

  return {
    generatedContent,
    setGeneratedContent,
    isGenerating,
    generateDocument,
    downloadDocument,
    checkOpenAIKey,
    hasApiKey
  };
}
