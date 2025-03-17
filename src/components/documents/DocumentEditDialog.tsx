
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Document } from "./types";

interface DocumentEditDialogProps {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (document: Document) => void;
  projectNames: string[];
}

const DocumentEditDialog = ({ 
  document, 
  open, 
  onOpenChange, 
  onSave,
  projectNames
}: DocumentEditDialogProps) => {
  const [editingDocument, setEditingDocument] = useState<Document | null>(document);

  // Update the local state when the document prop changes
  if (document && (!editingDocument || document.id !== editingDocument.id)) {
    setEditingDocument({...document});
  }

  if (!editingDocument) return null;

  const handleSave = () => {
    onSave(editingDocument);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
          <DialogDescription>
            Make changes to the document and save when you're done
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={editingDocument.title}
              onChange={(e) => setEditingDocument({...editingDocument, title: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-type">Document Type</Label>
              <Select 
                value={editingDocument.type} 
                onValueChange={(value) => setEditingDocument({...editingDocument, type: value as any})}
              >
                <SelectTrigger id="edit-type">
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
              <Label htmlFor="edit-qmsType">QMS Type</Label>
              <Select 
                value={editingDocument.qmsType} 
                onValueChange={(value) => setEditingDocument({...editingDocument, qmsType: value})}
              >
                <SelectTrigger id="edit-qmsType">
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
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-project">Project</Label>
              <Select 
                value={editingDocument.project} 
                onValueChange={(value) => setEditingDocument({...editingDocument, project: value})}
              >
                <SelectTrigger id="edit-project">
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
              <Label htmlFor="edit-status">Status</Label>
              <Select 
                value={editingDocument.status} 
                onValueChange={(value) => setEditingDocument({...editingDocument, status: value as any})}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Obsolete">Obsolete</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editingDocument.description || ""}
              onChange={(e) => setEditingDocument({...editingDocument, description: e.target.value})}
              rows={2}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="edit-content">Content</Label>
            <Textarea
              id="edit-content"
              value={editingDocument.content || ""}
              onChange={(e) => setEditingDocument({...editingDocument, content: e.target.value})}
              rows={10}
              className="font-mono"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentEditDialog;
