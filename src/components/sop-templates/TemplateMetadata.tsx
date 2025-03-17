
import { Badge } from "@/components/ui/badge";
import { Template } from "./types";

interface TemplateMetadataProps {
  template: Template;
}

export function TemplateMetadata({ template }: TemplateMetadataProps) {
  const { category, type, updated, downloads, tags } = template;
  
  return (
    <>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Kategorie</p>
          <p className="font-medium">{category}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Typ</p>
          <p className="font-medium">{type}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Aktualisiert</p>
          <p className="font-medium">{updated}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Downloads</p>
          <p className="font-medium">{downloads}</p>
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </>
  );
}
