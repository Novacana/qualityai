
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Documentation</h1>
        <p className="text-muted-foreground">
          Learn how to use the QMS platform and understand quality management processes
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documentation..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="platform" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="platform">Platform Guide</TabsTrigger>
          <TabsTrigger value="qms">QMS Standards</TabsTrigger>
          <TabsTrigger value="training">Training Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform User Guide</CardTitle>
              <CardDescription>
                Comprehensive documentation on how to use the QMS platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Getting Started</h3>
                <Separator />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">User Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Learn how to navigate and utilize your personalized dashboard
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Project Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Create, edit, and manage quality management projects
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Document Control</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Upload, manage, and control documents in the system
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Electronic Signatures</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Sign and verify documents with compliant electronic signatures
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Advanced Features</h3>
                <Separator />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">RSpace Integration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Connect and synchronize with the RSpace lab documentation system
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">AI Assistant Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Leverage the AI assistant for QMS selection and guidance
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Compliance Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Track and manage compliance with selected standards
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Microsoft 365 Integration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Connect with your enterprise Microsoft 365 account
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>QMS Standards Documentation</CardTitle>
              <CardDescription>
                Detailed information about various quality management standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">ISO Standards</h3>
                  <Separator />
                  
                  <div className="space-y-4">
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">ISO 9001</CardTitle>
                        <CardDescription>Quality Management System</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          The international standard for quality management systems (QMS) that provides a framework for organizations to ensure they meet customer and regulatory requirements.
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Process approach to quality management</li>
                          <li>Leadership commitment requirements</li>
                          <li>Risk-based thinking methodology</li>
                          <li>Documentation and record-keeping guidelines</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">ISO 13485</CardTitle>
                        <CardDescription>Medical Devices Quality Management</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          The internationally recognized quality standard for medical devices. Organizations that implement ISO 13485 demonstrate their ability to provide medical devices that consistently meet customer and regulatory requirements.
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Regulatory requirements for medical devices</li>
                          <li>Design and development controls</li>
                          <li>Production and process controls</li>
                          <li>Special validation requirements</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">ISO 14971</CardTitle>
                        <CardDescription>Risk Management for Medical Devices</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          The application of risk management to medical devices. This standard defines a process for manufacturers to identify hazards associated with medical devices, to estimate and evaluate risks, to control these risks, and to monitor the effectiveness of the controls.
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Risk assessment methodology</li>
                          <li>Risk control measures</li>
                          <li>Production and post-production information</li>
                          <li>Risk management documentation requirements</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Other Standards</h3>
                  <Separator />
                  
                  <div className="space-y-4">
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">HACCP</CardTitle>
                        <CardDescription>Hazard Analysis Critical Control Point</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          A systematic preventive approach to food safety and biological, chemical, and physical hazards in production processes that could cause the finished product to be unsafe.
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Hazard analysis procedures</li>
                          <li>Critical control point identification</li>
                          <li>Monitoring system establishment</li>
                          <li>Corrective action plans</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">cGMP</CardTitle>
                        <CardDescription>Current Good Manufacturing Practice</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Guidelines that provide systems for ensuring that products are consistently produced and controlled according to quality standards, primarily used in pharmaceutical and medical device manufacturing.
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Facility and equipment requirements</li>
                          <li>Material management system</li>
                          <li>Production and process controls</li>
                          <li>Laboratory controls and validation</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">IEC 62366</CardTitle>
                        <CardDescription>Medical Devices Usability</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          A standard for the application of usability engineering to medical devices, focusing on the evaluation of user interfaces to identify and mitigate potential use errors.
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>User interface analysis</li>
                          <li>Usability specification development</li>
                          <li>Usability verification and validation</li>
                          <li>Use-related risk management</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Materials</CardTitle>
              <CardDescription>
                Educational resources for platform usage and quality management principles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Platform Training</h3>
                  <Separator />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Getting Started Tutorial</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Introductory tutorial for new users of the QMS platform
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Advanced Features Guide</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Deep dive into advanced platform capabilities
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">QMS Implementation</h3>
                  <Separator />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">ISO 9001 Implementation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Step-by-step guide for implementing ISO 9001 in research projects
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">ISO 13485 Workshop</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Interactive workshop materials for ISO 13485 implementation
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Risk Management Training</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive training on ISO 14971 risk management principles
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">HACCP Fundamentals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Core principles and implementation guide for HACCP
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">GAMP 5 Validation</h3>
                  <Separator />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Validation Planning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Creating effective validation plans according to GAMP 5
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Test Protocol Development</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Developing comprehensive test protocols for system validation
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;
