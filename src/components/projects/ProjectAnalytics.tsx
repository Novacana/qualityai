
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

const ProjectAnalytics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsGenerated, setAnalyticsGenerated] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const handleGenerateAnalytics = () => {
    setIsLoading(true);
    toast.info("Projekt-Analyse wird erstellt...");
    
    // Simulate API call delay
    setTimeout(() => {
      // Sample bar chart data
      const barData = [
        { name: 'Jan', documents: 4, tasks: 6, issues: 2 },
        { name: 'Feb', documents: 5, tasks: 8, issues: 3 },
        { name: 'Mar', documents: 8, tasks: 10, issues: 1 },
        { name: 'Apr', documents: 6, tasks: 11, issues: 4 },
        { name: 'May', documents: 9, tasks: 7, issues: 2 },
        { name: 'Jun', documents: 12, tasks: 9, issues: 0 },
      ];
      
      // Sample pie chart data
      const pieChartData = [
        { name: 'SOPs', value: 35 },
        { name: 'Forms', value: 25 },
        { name: 'Records', value: 20 },
        { name: 'Templates', value: 15 },
        { name: 'Reports', value: 5 },
      ];
      
      setChartData(barData);
      setPieData(pieChartData);
      setAnalyticsGenerated(true);
      setIsLoading(false);
      toast.success("Analyse wurde erfolgreich erstellt");
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project Analytics</CardTitle>
      </CardHeader>
      <CardContent className={`${analyticsGenerated ? '' : 'h-[300px]'} flex flex-col items-center justify-center`}>
        {!analyticsGenerated ? (
          <div className="text-center">
            <BarChartIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Project analytics visualization coming soon
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={handleGenerateAnalytics}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Analytics"}
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="activity">Activity Trends</TabsTrigger>
              <TabsTrigger value="documents">Document Types</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="w-full">
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
                    <Bar dataKey="documents" fill="#8884d8" name="Documents" />
                    <Bar dataKey="tasks" fill="#82ca9d" name="Tasks" />
                    <Bar dataKey="issues" fill="#ffc658" name="Issues" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" onClick={() => toast.info("Export functionality coming soon")}>
                  Export Data
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="documents" className="w-full">
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
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" onClick={() => toast.info("Export functionality coming soon")}>
                  Export Data
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
