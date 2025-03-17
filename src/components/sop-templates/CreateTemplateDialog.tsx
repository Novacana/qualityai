
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilePlus2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { NewTemplate, TemplateCategory } from "./types";
import { useState } from "react";

interface CreateTemplateDialogProps {
  templateCategories: TemplateCategory[];
  onCreateTemplate: (template: NewTemplate) => void;
}

export const CreateTemplateDialog = ({ 
  templateCategories, 
  onCreateTemplate 
}: CreateTemplateDialogProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [newTemplate, setNewTemplate] = useState<NewTemplate>({
    title: '',
    category: '',
    description: '',
    type: ''
  });

  const handleSubmit = () => {
    if (!newTemplate.title.trim() || !newTemplate.category || !newTemplate.type) {
      toast.error("Bitte füllen Sie alle erforderlichen Felder aus");
      return;
    }

    onCreateTemplate(newTemplate);
    setNewTemplate({
      title: '',
      category: '',
      description: '',
      type: ''
    });
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button>
          <FilePlus2 className="mr-2 h-4 w-4" />
          Neue Vorlage erstellen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Neue SOP-Vorlage erstellen</DialogTitle>
          <DialogDescription>
            Erstellen Sie eine neue Vorlage für Ihr Qualitätsmanagementsystem
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={newTemplate.title}
              onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
              placeholder="Titel der Vorlage"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Kategorie</Label>
              <Select 
                value={newTemplate.category} 
                onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Kategorie auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {templateCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Dokumenttyp</Label>
              <Select 
                value={newTemplate.type} 
                onValueChange={(value) => setNewTemplate({...newTemplate, type: value})}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Typ auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Documentation">Dokumentation</SelectItem>
                  <SelectItem value="Procedure">Verfahren</SelectItem>
                  <SelectItem value="Form">Formular</SelectItem>
                  <SelectItem value="Checklist">Checkliste</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Beschreibung</Label>
            <Textarea
              id="description"
              value={newTemplate.description}
              onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
              placeholder="Beschreibung der Vorlage"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDialog(false)}>
            Abbrechen
          </Button>
          <Button onClick={handleSubmit}>
            Vorlage erstellen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
