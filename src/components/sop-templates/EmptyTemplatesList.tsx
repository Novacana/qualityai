
import { FileWarning } from "lucide-react";

export const EmptyTemplatesList = () => {
  return (
    <div className="py-12 text-center">
      <FileWarning className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">Keine Vorlagen gefunden</h3>
      <p className="text-muted-foreground">
        Keine Vorlagen entsprechen Ihren Suchkriterien. Passen Sie Ihre Suche an.
      </p>
    </div>
  );
};
