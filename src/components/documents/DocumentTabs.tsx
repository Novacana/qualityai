
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentList from "./DocumentList";
import { Document } from "./types";

interface DocumentTabsProps {
  filteredDocuments: Document[];
  onView: (doc: Document) => void;
  onEdit: (doc: Document) => void;
  onDelete: (doc: Document) => void;
  onChangeStatus: (doc: Document, status: "Draft" | "In Review" | "Approved" | "Obsolete") => void;
}

const DocumentTabs = ({
  filteredDocuments,
  onView,
  onEdit,
  onDelete,
  onChangeStatus
}: DocumentTabsProps) => {
  const sopDocuments = filteredDocuments.filter(doc => doc.type === "SOP");
  const templateDocuments = filteredDocuments.filter(doc => doc.type === "Template");
  const formDocuments = filteredDocuments.filter(doc => ["Form", "Record", "Report"].includes(doc.type));

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">All Documents</TabsTrigger>
        <TabsTrigger value="sop">SOPs</TabsTrigger>
        <TabsTrigger value="templates">Templates</TabsTrigger>
        <TabsTrigger value="forms">Forms & Records</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="space-y-4">
        <DocumentList
          documents={filteredDocuments}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
        />
      </TabsContent>
      
      <TabsContent value="sop" className="space-y-4">
        <DocumentList
          documents={sopDocuments}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
          emptyMessage="No SOPs found matching your filters."
        />
      </TabsContent>
      
      <TabsContent value="templates" className="space-y-4">
        <DocumentList
          documents={templateDocuments}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
          emptyMessage="No templates found matching your filters."
        />
      </TabsContent>
      
      <TabsContent value="forms" className="space-y-4">
        <DocumentList
          documents={formDocuments}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
          emptyMessage="No forms or records found matching your filters."
        />
      </TabsContent>
    </Tabs>
  );
};

export default DocumentTabs;
