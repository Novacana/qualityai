
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, Filter, Search } from "lucide-react";

interface TemplateFiltersProps {
  searchTerm: string;
  filterType: string | null;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string | null) => void;
}

export const TemplateFilters = ({
  searchTerm,
  filterType,
  onSearchChange,
  onFilterChange
}: TemplateFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Vorlagen durchsuchen..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            {filterType ? `Typ: ${filterType}` : "Filter"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Nach Typ filtern</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onFilterChange(null)}>
            Alle Typen
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("Documentation")}>
            Dokumentation
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("Procedure")}>
            Verfahren
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("Form")}>
            Formular
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("Checklist")}>
            Checkliste
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
