
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { NewDocument } from "./types";

interface CreateDocumentDialogProps {
  onCreateDocument: (document: NewDocument) => void;
  projectNames: string[];
  qmsTypes: string[];
}

const CreateDocumentDialog = ({ 
  onCreateDocument,
  projectNames,
  qmsTypes
}: CreateDocumentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [newDocument, setNewDocument] = useState<NewDocument>({
    title: '',
    type: 'SOP',
    project: '',
    qmsType: 'ISO 9001',
    description: '',
    content: ''
  });

  const handleCreate = () => {
    if (!newDocument.title || !newDocument.type || !newDocument.project) {
      toast.error("Please fill in all required fields");
      return;
    }

    onCreateDocument(newDocument);
    setOpen(false);
    setNewDocument({
      title: '',
      type: 'SOP',
      project: '',
      qmsType: 'ISO 9001',
      description: '',
      content: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  {qmsTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
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
          <div className="grid gap-2">
            <Label htmlFor="content">Content (optional)</Label>
            <Textarea
              id="content"
              value={newDocument.content}
              onChange={(e) => setNewDocument({...newDocument, content: e.target.value})}
              placeholder="Document content (Markdown supported)"
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocumentDialog;
