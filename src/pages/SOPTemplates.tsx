
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Plus
} from "lucide-react";

const SOPTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const templateCategories = [
    { id: "iso9001", name: "ISO 9001" },
    { id: "iso13485", name: "ISO 13485" },
    { id: "iso14971", name: "ISO 14971" },
    { id: "iec62366", name: "IEC 62366" },
    { id: "cgmp", name: "cGMP" },
    { id: "haccp", name: "HACCP" }
  ];
  
  // Mock template data - in a real app this would be fetched from an API
  const templates = [
    // ISO 9001 Templates
    { 
      id: "iso9001-001", 
      title: "Quality Manual Template", 
      category: "iso9001", 
      description: "Comprehensive quality manual template for ISO 9001:2015 compliance", 
      type: "Documentation",
      updated: "2023-03-15",
      downloads: 156
    },
    { 
      id: "iso9001-002", 
      title: "Document Control Procedure", 
      category: "iso9001", 
      description: "Standard procedure for document control and management", 
      type: "Procedure",
      updated: "2023-04-22",
      downloads: 134
    },
    { 
      id: "iso9001-003", 
      title: "Internal Audit Checklist", 
      category: "iso9001", 
      description: "Comprehensive checklist for conducting internal quality audits", 
      type: "Form",
      updated: "2023-05-10",
      downloads: 98
    },
    
    // ISO 13485 Templates
    { 
      id: "iso13485-001", 
      title: "Medical Device Quality Manual", 
      category: "iso13485", 
      description: "Quality manual template for medical device manufacturers", 
      type: "Documentation",
      updated: "2023-02-28",
      downloads: 87
    },
    { 
      id: "iso13485-002", 
      title: "Design and Development Procedure", 
      category: "iso13485", 
      description: "Procedure for medical device design and development process", 
      type: "Procedure",
      updated: "2023-04-05",
      downloads: 76
    },
    
    // ISO 14971 Templates
    { 
      id: "iso14971-001", 
      title: "Risk Management Plan Template", 
      category: "iso14971", 
      description: "Plan template for medical device risk management", 
      type: "Documentation",
      updated: "2023-03-18",
      downloads: 112
    },
    { 
      id: "iso14971-002", 
      title: "Risk Assessment Matrix", 
      category: "iso14971", 
      description: "Matrix for evaluating and categorizing risks", 
      type: "Form",
      updated: "2023-02-14",
      downloads: 143
    },
    
    // cGMP Templates
    { 
      id: "cgmp-001", 
      title: "Batch Production Record", 
      category: "cgmp", 
      description: "Template for documenting batch production in GMP environment", 
      type: "Form",
      updated: "2023-01-30",
      downloads: 65
    },
    { 
      id: "cgmp-002", 
      title: "Cleaning Validation Protocol", 
      category: "cgmp", 
      description: "Protocol for validating cleaning procedures in GMP facilities", 
      type: "Procedure",
      updated: "2023-03-25",
      downloads: 52
    }
  ];
  
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
  
  const filteredTemplates = templates.filter(template => 
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SOP Templates</h1>
          <p className="text-muted-foreground">Standard operating procedure templates for quality management systems</p>
        </div>
        
        <Button>
          <FilePlus2 className="mr-2 h-4 w-4" />
          Create New Template
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Template
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Templates</TabsTrigger>
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
                      <Badge variant="outline">
                        {template.type}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon className="mr-1.5 h-4 w-4" />
                      <span>Updated: {template.updated}</span>
                      <span className="mx-1.5">•</span>
                      <span>{template.downloads} downloads</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between border-t">
                    <Badge variant="secondary">
                      {templateCategories.find(cat => cat.id === template.category)?.name}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="mr-1.5 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="py-12 text-center">
              <FileWarning className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Templates Found</h3>
              <p className="text-muted-foreground">
                No templates match your search criteria. Try adjusting your search.
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
                          <Badge variant="outline">
                            {template.type}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Icon className="mr-1.5 h-4 w-4" />
                          <span>Updated: {template.updated}</span>
                          <span className="mx-1.5">•</span>
                          <span>{template.downloads} downloads</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 flex justify-between border-t">
                        <Badge variant="secondary">
                          {category.name}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="mr-1.5 h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
            </div>
            
            {filteredTemplates.filter(template => template.category === category.id).length === 0 && (
              <div className="py-12 text-center">
                <FileWarning className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No Templates Found</h3>
                <p className="text-muted-foreground">
                  No templates match your search criteria. Try adjusting your search.
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
