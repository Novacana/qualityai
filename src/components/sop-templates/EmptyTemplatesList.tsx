
import { FileWarning, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOpenAIKey } from "@/utils/openai";

interface EmptyTemplatesListProps {
  onCreateTemplate?: () => void;
}

export const EmptyTemplatesList = ({ onCreateTemplate }: EmptyTemplatesListProps) => {
  const hasApiKey = !!getOpenAIKey();

  return (
    <div className="py-12 text-center">
      <FileWarning className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">Keine Vorlagen gefunden</h3>
      <p className="text-muted-foreground mb-6">
        Keine Vorlagen entsprechen Ihren Suchkriterien. Passen Sie Ihre Suche an oder erstellen Sie neue Vorlagen.
      </p>

      {onCreateTemplate && (
        <div className="flex flex-col items-center space-y-4">
          <Button onClick={onCreateTemplate}>
            <FileText className="h-4 w-4 mr-2" />
            Neue Vorlage erstellen
          </Button>
          
          {!hasApiKey && (
            <div className="max-w-md p-4 border rounded-md bg-muted/30 text-sm">
              <p className="font-medium mb-1">KI-Funktionen aktivieren</p>
              <p className="text-muted-foreground mb-2">
                Konfigurieren Sie Ihren OpenAI API-Schlüssel in den Einstellungen, um automatisch SOP-Dokumente aus Vorlagen zu generieren.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="/QMSSelection">Zur Konfiguration</a>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
