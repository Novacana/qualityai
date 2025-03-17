
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, ArrowUpDown, ChevronDown, Calendar, User, FileText, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Document {
  id: string;
  title: string;
  type: "SOP" | "Template" | "Form" | "Record" | "Report";
  status: "Draft" | "In Review" | "Approved" | "Obsolete";
  project: string;
  qmsType: string;
  updatedAt: string;
  author: string;
  version: string;
}

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"title" | "updatedAt" | "status">("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showCreateDocumentDialog, setShowCreateDocumentDialog] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    type: 'SOP',
    project: '',
    qmsType: 'ISO 9001',
    description: ''
  });
  
  // Mock documents data
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "DOC-001",
      title: "Quality Management System Manual",
      type: "SOP",
      status: "Approved",
      project: "Nanomaterial Research",
      qmsType: "ISO 9001",
      updatedAt: "2023-09-15",
      author: "Dr. Alex Johnson",
      version: "1.2"
    },
    {
      id: "DOC-002",
      title: "Risk Management Report",
      type: "Report",
      status: "In Review",
      project: "Medical Device Prototype",
      qmsType: "ISO 13485",
      updatedAt: "2023-09-20",
      author: "Dr. Sarah Williams",
      version: "0.9"
    },
    {
      id: "DOC-003",
      title: "HACCP Plan Template",
      type: "Template",
      status: "Approved",
      project: "Food Packaging Material",
      qmsType: "HACCP",
      updatedAt: "2023-08-05",
      author: "Dr. Jennifer Lee",
      version: "2.1"
    },
    {
      id: "DOC-004",
      title: "Material Safety Data Sheet",
      type: "Form",
      status: "Draft",
      project: "Pharmaceutical Compound",
      qmsType: "cGMP",
      updatedAt: "2023-09-18",
      author: "Dr. James Taylor",
      version: "0.3"
    },
    {
      id: "DOC-005",
      title: "Usability Testing Protocol",
      type: "SOP",
      status: "Approved",
      project: "Medical Device Prototype",
      qmsType: "IEC 62366",
      updatedAt: "2023-07-10",
      author: "Dr. Emily Chen",
      version: "1.0"
    },
    {
      id: "DOC-006",
      title: "Equipment Calibration Form",
      type: "Form",
      status: "Approved",
      project: "Nanomaterial Research",
      qmsType: "ISO 9001",
      updatedAt: "2023-08-30",
      author: "Dr. Michael Brown",
      version: "1.1"
    }
  ]);
  
  // Get unique document types and statuses for filtering
  const documentTypes = Array.from(new Set(documents.map(doc => doc.type)));
  const documentStatuses = Array.from(new Set(documents.map(doc => doc.status)));
  const projectNames = Array.from(new Set(documents.map(doc => doc.project)));
  const qmsTypes = Array.from(new Set(documents.map(doc => doc.qmsType)));
  
  // Filter documents based on search term, type, and status
  let filteredDocuments = documents.filter(doc => 
    (searchTerm === "" || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.qmsType.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === null || doc.type === typeFilter) &&
    (statusFilter === null || doc.status === statusFilter)
  );
  
  // Sort documents
  filteredDocuments = filteredDocuments.sort((a, b) => {
    if (sortBy === "title") {
      return sortDirection === "asc" 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title);
    } else if (sortBy === "updatedAt") {
      return sortDirection === "asc" 
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime() 
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (sortBy === "status") {
      return sortDirection === "asc" 
        ? a.status.localeCompare(b.status) 
        : b.status.localeCompare(a.status);
    }
    return 0;
  });
  
  // Toggle sort direction and update sort field
  const handleSort = (field: "title" | "updatedAt" | "status") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };
  
  // Determine badge color based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Draft":
        return "secondary";
      case "In Review":
        return "warning";
      case "Approved":
        return "success";
      case "Obsolete":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Determine icon based on document type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "SOP":
      case "Template":
        return FileText;
      case "Form":
      case "Record":
      case "Report":
        return FileCheck;
      default:
        return FileText;
    }
  };

  // Create a new document
  const handleCreateDocument = () => {
    if (!newDocument.title || !newDocument.type || !newDocument.project) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }

    const newDoc: Document = {
      id: `DOC-${String(documents.length + 1).padStart(3, '0')}`,
      title: newDocument.title,
      type: newDocument.type as any,
      status: "Draft",
      project: newDocument.project,
      qmsType: newDocument.qmsType,
      updatedAt: new Date().toISOString().split('T')[0],
      author: "Current User",
      version: "0.1"
    };

    setDocuments([newDoc, ...documents]);
    setShowCreateDocumentDialog(false);
    setNewDocument({
      title: '',
      type: 'SOP',
      project: '',
      qmsType: 'ISO 9001',
      description: ''
    });
    toast.success("Dokument wurde erstellt");
  };

  // View document details
  const handleViewDocument = (doc: Document) => {
    toast.info(`Dokument wird angezeigt: ${doc.title}`);
  };

  // Edit document
  const handleEditDocument = (doc: Document) => {
    toast.info(`Dokument wird bearbeitet: ${doc.title}`);
  };

  // Delete document
  const handleDeleteDocument = (doc: Document) => {
    toast.info(
      <div className="flex flex-col gap-2">
        <p>Möchten Sie "{doc.title}" wirklich löschen?</p>
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
              setDocuments(documents.filter(d => d.id !== doc.id));
              toast.success("Dokument wurde gelöscht");
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

  // Change document status
  const handleChangeStatus = (doc: Document, newStatus: "Draft" | "In Review" | "Approved" | "Obsolete") => {
    setDocuments(
      documents.map(d => 
        d.id === doc.id 
          ? { ...d, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } 
          : d
      )
    );
    
    const statusMessages = {
      Draft: "als Entwurf gespeichert",
      "In Review": "in Überprüfung gesetzt",
      Approved: "genehmigt",
      Obsolete: "als veraltet markiert"
    };
    
    toast.success(`Dokument wurde ${statusMessages[newStatus]}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Manage your quality management system documentation
          </p>
        </div>
        
        <Dialog open={showCreateDocumentDialog} onOpenChange={setShowCreateDocumentDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create new document</DialogTitle>
              <DialogDescription>
                Add a new document to your quality management system
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newDocument.title}
                  onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                  placeholder="Document title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Document type</Label>
                  <Select 
                    value={newDocument.type} 
                    onValueChange={(value) => setNewDocument({...newDocument, type: value})}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SOP">SOP</SelectItem>
                      <SelectItem value="Template">Template</SelectItem>
                      <SelectItem value="Form">Form</SelectItem>
                      <SelectItem value="Record">Record</SelectItem>
                      <SelectItem value="Report">Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="qmsType">QMS Type</Label>
                  <Select 
                    value={newDocument.qmsType} 
                    onValueChange={(value) => setNewDocument({...newDocument, qmsType: value})}
                  >
                    <SelectTrigger id="qmsType">
                      <SelectValue placeholder="Select QMS type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ISO 9001">ISO 9001</SelectItem>
                      <SelectItem value="ISO 13485">ISO 13485</SelectItem>
                      <SelectItem value="HACCP">HACCP</SelectItem>
                      <SelectItem value="cGMP">cGMP</SelectItem>
                      <SelectItem value="IEC 62366">IEC 62366</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project">Project</Label>
                <Select 
                  value={newDocument.project} 
                  onValueChange={(value) => setNewDocument({...newDocument, project: value})}
                >
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectNames.map((project) => (
                      <SelectItem key={project} value={project}>
                        {project}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={newDocument.description}
                  onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                  placeholder="Document description"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDocumentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateDocument}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          {/* Document Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-1">
                <Filter className="h-4 w-4 mr-1" />
                <span>{typeFilter || "Type"}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTypeFilter(null)}>
                All Types
              </DropdownMenuItem>
              {documentTypes.map((type) => (
                <DropdownMenuItem key={type} onClick={() => setTypeFilter(type)}>
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-1">
                <Filter className="h-4 w-4 mr-1" />
                <span>{statusFilter || "Status"}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Statuses
              </DropdownMenuItem>
              {documentStatuses.map((status) => (
                <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Sort Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleSort("title")}>
                  Title {sortBy === "title" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("updatedAt")}>
                  Last Updated {sortBy === "updatedAt" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("status")}>
                  Status {sortBy === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="sop">SOPs</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="forms">Forms & Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc) => {
              const DocIcon = getDocumentIcon(doc.type);
              return (
                <Card key={doc.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg truncate">{doc.title}</CardTitle>
                      <Badge variant={getBadgeVariant(doc.status) as any}>
                        {doc.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <DocIcon className="h-4 w-4 mr-1" />
                      <span>{doc.type}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Project:</span>
                        <span className="font-medium">{doc.project}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">QMS Type:</span>
                        <span>{doc.qmsType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Version:</span>
                        <span>{doc.version}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span>{doc.author}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{doc.updatedAt}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDocument(doc)}
                    >
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="default" size="sm">
                          Actions
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditDocument(doc)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Draft")}>
                          Set to Draft
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "In Review")}>
                          Set to In Review
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Approved")}>
                          Set to Approved
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Obsolete")}>
                          Set to Obsolete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDeleteDocument(doc)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No documents found matching your filters.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sop" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.filter(doc => doc.type === "SOP").map((doc) => {
              const DocIcon = getDocumentIcon(doc.type);
              return (
                <Card key={doc.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg truncate">{doc.title}</CardTitle>
                      <Badge variant={getBadgeVariant(doc.status) as any}>
                        {doc.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <DocIcon className="h-4 w-4 mr-1" />
                      <span>{doc.type}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Project:</span>
                        <span className="font-medium">{doc.project}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">QMS Type:</span>
                        <span>{doc.qmsType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Version:</span>
                        <span>{doc.version}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span>{doc.author}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{doc.updatedAt}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDocument(doc)}
                    >
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="default" size="sm">
                          Actions
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditDocument(doc)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Draft")}>
                          Set to Draft
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "In Review")}>
                          Set to In Review
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Approved")}>
                          Set to Approved
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Obsolete")}>
                          Set to Obsolete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDeleteDocument(doc)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          {filteredDocuments.filter(doc => doc.type === "SOP").length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No SOPs found matching your filters.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.filter(doc => doc.type === "Template").map((doc) => {
              const DocIcon = getDocumentIcon(doc.type);
              return (
                <Card key={doc.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg truncate">{doc.title}</CardTitle>
                      <Badge variant={getBadgeVariant(doc.status) as any}>
                        {doc.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <DocIcon className="h-4 w-4 mr-1" />
                      <span>{doc.type}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Project:</span>
                        <span className="font-medium">{doc.project}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">QMS Type:</span>
                        <span>{doc.qmsType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Version:</span>
                        <span>{doc.version}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span>{doc.author}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{doc.updatedAt}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDocument(doc)}
                    >
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="default" size="sm">
                          Actions
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditDocument(doc)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Draft")}>
                          Set to Draft
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "In Review")}>
                          Set to In Review
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Approved")}>
                          Set to Approved
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Obsolete")}>
                          Set to Obsolete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDeleteDocument(doc)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          {filteredDocuments.filter(doc => doc.type === "Template").length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No templates found matching your filters.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="forms" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.filter(doc => ["Form", "Record", "Report"].includes(doc.type)).map((doc) => {
              const DocIcon = getDocumentIcon(doc.type);
              return (
                <Card key={doc.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg truncate">{doc.title}</CardTitle>
                      <Badge variant={getBadgeVariant(doc.status) as any}>
                        {doc.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <DocIcon className="h-4 w-4 mr-1" />
                      <span>{doc.type}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Project:</span>
                        <span className="font-medium">{doc.project}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">QMS Type:</span>
                        <span>{doc.qmsType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Version:</span>
                        <span>{doc.version}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span>{doc.author}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{doc.updatedAt}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDocument(doc)}
                    >
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="default" size="sm">
                          Actions
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditDocument(doc)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Draft")}>
                          Set to Draft
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "In Review")}>
                          Set to In Review
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Approved")}>
                          Set to Approved
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(doc, "Obsolete")}>
                          Set to Obsolete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDeleteDocument(doc)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          {filteredDocuments.filter(doc => ["Form", "Record", "Report"].includes(doc.type)).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No forms or records found matching your filters.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
