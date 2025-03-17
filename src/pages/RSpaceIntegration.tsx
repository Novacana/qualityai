import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Database, Link, Server, Lock, CheckCircle2, AlertTriangle, RefreshCcw, CheckSquare, X } from "lucide-react";
import { toast } from "sonner";

type SyncDirection = 'qmsToRSpace' | 'rSpaceToQMS';

const RSpaceIntegration = () => {
  const [apiUrl, setApiUrl] = useState("https://rspace.leibniz-inm.de/api/v1");
  const [apiKey, setApiKey] = useState("••••••••••••••••••••••");
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "testing">("connected");
  const [syncSettings, setSyncSettings] = useState({
    qmsToRSpace: {
      qualityProcedures: true,
      sopDocuments: true,
      trainingRecords: true
    },
    rSpaceToQMS: {
      experimentData: true,
      labNotebooks: true,
      researchFindings: true
    }
  });

  const handleTestConnection = () => {
    setConnectionStatus("testing");
    toast.info("Verbindung wird getestet...");
    
    // Simulate API call with timeout
    setTimeout(() => {
      setConnectionStatus("connected");
      toast.success("Verbindung zu RSpace erfolgreich hergestellt");
    }, 1500);
  };

  const handleRegenerateApiKey = () => {
    toast.info("Neuer API-Schlüssel wird generiert...");
    setTimeout(() => {
      setApiKey("••••••••••••••••••••••");
      toast.success("Neuer API-Schlüssel wurde generiert und gespeichert");
    }, 1000);
  };

  const handleSaveSettings = () => {
    toast.success("Integrationseinstellungen wurden gespeichert");
  };

  const toggleSyncSetting = (direction: SyncDirection, setting: string) => {
    setSyncSettings(prev => ({
      ...prev,
      [direction]: {
        ...prev[direction],
        [setting]: !prev[direction][setting as keyof typeof prev[direction]]
      }
    }));
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">RSpace Integration</h1>
          <p className="text-muted-foreground">Verbinden und verwalten Sie Ihre RSpace-Integration für elektronische Labornotizbücher</p>
        </div>
        <Badge variant={connectionStatus === "connected" ? "success" : connectionStatus === "testing" ? "warning" : "destructive"} className="px-3 py-1 flex items-center gap-1.5">
          <Server className="h-3.5 w-3.5" />
          <span>API Status: {connectionStatus === "connected" ? "Aktiv" : connectionStatus === "testing" ? "Wird getestet..." : "Inaktiv"}</span>
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Verbindungseinstellungen</CardTitle>
            <CardDescription>Konfigurieren Sie Ihre Verbindung zum RSpace-Labordokumentationssystem</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-url">RSpace API URL</Label>
              <div className="flex space-x-2">
                <Input 
                  id="api-url" 
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="flex-1" 
                />
                <Button variant="outline" onClick={handleTestConnection} disabled={connectionStatus === "testing"}>
                  {connectionStatus === "testing" ? <RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Verbindung testen
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-key">API Schlüssel</Label>
              <div className="flex space-x-2">
                <Input 
                  id="api-key" 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)} 
                  className="flex-1" 
                />
                <Button variant="outline" onClick={handleRegenerateApiKey}>Neu generieren</Button>
              </div>
              <p className="text-xs text-muted-foreground">Ihr API-Schlüssel wird verschlüsselt und sicher gespeichert</p>
            </div>
            
            <div className="p-3 bg-muted rounded-md flex items-start space-x-3 mt-4">
              {connectionStatus === "connected" ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Verbindung verifiziert</p>
                    <p className="text-sm text-muted-foreground">Letzte erfolgreiche Verbindung: Heute um 09:23</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Verbindung nicht hergestellt</p>
                    <p className="text-sm text-muted-foreground">Bitte überprüfen Sie Ihre API-Einstellungen</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Integrationsstatus</CardTitle>
            <CardDescription>Aktueller Status Ihrer RSpace-Integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" />
                  <span>Datensynchronisation</span>
                </div>
                <Badge variant={connectionStatus === "connected" ? "success" : "secondary"} className="bg-green-50">
                  {connectionStatus === "connected" ? "Aktiv" : "Inaktiv"}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4 text-primary" />
                  <span>Projektverknüpfung</span>
                </div>
                <Badge variant={connectionStatus === "connected" ? "success" : "secondary"} className="bg-green-50">
                  {connectionStatus === "connected" ? "Aktiv" : "Inaktiv"}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>SSO Authentifizierung</span>
                </div>
                <Badge variant="warning" className="bg-amber-50 text-amber-700">Ausstehend</Badge>
              </div>
            </div>
            
            <div className="p-3 bg-amber-50 rounded-md flex items-start space-x-3 mt-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium text-amber-700">SSO-Konfiguration erforderlich</p>
                <p className="text-sm text-amber-600">Single Sign-On muss konfiguriert werden.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Dokumentsynchronisation</CardTitle>
          <CardDescription>Konfigurieren Sie, wie Dokumente zwischen Systemen synchronisiert werden</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Konfigurieren Sie die Synchronisierungseinstellungen, um festzulegen, welche Dokumente und Daten zwischen der QMS-Plattform und RSpace geteilt werden.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">QMS → RSpace</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between gap-2">
                    <div className="flex items-center">
                      {syncSettings.qmsToRSpace.qualityProcedures ? 
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" /> : 
                        <X className="h-4 w-4 text-red-500 mr-2" />}
                      <span>Qualitätsprozeduren</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleSyncSetting('qmsToRSpace', 'qualityProcedures')}
                    >
                      {syncSettings.qmsToRSpace.qualityProcedures ? "Deaktivieren" : "Aktivieren"}
                    </Button>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <div className="flex items-center">
                      {syncSettings.qmsToRSpace.sopDocuments ? 
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" /> : 
                        <X className="h-4 w-4 text-red-500 mr-2" />}
                      <span>SOP-Dokumente</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleSyncSetting('qmsToRSpace', 'sopDocuments')}
                    >
                      {syncSettings.qmsToRSpace.sopDocuments ? "Deaktivieren" : "Aktivieren"}
                    </Button>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <div className="flex items-center">
                      {syncSettings.qmsToRSpace.trainingRecords ? 
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" /> : 
                        <X className="h-4 w-4 text-red-500 mr-2" />}
                      <span>Schulungsnachweise</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleSyncSetting('qmsToRSpace', 'trainingRecords')}
                    >
                      {syncSettings.qmsToRSpace.trainingRecords ? "Deaktivieren" : "Aktivieren"}
                    </Button>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">RSpace → QMS</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between gap-2">
                    <div className="flex items-center">
                      {syncSettings.rSpaceToQMS.experimentData ? 
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" /> : 
                        <X className="h-4 w-4 text-red-500 mr-2" />}
                      <span>Experimentdaten</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleSyncSetting('rSpaceToQMS', 'experimentData')}
                    >
                      {syncSettings.rSpaceToQMS.experimentData ? "Deaktivieren" : "Aktivieren"}
                    </Button>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <div className="flex items-center">
                      {syncSettings.rSpaceToQMS.labNotebooks ? 
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" /> : 
                        <X className="h-4 w-4 text-red-500 mr-2" />}
                      <span>Labornotizbücher</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleSyncSetting('rSpaceToQMS', 'labNotebooks')}
                    >
                      {syncSettings.rSpaceToQMS.labNotebooks ? "Deaktivieren" : "Aktivieren"}
                    </Button>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <div className="flex items-center">
                      {syncSettings.rSpaceToQMS.researchFindings ? 
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" /> : 
                        <X className="h-4 w-4 text-red-500 mr-2" />}
                      <span>Forschungsergebnisse</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleSyncSetting('rSpaceToQMS', 'researchFindings')}
                    >
                      {syncSettings.rSpaceToQMS.researchFindings ? "Deaktivieren" : "Aktivieren"}
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Abbrechen</Button>
              <Button onClick={handleSaveSettings}>Einstellungen speichern</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RSpaceIntegration;
