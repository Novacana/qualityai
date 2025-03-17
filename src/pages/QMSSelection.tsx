
import { useState } from 'react';
import { Check, Shield, Clipboard, HeartPulse, Beaker, FileCheck, FolderCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QMSCard from '@/components/ui/QMSCard';
import { toast } from "sonner";

const QMSSelection = () => {
  const [selectedQMS, setSelectedQMS] = useState<string | null>(null);
  
  const handleSelectQMS = (qmsType: string) => {
    setSelectedQMS(qmsType);
    toast.success(`${qmsType} selected as your QMS standard`);
  };
  
  const qmsOptions = [
    {
      title: "ISO 9001",
      description: "General quality management system",
      icon: <Shield className="h-8 w-8" />,
      features: [
        "Process approach to quality management",
        "Risk-based thinking",
        "Continuous improvement methodology",
        "Documentation management",
        "Internal auditing procedures"
      ],
      suitable: ["General Research", "Lab Management", "Basic Quality Control"],
      variant: "default"
    },
    {
      title: "ISO 13485",
      description: "Medical devices quality management",
      icon: <HeartPulse className="h-8 w-8" />,
      features: [
        "Regulatory compliance for medical devices",
        "Design and development controls",
        "Risk management integration",
        "Production and process controls",
        "Specialized validation requirements"
      ],
      suitable: ["Medical Device Development", "Clinical Research", "Implantable Materials"],
      variant: "highlighted"
    },
    {
      title: "HACCP",
      description: "Food safety management system",
      icon: <Beaker className="h-8 w-8" />,
      features: [
        "Hazard identification",
        "Critical control points monitoring",
        "Preventive measures establishment",
        "Verification procedures",
        "Food safety documentation"
      ],
      suitable: ["Food Contact Materials", "Packaging Research", "Consumable Products"],
      variant: "default"
    },
    {
      title: "cGMP",
      description: "Current Good Manufacturing Practice",
      icon: <FileCheck className="h-8 w-8" />,
      features: [
        "Facility and equipment qualification",
        "Material management system",
        "Production and process controls",
        "Laboratory controls",
        "Validation documentation"
      ],
      suitable: ["Pharmaceutical Research", "Drug Delivery Systems", "Regulated Manufacturing"],
      variant: "default"
    },
    {
      title: "Combined ISO 14971 & IEC 62366",
      description: "Risk management and usability for medical devices",
      icon: <FolderCheck className="h-8 w-8" />,
      features: [
        "Comprehensive risk assessment",
        "User interface evaluation",
        "Use-related risk analysis",
        "Usability engineering process",
        "Integrated validation approach"
      ],
      suitable: ["Complex Medical Devices", "Human-Machine Interfaces", "Patient-Facing Systems"],
      variant: "default"
    }
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">QMS Selection</h1>
        <p className="text-muted-foreground">
          Choose the most appropriate quality management system for your research project
        </p>
      </div>
      
      <Tabs defaultValue="selection" className="space-y-6">
        <TabsList>
          <TabsTrigger value="selection">Select QMS</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="comparison">Standards Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="selection" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {qmsOptions.map((qms, index) => (
              <QMSCard
                key={index}
                title={qms.title}
                description={qms.description}
                features={qms.features}
                suitable={qms.suitable}
                icon={qms.icon}
                variant={qms.variant as "default" | "highlighted"}
                onSelect={() => handleSelectQMS(qms.title)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="assistant">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Answer a few questions to get a personalized recommendation for the most suitable QMS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-muted/30">
                <p className="text-center text-muted-foreground p-8">
                  AI assistant questionnaire coming soon. This tool will help evaluate your project needs
                  and recommend the most appropriate quality management system.
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button disabled>Start Questionnaire</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Standards Comparison</CardTitle>
              <CardDescription>
                Compare features and requirements across different quality management standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border p-2 text-left">Feature</th>
                      <th className="border p-2 text-center">ISO 9001</th>
                      <th className="border p-2 text-center">ISO 13485</th>
                      <th className="border p-2 text-center">HACCP</th>
                      <th className="border p-2 text-center">cGMP</th>
                      <th className="border p-2 text-center">ISO 14971 & IEC 62366</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 text-left font-medium">Risk Management</td>
                      <td className="border p-2 text-center">Medium</td>
                      <td className="border p-2 text-center">High</td>
                      <td className="border p-2 text-center">High</td>
                      <td className="border p-2 text-center">High</td>
                      <td className="border p-2 text-center">Very High</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-left font-medium">Documentation Requirements</td>
                      <td className="border p-2 text-center">Medium</td>
                      <td className="border p-2 text-center">High</td>
                      <td className="border p-2 text-center">Medium</td>
                      <td className="border p-2 text-center">Very High</td>
                      <td className="border p-2 text-center">High</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-left font-medium">Regulatory Focus</td>
                      <td className="border p-2 text-center">Low</td>
                      <td className="border p-2 text-center">High</td>
                      <td className="border p-2 text-center">Medium</td>
                      <td className="border p-2 text-center">Very High</td>
                      <td className="border p-2 text-center">High</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-left font-medium">Validation Requirements</td>
                      <td className="border p-2 text-center">Low</td>
                      <td className="border p-2 text-center">High</td>
                      <td className="border p-2 text-center">Medium</td>
                      <td className="border p-2 text-center">Very High</td>
                      <td className="border p-2 text-center">High</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-left font-medium">Implementation Complexity</td>
                      <td className="border p-2 text-center">Medium</td>
                      <td className="border p-2 text-center">High</td>
                      <td className="border p-2 text-center">Medium</td>
                      <td className="border p-2 text-center">Very High</td>
                      <td className="border p-2 text-center">High</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-left font-medium">Specialized Training Needed</td>
                      <td className="border p-2 text-center">
                        <Check size={16} className="mx-auto text-green-500" />
                      </td>
                      <td className="border p-2 text-center">
                        <Check size={16} className="mx-auto text-green-500" />
                      </td>
                      <td className="border p-2 text-center">
                        <Check size={16} className="mx-auto text-green-500" />
                      </td>
                      <td className="border p-2 text-center">
                        <Check size={16} className="mx-auto text-green-500" />
                      </td>
                      <td className="border p-2 text-center">
                        <Check size={16} className="mx-auto text-green-500" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QMSSelection;
