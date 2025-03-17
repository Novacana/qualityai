
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Document } from "./types";
import { getBadgeVariant } from "./utils";

interface DocumentViewDialogProps {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (doc: Document) => void;
}

const DocumentViewDialog = ({ 
  document, 
  open, 
  onOpenChange, 
  onEdit 
}: DocumentViewDialogProps) => {
  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{document.title}</DialogTitle>
            <Badge variant={getBadgeVariant(document.status) as any}>
              {document.status}
            </Badge>
          </div>
          <DialogDescription className="flex flex-wrap items-center gap-2 text-sm mt-2">
            <span>{document.id}</span>
            <span>•</span>
            <span>{document.type}</span>
            <span>•</span>
            <span>{document.qmsType}</span>
            <span>•</span>
            <span>v{document.version}</span>
            <span>•</span>
            <span>Updated: {document.updatedAt}</span>
          </DialogDescription>
        </DialogHeader>
        
        {document.description && (
          <div className="bg-muted rounded-md p-3 mb-4">
            <p className="text-sm">{document.description}</p>
          </div>
        )}
        
        <ScrollArea className="h-[50vh] rounded-md border p-4">
          <div className="whitespace-pre-line font-mono text-sm">
            {document.content || "No content available"}
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => {
              onOpenChange(false);
              onEdit(document);
            }}
          >
            Edit Document
          </Button>
          <Button 
            variant="default" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewDialog;
