
import { useState, useEffect } from "react";
import { BarChart, BarChartIcon, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProjectAnalytics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsGenerated, setAnalyticsGenerated] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [timespan, setTimespan] = useState<string>("6months");
  const [qmsTypes, setQmsTypes] = useState<string[]>(["ISO 9001", "ISO 13485", "cGMP"]);
  const [selectedQms, setSelectedQms] = useState<string>("all");
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  const handleGenerateAnalytics = () => {
    setIsLoading(true);
    toast.info("Projekt-Analyse wird erstellt...");
    
    // Simulate API call delay
    setTimeout(() => {
      generateAnalyticsData();
      setAnalyticsGenerated(true);
      setIsLoading(false);
      toast.success("Analyse wurde erfolgreich erstellt");
    }, 2000);
  };

  const generateAnalyticsData = () => {
    // Generate data based on the selected timespan
    let months: string[];
    switch (timespan) {
      case "3months":
        months = ["Jan", "Feb", "Mar"];
        break;
      case "12months":
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        break;
      default: // 6 months
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    }
    
    // Sample bar chart data based on timespan
    const barData = months.map(month => {
      return {
        name: month,
        documents: Math.floor(Math.random() * 10) + 2,
        tasks: Math.floor(Math.random() * 12) + 4,
        issues: Math.floor(Math.random() * 5)
      };
    });
    
    // Sample pie chart data - adjust based on QMS selection
    let pieChartData = [
      { name: 'SOPs', value: 35 },
      { name: 'Forms', value: 25 },
      { name: 'Records', value: 20 },
      { name: 'Templates', value: 15 },
      { name: 'Reports', value: 5 },
    ];
    
    // If a specific QMS is selected, adjust the distribution
    if (selectedQms !== "all") {
      if (selectedQms === "ISO 13485") {
        pieChartData = [
          { name: 'SOPs', value: 40 },
          { name: 'Forms', value: 30 },
          { name: 'Records', value: 15 },
          { name: 'Templates', value: 10 },
          { name: 'Reports', value: 5 },
        ];
      } else if (selectedQms === "cGMP") {
        pieChartData = [
          { name: 'SOPs', value: 30 },
          { name: 'Forms', value: 20 },
          { name: 'Records', value: 25 },
          { name: 'Templates', value: 15 },
          { name: 'Reports', value: 10 },
        ];
      }
    }
    
    setChartData(barData);
    setPieData(pieChartData);
  };

  const handleExportData = (chartType: string) => {
    toast.success(`${chartType === 'activity' ? 'Aktivitätsdaten' : 'Dokumenttypen'} wurden exportiert.`);
  };

  const handleChangePeriod = (value: string) => {
    setTimespan(value);
    if (analyticsGenerated) {
      setIsLoading(true);
      toast.info("Daten werden aktualisiert...");
      
      setTimeout(() => {
        generateAnalyticsData();
        setIsLoading(false);
        toast.success("Daten wurden aktualisiert");
      }, 1000);
    }
  };

  const handleChangeQms = (value: string) => {
    setSelectedQms(value);
    if (analyticsGenerated) {
      setIsLoading(true);
      toast.info("Daten werden nach QMS gefiltert...");
      
      setTimeout(() => {
        generateAnalyticsData();
        setIsLoading(false);
        toast.success("Daten wurden gefiltert");
      }, 1000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <CardTitle className="text-lg">Projekt-Analyse</CardTitle>
          
          {analyticsGenerated && (
            <div className="flex flex-col sm:flex-row gap-2">
              <Select 
                value={timespan} 
                onValueChange={handleChangePeriod}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Zeitraum wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Letzte 3 Monate</SelectItem>
                  <SelectItem value="6months">Letzte 6 Monate</SelectItem>
                  <SelectItem value="12months">Letzte 12 Monate</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={selectedQms} 
                onValueChange={handleChangeQms}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="QMS wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle QM-Systeme</SelectItem>
                  {qmsTypes.map(qms => (
                    <SelectItem key={qms} value={qms}>{qms}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className={`${analyticsGenerated ? '' : 'h-[300px]'} flex flex-col items-center justify-center`}>
        {!analyticsGenerated ? (
          <div className="text-center">
            <BarChartIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Visualisieren Sie Ihre Projektdaten zur besseren Analyse und Entscheidungsfindung
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={handleGenerateAnalytics}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⚙️</span>
                  Analyse wird erstellt...
                </>
              ) : (
                "Analyse erstellen"
              )}
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="activity">Aktivitätstrends</TabsTrigger>
              <TabsTrigger value="documents">Dokumenttypen</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="w-full">
              {isLoading ? (
                <div className="h-80 w-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin text-3xl mb-4">⚙️</div>
                    <p className="text-muted-foreground">Daten werden geladen...</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={chartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="documents" fill="#8884d8" name="Dokumente" />
                      <Bar dataKey="tasks" fill="#82ca9d" name="Aufgaben" />
                      <Bar dataKey="issues" fill="#ffc658" name="Probleme" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExportData('activity')}
                  disabled={isLoading}
                >
                  Daten exportieren
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="documents" className="w-full">
              {isLoading ? (
                <div className="h-80 w-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin text-3xl mb-4">⚙️</div>
                    <p className="text-muted-foreground">Daten werden geladen...</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Anteil']} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExportData('documents')}
                  disabled={isLoading}
                >
                  Daten exportieren
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectAnalytics;
