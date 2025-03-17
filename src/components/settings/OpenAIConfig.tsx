
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getOpenAIKey, setOpenAIKey } from "@/utils/openai";

export function OpenAIConfig() {
  const [apiKey, setApiKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const key = getOpenAIKey();
    if (key) {
      setApiKey(key);
      setIsSaved(true);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      const success = setOpenAIKey(apiKey.trim());
      if (success) {
        toast.success("API Key gespeichert");
        setIsSaved(true);
      } else {
        toast.error("Fehler beim Speichern des API Keys");
      }
    } else {
      toast.error("Bitte geben Sie einen API Key ein");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>KI Konfiguration</CardTitle>
        <CardDescription>
          Konfigurieren Sie die OpenAI API für Dokumentengenerierung und KI-Assistenten
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="api-key" className="text-sm font-medium">
              OpenAI API Key
            </label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsSaved(false);
                }}
              />
              <Button onClick={handleSave} disabled={!apiKey.trim() || isSaved}>
                {isSaved ? "Gespeichert" : "Speichern"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Ihr API Key wird nur lokal in Ihrem Browser gespeichert und nicht an den Server gesendet.
              In einer Produktionsumgebung sollten API Keys sicher auf dem Server gespeichert werden.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
