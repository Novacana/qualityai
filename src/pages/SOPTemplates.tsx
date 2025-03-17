
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  ClipboardList, 
  FileCheck, 
  FilePlus2, 
  BookOpen,
  CheckSquare,
  FileWarning,
  FileSpreadsheet,
  Plus,
  Upload,
  X,
  Tag,
  ChevronDown
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  type: string;
  updated: string;
  downloads: number;
  status?: 'draft' | 'published' | 'archived';
  tags?: string[];
}

const SOPTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    category: '',
    description: '',
    type: ''
  });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  
  const templateCategories = [
    { id: "iso9001", name: "ISO 9001" },
    { id: "iso13485", name: "ISO 13485" },
    { id: "iso14971", name: "ISO 14971" },
    { id: "iec62366", name: "IEC 62366" },
    { id: "cgmp", name: "cGMP" },
    { id: "haccp", name: "HACCP" }
  ];
  
  // Mock template data - in a real app this would be fetched from an API
  const [templates, setTemplates] = useState<Template[]>([
    // ISO 9001 Templates
    { 
      id: "iso9001-001", 
      title: "Qualitätshandbuch Vorlage", 
      category: "iso9001", 
      description: "Umfassende Qualitätshandbuchvorlage für die Einhaltung der ISO 9001:2015", 
      type: "Documentation",
      updated: "2023-03-15",
      downloads: 156,
      status: 'published',
      tags: ['Dokumentation', 'Qualitätspolitik']
    },
    { 
      id: "iso9001-002", 
      title: "Verfahren zur Dokumentenlenkung", 
      category: "iso9001", 
      description: "Standardverfahren für die Dokumentenlenkung und -verwaltung", 
      type: "Procedure",
      updated: "2023-04-22",
      downloads: 134,
      status: 'published',
      tags: ['Dokumentenlenkung', 'Prozesse']
    },
    { 
      id: "iso9001-003", 
      title: "Checkliste für interne Audits", 
      category: "iso9001", 
      description: "Umfassende Checkliste für die Durchführung interner Qualitätsaudits", 
      type: "Form",
      updated: "2023-05-10",
      downloads: 98,
      status: 'published',
      tags: ['Audit', 'Konformität']
    },
    
    // ISO 13485 Templates
    { 
      id: "iso13485-001", 
      title: "Medizinprodukte-Qualitätshandbuch", 
      category: "iso13485", 
      description: "Qualitätshandbuchvorlage für Medizinproduktehersteller", 
      type: "Documentation",
      updated: "2023-02-28",
      downloads: 87,
      status: 'published',
      tags: ['Medizinprodukte', 'Regulatorisch']
    },
    { 
      id: "iso13485-002", 
      title: "Verfahren für Design und Entwicklung", 
      category: "iso13485", 
      description: "Verfahren für den Design- und Entwicklungsprozess von Medizinprodukten", 
      type: "Procedure",
      updated: "2023-04-05",
      downloads: 76,
      status: 'published',
      tags: ['Design', 'Entwicklung']
    },
    
    // ISO 14971 Templates
    { 
      id: "iso14971-001", 
      title: "Risikomanagementplan Vorlage", 
      category: "iso14971", 
      description: "Planvorlage für das Risikomanagement von Medizinprodukten", 
      type: "Documentation",
      updated: "2023-03-18",
      downloads: 112,
      status: 'draft',
      tags: ['Risiko', 'Management']
    },
    { 
      id: "iso14971-002", 
      title: "Risikobewertungsmatrix", 
      category: "iso14971", 
      description: "Matrix zur Bewertung und Kategorisierung von Risiken", 
      type: "Form",
      updated: "2023-02-14",
      downloads: 143,
      status: 'published',
      tags: ['Risikobewertung', 'Matrix']
    },
    
    // cGMP Templates
    { 
      id: "cgmp-001", 
      title: "Chargenherstellungsprotokoll", 
      category: "cgmp", 
      description: "Vorlage für die Dokumentation der Chargenherstellung in GMP-Umgebung", 
      type: "Form",
      updated: "2023-01-30",
      downloads: 65,
      status: 'published',
      tags: ['Herstellung', 'Protokoll']
    },
    { 
      id: "cgmp-002", 
      title: "Reinigungsvalidierungsprotokoll", 
      category: "cgmp", 
      description: "Protokoll zur Validierung von Reinigungsverfahren in GMP-Anlagen", 
      type: "Procedure",
      updated: "2023-03-25",
      downloads: 52,
      status: 'archived',
      tags: ['Reinigung', 'Validierung']
    }
  ]);
  
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
  
  const filteredTemplates = templates.filter(template => {
    // Apply search filter
    const matchesSearch = 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply type filter
    const matchesType = filterType ? template.type === filterType : true;
    
    return matchesSearch && matchesType;
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.title.trim() || !newTemplate.category || !newTemplate.type) {
      toast.error("Bitte füllen Sie alle erforderlichen Felder aus");
      return;
    }

    const newId = `${newTemplate.category}-${Date.now().toString().substring(8)}`;
    
    const createdTemplate: Template = {
      id: newId,
      title: newTemplate.title,
      category: newTemplate.category,
      description: newTemplate.description,
      type: newTemplate.type,
      updated: new Date().toISOString().split('T')[0],
      downloads: 0,
      status: 'draft',
      tags: []
    };

    setTemplates([createdTemplate, ...templates]);
    setNewTemplate({
      title: '',
      category: '',
      description: '',
      type: ''
    });
    setShowCreateDialog(false);
    toast.success("Neue Vorlage wurde erstellt und als Entwurf gespeichert");
  };

  const handleUploadTemplate = () => {
    if (!uploadFile || !newTemplate.category || !newTemplate.type) {
      toast.error("Bitte wählen Sie eine Datei aus und füllen Sie alle erforderlichen Felder aus");
      return;
    }

    const newId = `${newTemplate.category}-${Date.now().toString().substring(8)}`;
    
    const uploadedTemplate: Template = {
      id: newId,
      title: newTemplate.title || uploadFile.name.replace(/\.[^/.]+$/, ""),
      category: newTemplate.category,
      description: newTemplate.description || "Hochgeladene Dokumentvorlage",
      type: newTemplate.type,
      updated: new Date().toISOString().split('T')[0],
      downloads: 0,
      status: 'draft',
      tags: []
    };

    setTemplates([uploadedTemplate, ...templates]);
    setNewTemplate({
      title: '',
      category: '',
      description: '',
      type: ''
    });
    setUploadFile(null);
    setShowUploadDialog(false);
    toast.success("Vorlage wurde hochgeladen und als Entwurf gespeichert");
  };

  const handleDownloadTemplate = (template: Template) => {
    // In a real app, this would trigger a download
    toast.success(`${template.title} wird heruntergeladen...`);
    
    // Update download count
    setTemplates(
      templates.map(t => 
        t.id === template.id 
          ? { ...t, downloads: t.downloads + 1 } 
          : t
      )
    );
  };

  const handleDeleteTemplate = (template: Template) => {
    toast.info(
      <div className="flex flex-col gap-2">
        <p>Möchten Sie "{template.title}" wirklich löschen?</p>
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => toast.dismiss()}
          >
            Abbrechen
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => {
              setTemplates(templates.filter(t => t.id !== template.id));
              toast.success("Vorlage wurde gelöscht");
            }}
          >
            Löschen
          </Button>
        </div>
      </div>,
      {
        duration: 5000,
      }
    );
  };

  const handleStatusChange = (template: Template, newStatus: 'draft' | 'published' | 'archived') => {
    setTemplates(
      templates.map(t => 
        t.id === template.id 
          ? { ...t, status: newStatus } 
          : t
      )
    );
    
    const statusMessages = {
      draft: "als Entwurf gespeichert",
      published: "veröffentlicht",
      archived: "archiviert"
    };
    
    toast.success(`Vorlage wurde ${statusMessages[newStatus]}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SOP Vorlagen</h1>
          <p className="text-muted-foreground">Standardbetriebsanweisungen (SOP) Vorlagen für Qualitätsmanagementsysteme</p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <FilePlus2 className="mr-2 h-4 w-4" />
              Neue Vorlage erstellen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Neue SOP-Vorlage erstellen</DialogTitle>
              <DialogDescription>
                Erstellen Sie eine neue Vorlage für Ihr Qualitätsmanagementsystem
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titel</Label>
                <Input
                  id="title"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                  placeholder="Titel der Vorlage"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Kategorie</Label>
                  <Select 
                    value={newTemplate.category} 
                    onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Kategorie auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {templateCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Dokumenttyp</Label>
                  <Select 
                    value={newTemplate.type} 
                    onValueChange={(value) => setNewTemplate({...newTemplate, type: value})}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Typ auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Documentation">Dokumentation</SelectItem>
                      <SelectItem value="Procedure">Verfahren</SelectItem>
                      <SelectItem value="Form">Formular</SelectItem>
                      <SelectItem value="Checklist">Checkliste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                  placeholder="Beschreibung der Vorlage"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleCreateTemplate}>
                Vorlage erstellen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Vorlagen durchsuchen..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {filterType ? `Typ: ${filterType}` : "Filter"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Nach Typ filtern</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterType(null)}>
              Alle Typen
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("Documentation")}>
              Dokumentation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("Procedure")}>
              Verfahren
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("Form")}>
              Formular
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("Checklist")}>
              Checkliste
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Vorlage hochladen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Vorlage hochladen</DialogTitle>
              <DialogDescription>
                Laden Sie eine bestehende Dokumentvorlage hoch
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Datei auswählen</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  {uploadFile ? (
                    <div className="space-y-2 w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate max-w-[250px]">
                          {uploadFile.name}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setUploadFile(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {(uploadFile.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Ziehen Sie eine Datei hierher oder klicken Sie
                      </p>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setUploadFile(e.target.files[0]);
                            // Pre-fill title with filename (without extension)
                            const fileName = e.target.files[0].name.replace(/\.[^/.]+$/, "");
                            setNewTemplate({
                              ...newTemplate,
                              title: fileName
                            });
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        Datei auswählen
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="upload-title">Titel (optional)</Label>
                <Input
                  id="upload-title"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                  placeholder="Titel der Vorlage (oder Dateiname wird verwendet)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="upload-category">Kategorie</Label>
                  <Select 
                    value={newTemplate.category} 
                    onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}
                  >
                    <SelectTrigger id="upload-category">
                      <SelectValue placeholder="Kategorie auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {templateCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="upload-type">Dokumenttyp</Label>
                  <Select 
                    value={newTemplate.type} 
                    onValueChange={(value) => setNewTemplate({...newTemplate, type: value})}
                  >
                    <SelectTrigger id="upload-type">
                      <SelectValue placeholder="Typ auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Documentation">Dokumentation</SelectItem>
                      <SelectItem value="Procedure">Verfahren</SelectItem>
                      <SelectItem value="Form">Formular</SelectItem>
                      <SelectItem value="Checklist">Checkliste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="upload-description">Beschreibung (optional)</Label>
                <Textarea
                  id="upload-description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                  placeholder="Beschreibung der Vorlage"
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleUploadTemplate}>
                Hochladen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Alle Vorlagen</TabsTrigger>
          {templateCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map(template => {
              const Icon = getTemplateIcon(template.type);
              return (
                <Card key={template.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">
                        {template.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {template.status && (
                          <Badge variant={getStatusBadgeVariant(template.status)}>
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
                        onClick={() => handleDownloadTemplate(template)}
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
                          <DropdownMenuItem onClick={() => handleStatusChange(template, 'published')}>
                            Veröffentlichen
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(template, 'draft')}>
                            Als Entwurf speichern
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(template, 'archived')}>
                            Archivieren
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteTemplate(template)}
                          >
                            Löschen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="py-12 text-center">
              <FileWarning className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Keine Vorlagen gefunden</h3>
              <p className="text-muted-foreground">
                Keine Vorlagen entsprechen Ihren Suchkriterien. Passen Sie Ihre Suche an.
              </p>
            </div>
          )}
        </TabsContent>
        
        {templateCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates
                .filter(template => template.category === category.id)
                .map(template => {
                  const Icon = getTemplateIcon(template.type);
                  return (
                    <Card key={template.id} className="overflow-hidden transition-all hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-medium">
                            {template.title}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            {template.status && (
                              <Badge variant={getStatusBadgeVariant(template.status)}>
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
                          {category.name}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownloadTemplate(template)}
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
                              <DropdownMenuItem onClick={() => handleStatusChange(template, 'published')}>
                                Veröffentlichen
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(template, 'draft')}>
                                Als Entwurf speichern
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(template, 'archived')}>
                                Archivieren
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteTemplate(template)}
                              >
                                Löschen
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
            </div>
            
            {filteredTemplates.filter(template => template.category === category.id).length === 0 && (
              <div className="py-12 text-center">
                <FileWarning className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Keine Vorlagen gefunden</h3>
                <p className="text-muted-foreground">
                  Keine Vorlagen entsprechen Ihren Suchkriterien. Passen Sie Ihre Suche an.
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SOPTemplates;
