
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Document {
  id: string;
  title: string;
  type: string;
  status: string;
  updatedAt: string;
}

interface DocumentsListProps {
  documents: Document[];
  isOverview?: boolean;
  onViewAllDocuments?: () => void;
}

const DocumentsList = ({ documents, isOverview = false, onViewAllDocuments }: DocumentsListProps) => {
  const handleAddDocument = () => {
    toast.info("Neues Dokument wird erstellt...");
  };

  const handleViewDocument = (docId: string) => {
    toast.info(`Dokument ${docId} wird geöffnet...`);
  };

  const getDocumentStatusBadge = (status: string) => {
    return status === "Approved" ? "default" : status === "In Review" ? "outline" : "secondary";
  };

  return (
    <Card>
      <CardHeader className={`flex flex-row items-center justify-between ${isOverview ? '' : ''}`}>
        <CardTitle className={isOverview ? "text-lg" : ""}>
          {isOverview ? "Recent Documents" : "Project Documents"}
        </CardTitle>
        {!isOverview && (
          <Button onClick={handleAddDocument}>
            Add Document
          </Button>
        )}
      </CardHeader>
      <CardContent className={isOverview ? "space-y-4" : ""}>
        <div className="space-y-4">
          {(isOverview ? documents.slice(0, 3) : documents).map(doc => (
            <div 
              key={doc.id}
              className={isOverview 
                ? "flex justify-between items-center p-2 rounded-md hover:bg-muted" 
                : "flex justify-between items-center p-3 border rounded-md hover:bg-muted transition-colors"
              }
            >
              <div className="flex items-center">
                <div className={isOverview ? "" : "p-2 rounded-md bg-muted mr-3"}>
                  <FileText className={`${isOverview ? "h-4 w-4 mr-3 text-muted-foreground" : "h-4 w-4"}`} />
                </div>
                <div>
                  <div className={isOverview ? "text-sm font-medium" : "font-medium"}>{doc.title}</div>
                  <div className={isOverview 
                    ? "text-xs text-muted-foreground" 
                    : "text-sm text-muted-foreground flex items-center space-x-2"
                  }>
                    {!isOverview && <span>{doc.type}</span>}
                    {!isOverview && <span>•</span>}
                    <span>{isOverview ? `Updated: ${doc.updatedAt}` : `Updated: ${doc.updatedAt}`}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getDocumentStatusBadge(doc.status) as "default" | "secondary" | "destructive" | "outline"}>
                  {doc.status}
                </Badge>
                {!isOverview && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDocument(doc.id)}
                  >
                    View
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isOverview && (
            <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={onViewAllDocuments}
            >
              View All Documents
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsList;
