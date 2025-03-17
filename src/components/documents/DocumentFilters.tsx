
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpDown, ChevronDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  typeFilter: string | null;
  onTypeFilterChange: (type: string | null) => void;
  statusFilter: string | null;
  onStatusFilterChange: (status: string | null) => void;
  sortBy: "title" | "updatedAt" | "status";
  sortDirection: "asc" | "desc";
  onSortChange: (field: "title" | "updatedAt" | "status") => void;
  documentTypes: string[];
  documentStatuses: string[];
}

const DocumentFilters = ({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  sortDirection,
  onSortChange,
  documentTypes,
  documentStatuses,
}: DocumentFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
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
            <DropdownMenuItem onClick={() => onTypeFilterChange(null)}>
              All Types
            </DropdownMenuItem>
            {documentTypes.map((type) => (
              <DropdownMenuItem key={type} onClick={() => onTypeFilterChange(type)}>
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
            <DropdownMenuItem onClick={() => onStatusFilterChange(null)}>
              All Statuses
            </DropdownMenuItem>
            {documentStatuses.map((status) => (
              <DropdownMenuItem key={status} onClick={() => onStatusFilterChange(status)}>
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
              <DropdownMenuItem onClick={() => onSortChange("title")}>
                Title {sortBy === "title" && (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange("updatedAt")}>
                Last Updated {sortBy === "updatedAt" && (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange("status")}>
                Status {sortBy === "status" && (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DocumentFilters;
