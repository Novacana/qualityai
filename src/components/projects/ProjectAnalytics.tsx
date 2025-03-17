
import { BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const ProjectAnalytics = () => {
  const handleGenerateAnalytics = () => {
    toast.info("Projekt-Analyse wird erstellt...");
    setTimeout(() => {
      toast.success("Analyse wurde erfolgreich erstellt");
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project Analytics</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <div className="text-center">
          <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Project analytics visualization coming soon
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={handleGenerateAnalytics}
          >
            Generate Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectAnalytics;
