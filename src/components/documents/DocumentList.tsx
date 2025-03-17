
import DocumentCard from "./DocumentCard";
import { Document } from "./types";

interface DocumentListProps {
  documents: Document[];
  onView: (doc: Document) => void;
  onEdit: (doc: Document) => void;
  onDelete: (doc: Document) => void;
  onChangeStatus: (doc: Document, status: "Draft" | "In Review" | "Approved" | "Obsolete") => void;
  onViewAuditTrail: (doc: Document) => void;
  emptyMessage?: string;
}

const DocumentList = ({ 
  documents, 
  onView, 
  onEdit, 
  onDelete, 
  onChangeStatus,
  onViewAuditTrail,
  emptyMessage = "No documents found matching your filters."
}: DocumentListProps) => {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
          onViewAuditTrail={onViewAuditTrail}
        />
      ))}
    </div>
  );
};

export default DocumentList;
