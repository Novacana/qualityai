
import { useState } from "react";
import { CreateTemplateDialog } from "@/components/sop-templates/CreateTemplateDialog";
import { TemplateFilters } from "@/components/sop-templates/TemplateFilters";
import { TemplateTabs } from "@/components/sop-templates/TemplateTabs";
import { UploadTemplateDialog } from "@/components/sop-templates/UploadTemplateDialog";
import { toast } from "sonner";
import { initialTemplates, templateCategories } from "@/components/sop-templates/data";
import { NewTemplate, Template } from "@/components/sop-templates/types";

const SOPTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);

  const filteredTemplates = templates.filter(template => {
    // Apply search filter
    const matchesSearch = 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply type filter
    const matchesType = filterType ? template.type === filterType : true;
    
    return matchesSearch && matchesType;
  });

  const handleCreateTemplate = (newTemplate: NewTemplate) => {
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
    toast.success("Neue Vorlage wurde erstellt und als Entwurf gespeichert");
  };

  const handleUploadTemplate = (newTemplate: NewTemplate, file: File) => {
    const newId = `${newTemplate.category}-${Date.now().toString().substring(8)}`;
    
    const uploadedTemplate: Template = {
      id: newId,
      title: newTemplate.title || file.name.replace(/\.[^/.]+$/, ""),
      category: newTemplate.category,
      description: newTemplate.description || "Hochgeladene Dokumentvorlage",
      type: newTemplate.type,
      updated: new Date().toISOString().split('T')[0],
      downloads: 0,
      status: 'draft',
      tags: []
    };

    setTemplates([uploadedTemplate, ...templates]);
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
        
        <CreateTemplateDialog 
          templateCategories={templateCategories}
          onCreateTemplate={handleCreateTemplate}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <TemplateFilters
          searchTerm={searchTerm}
          filterType={filterType}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterType}
        />
        
        <UploadTemplateDialog
          templateCategories={templateCategories}
          onUploadTemplate={handleUploadTemplate}
        />
      </div>
      
      <TemplateTabs 
        templates={filteredTemplates}
        templateCategories={templateCategories}
        onDownload={handleDownloadTemplate}
        onDelete={handleDeleteTemplate}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default SOPTemplates;

// Need to import Button for the delete confirmation dialog
import { Button } from "@/components/ui/button";
