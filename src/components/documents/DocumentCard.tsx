
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, User } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Document } from "./types";
import { getBadgeVariant, getDocumentIcon } from "./utils";

interface DocumentCardProps {
  document: Document;
  onView: (doc: Document) => void;
  onEdit: (doc: Document) => void;
  onDelete: (doc: Document) => void;
  onChangeStatus: (doc: Document, status: "Draft" | "In Review" | "Approved" | "Obsolete") => void;
}

const DocumentCard = ({ 
  document, 
  onView, 
  onEdit, 
  onDelete, 
  onChangeStatus 
}: DocumentCardProps) => {
  const DocIcon = getDocumentIcon(document.type);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg truncate">{document.title}</CardTitle>
          <Badge variant={getBadgeVariant(document.status) as any}>
            {document.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center mt-1">
          <DocIcon className="h-4 w-4 mr-1" />
          <span>{document.type}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Project:</span>
            <span className="font-medium">{document.project}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">QMS Type:</span>
            <span>{document.qmsType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Version:</span>
            <span>{document.version}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5 mr-1" />
            <span>{document.author}</span>
            <span className="mx-2">•</span>
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{document.updatedAt}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onView(document)}
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
            <DropdownMenuItem onClick={() => onEdit(document)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onChangeStatus(document, "Draft")}>
              Set to Draft
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChangeStatus(document, "In Review")}>
              Set to In Review
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChangeStatus(document, "Approved")}>
              Set to Approved
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChangeStatus(document, "Obsolete")}>
              Set to Obsolete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600" 
              onClick={() => onDelete(document)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
