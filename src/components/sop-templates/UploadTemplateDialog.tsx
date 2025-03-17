
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { NewTemplate, TemplateCategory } from "./types";
import { useState } from "react";

interface UploadTemplateDialogProps {
  templateCategories: TemplateCategory[];
  onUploadTemplate: (template: NewTemplate, file: File) => void;
}

export const UploadTemplateDialog = ({ 
  templateCategories, 
  onUploadTemplate 
}: UploadTemplateDialogProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [newTemplate, setNewTemplate] = useState<NewTemplate>({
    title: '',
    category: '',
    description: '',
    type: ''
  });

  const handleSubmit = () => {
    if (!uploadFile || !newTemplate.category || !newTemplate.type) {
      toast.error("Bitte wählen Sie eine Datei aus und füllen Sie alle erforderlichen Felder aus");
      return;
    }

    onUploadTemplate(newTemplate, uploadFile);
    setNewTemplate({
      title: '',
      category: '',
      description: '',
      type: ''
    });
    setUploadFile(null);
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Vorlage hochladen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Vorlage hochladen</DialogTitle>
          <DialogDescription>
            Laden Sie eine bestehende Dokumentvorlage hoch
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Datei auswählen</Label>
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              {uploadFile ? (
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate max-w-[250px]">
                      {uploadFile.name}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setUploadFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {(uploadFile.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Ziehen Sie eine Datei hierher oder klicken Sie
                  </p>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadFile(e.target.files[0]);
                        // Pre-fill title with filename (without extension)
                        const fileName = e.target.files[0].name.replace(/\.[^/.]+$/, "");
                        setNewTemplate({
                          ...newTemplate,
                          title: fileName
                        });
                      }
                    }}
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Datei auswählen
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="upload-title">Titel (optional)</Label>
            <Input
              id="upload-title"
              value={newTemplate.title}
              onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
              placeholder="Titel der Vorlage (oder Dateiname wird verwendet)"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="upload-category">Kategorie</Label>
              <Select 
                value={newTemplate.category} 
                onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}
              >
                <SelectTrigger id="upload-category">
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
              <Label htmlFor="upload-type">Dokumenttyp</Label>
              <Select 
                value={newTemplate.type} 
                onValueChange={(value) => setNewTemplate({...newTemplate, type: value})}
              >
                <SelectTrigger id="upload-type">
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
            <Label htmlFor="upload-description">Beschreibung (optional)</Label>
            <Textarea
              id="upload-description"
              value={newTemplate.description}
              onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
              placeholder="Beschreibung der Vorlage"
              rows={2}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDialog(false)}>
            Abbrechen
          </Button>
          <Button onClick={handleSubmit}>
            Hochladen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
