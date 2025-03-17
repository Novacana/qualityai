
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Database, Link, Server, Lock, CheckCircle2, AlertTriangle } from "lucide-react";

const RSpaceIntegration = () => {
  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">RSpace Integration</h1>
          <p className="text-muted-foreground">Connect and manage your RSpace electronic lab notebook integration</p>
        </div>
        <Badge variant="outline" className="px-3 py-1 flex items-center gap-1.5">
          <Server className="h-3.5 w-3.5" />
          <span>API Status: Active</span>
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Connection Settings</CardTitle>
            <CardDescription>Configure your connection to RSpace laboratory documentation system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-url">RSpace API URL</Label>
              <div className="flex space-x-2">
                <Input 
                  id="api-url" 
                  value="https://rspace.leibniz-inm.de/api/v1" 
                  className="flex-1" 
                />
                <Button variant="outline">Test Connection</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex space-x-2">
                <Input 
                  id="api-key" 
                  type="password" 
                  value="••••••••••••••••••••••" 
                  className="flex-1" 
                />
                <Button variant="outline">Regenerate</Button>
              </div>
              <p className="text-xs text-muted-foreground">Your API key is encrypted and stored securely</p>
            </div>
            
            <div className="p-3 bg-muted rounded-md flex items-start space-x-3 mt-4">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Connection verified</p>
                <p className="text-sm text-muted-foreground">Last successful connection: Today at 09:23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
            <CardDescription>Current status of your RSpace integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" />
                  <span>Data Sync</span>
                </div>
                <Badge variant="outline" className="bg-green-50">Active</Badge>
              </div>
              
              <div className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4 text-primary" />
                  <span>Project Linking</span>
                </div>
                <Badge variant="outline" className="bg-green-50">Active</Badge>
              </div>
              
              <div className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>SSO Authentication</span>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">Pending</Badge>
              </div>
            </div>
            
            <div className="p-3 bg-amber-50 rounded-md flex items-start space-x-3 mt-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium text-amber-700">SSO Configuration Required</p>
                <p className="text-sm text-amber-600">Single Sign-On needs to be configured.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Document Synchronization</CardTitle>
          <CardDescription>Configure how documents are synchronized between systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure the synchronization settings to determine which documents and data are shared between the QMS platform and RSpace.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">QMS → RSpace</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Quality procedures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>SOP documents</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Training records</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">RSpace → QMS</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Experiment data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Lab notebooks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Research findings</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RSpaceIntegration;
