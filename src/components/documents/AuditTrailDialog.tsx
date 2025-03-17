
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Document, AuditEntry } from "./types";
import { History, Clock, User, FileText, ArrowRight } from "lucide-react";

interface AuditTrailDialogProps {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuditTrailDialog = ({ 
  document, 
  open, 
  onOpenChange
}: AuditTrailDialogProps) => {
  if (!document) return null;
  
  const auditTrail = document.auditTrail || [];

  // Get color for audit action
  const getActionColor = (action: string) => {
    switch (action) {
      case "Created":
        return "text-green-600";
      case "Modified":
        return "text-blue-600";
      case "Reviewed":
        return "text-amber-600";
      case "Approved":
        return "text-green-700";
      case "Status Change":
        return "text-purple-600";
      case "Obsoleted":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            <DialogTitle>Audit Trail - {document.title}</DialogTitle>
          </div>
          <DialogDescription>
            Complete history of changes made to this document in accordance with GMP guidelines
          </DialogDescription>
        </DialogHeader>
        
        {auditTrail.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No audit trail entries available for this document.</p>
          </div>
        ) : (
          <ScrollArea className="h-[50vh] pr-4">
            <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-[1px] before:bg-muted-foreground/20">
              {auditTrail.map((entry) => (
                <div key={entry.id} className="relative">
                  <div className="absolute left-[-22px] top-0 h-4 w-4 rounded-full bg-background border border-muted-foreground/20"></div>
                  <div className="bg-muted/50 rounded-md p-4 relative">
                    <div className="flex justify-between items-start mb-2">
                      <div className={`font-medium ${getActionColor(entry.action)}`}>
                        {entry.action}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {new Date(entry.timestamp).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-2 text-sm">
                      <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>{entry.username}</span>
                    </div>
                    
                    <p className="text-sm mb-2">{entry.details}</p>
                    
                    {(entry.previousVersion || entry.newVersion) && (
                      <div className="flex items-center text-sm mt-2 bg-background rounded p-2">
                        {entry.previousVersion && (
                          <div className="flex items-center">
                            <FileText className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>v{entry.previousVersion}</span>
                          </div>
                        )}
                        
                        {entry.previousVersion && entry.newVersion && (
                          <ArrowRight className="h-3.5 w-3.5 mx-2 text-muted-foreground" />
                        )}
                        
                        {entry.newVersion && (
                          <div className="flex items-center">
                            <FileText className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>v{entry.newVersion}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        
        <DialogFooter>
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

export default AuditTrailDialog;
