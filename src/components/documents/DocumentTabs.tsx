
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentList from "./DocumentList";
import { Document } from "./types";

interface DocumentTabsProps {
  filteredDocuments: Document[];
  onView: (doc: Document) => void;
  onEdit: (doc: Document) => void;
  onDelete: (doc: Document) => void;
  onChangeStatus: (doc: Document, status: "Draft" | "In Review" | "Approved" | "Obsolete") => void;
  onViewAuditTrail: (doc: Document) => void;
}

const DocumentTabs = ({ 
  filteredDocuments, 
  onView, 
  onEdit, 
  onDelete, 
  onChangeStatus,
  onViewAuditTrail
}: DocumentTabsProps) => {
  const draftDocs = filteredDocuments.filter((doc) => doc.status === "Draft");
  const reviewDocs = filteredDocuments.filter((doc) => doc.status === "In Review");
  const approvedDocs = filteredDocuments.filter((doc) => doc.status === "Approved");
  const obsoleteDocs = filteredDocuments.filter((doc) => doc.status === "Obsolete");

  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all" className="flex gap-2">
          All
          <span className="bg-muted rounded-full px-2 py-0.5 text-xs font-medium">
            {filteredDocuments.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="draft" className="flex gap-2">
          Draft
          <span className="bg-muted rounded-full px-2 py-0.5 text-xs font-medium">
            {draftDocs.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="review" className="flex gap-2">
          In Review
          <span className="bg-muted rounded-full px-2 py-0.5 text-xs font-medium">
            {reviewDocs.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="approved" className="flex gap-2">
          Approved
          <span className="bg-muted rounded-full px-2 py-0.5 text-xs font-medium">
            {approvedDocs.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="obsolete" className="flex gap-2">
          Obsolete
          <span className="bg-muted rounded-full px-2 py-0.5 text-xs font-medium">
            {obsoleteDocs.length}
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <DocumentList 
          documents={filteredDocuments} 
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
          onViewAuditTrail={onViewAuditTrail}
        />
      </TabsContent>
      
      <TabsContent value="draft">
        <DocumentList 
          documents={draftDocs} 
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
          onViewAuditTrail={onViewAuditTrail}
          emptyMessage="No draft documents found."
        />
      </TabsContent>
      
      <TabsContent value="review">
        <DocumentList 
          documents={reviewDocs} 
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
          onViewAuditTrail={onViewAuditTrail}
          emptyMessage="No documents in review."
        />
      </TabsContent>
      
      <TabsContent value="approved">
        <DocumentList 
          documents={approvedDocs} 
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
          onViewAuditTrail={onViewAuditTrail}
          emptyMessage="No approved documents found."
        />
      </TabsContent>
      
      <TabsContent value="obsolete">
        <DocumentList 
          documents={obsoleteDocs} 
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
          onViewAuditTrail={onViewAuditTrail}
          emptyMessage="No obsolete documents found."
        />
      </TabsContent>
    </Tabs>
  );
};

export default DocumentTabs;
