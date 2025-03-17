
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  User,
  Settings2,
  Bell,
  Key,
  Globe,
  Lock,
  Mail,
  Shield,
  Database,
  Save
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  title: z.string().optional(),
  department: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Dr. Alexandra Johnson",
      email: "a.johnson@leibniz-inm.de",
      title: "Senior Researcher",
      department: "Nanomaterials Research",
      phone: "+49 123 456789",
      bio: "Specializing in nanomaterial surface characterization and environmental impact assessment."
    },
  });
  
  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
  });
  
  const onProfileSubmit = (data: z.infer<typeof profileFormSchema>) => {
    toast.success("Profile updated successfully");
    console.log(data);
  };
  
  const onSecuritySubmit = (data: z.infer<typeof securityFormSchema>) => {
    toast.success("Password updated successfully");
    console.log(data);
    securityForm.reset();
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid md:grid-cols-5 grid-cols-2">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integration">
            <Database className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Settings2 className="h-4 w-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            placeholder="Tell us about yourself" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Brief description of your expertise and research interests.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-doc-updates">Document Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications when documents are updated
                      </p>
                    </div>
                    <Switch 
                      id="email-doc-updates" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-task-updates">Task Assignments</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for new task assignments
                      </p>
                    </div>
                    <Switch 
                      id="email-task-updates" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-system-updates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for system updates and maintenance
                      </p>
                    </div>
                    <Switch 
                      id="email-system-updates" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-comments">Comments</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for comments on documents
                      </p>
                    </div>
                    <Switch 
                      id="push-comments" 
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-mentions">Mentions</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when you are mentioned
                      </p>
                    </div>
                    <Switch 
                      id="push-mentions" 
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-deadlines">Deadlines</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for upcoming deadlines
                      </p>
                    </div>
                    <Switch 
                      id="push-deadlines" 
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="security-login">Login Attempts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts for unusual login attempts
                      </p>
                    </div>
                    <Switch 
                      id="security-login" 
                      checked={securityAlerts}
                      onCheckedChange={setSecurityAlerts}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => toast.success("Notification settings saved")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Password Settings</CardTitle>
                <CardDescription>
                  Update your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...securityForm}>
                  <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                    <FormField
                      control={securityForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormDescription>
                            Password must be at least 8 characters long.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Key className="h-4 w-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch 
                      id="two-factor" 
                      checked={twoFactorAuth}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          toast.info("2FA setup wizard will be implemented soon");
                        }
                        setTwoFactorAuth(checked);
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="session-timeout" 
                      type="number" 
                      min={5} 
                      max={120} 
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                    />
                    <Button 
                      variant="outline"
                      onClick={() => toast.success("Session timeout updated")}
                    >
                      Set
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your account will be logged out after this period of inactivity
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => toast.info("Account activity log will be implemented soon")}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    View Account Activity Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Manage connections to external services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mr-4">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">RSpace Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect to RSpace laboratory documentation system
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => toast.info("RSpace integration will be implemented soon")}
                  >
                    Configure
                  </Button>
                </div>
                
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Microsoft 365</h3>
                      <p className="text-sm text-muted-foreground">
                        Integrate with Microsoft 365 enterprise account
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => toast.info("Microsoft 365 integration will be implemented soon")}
                  >
                    Configure
                  </Button>
                </div>
                
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mr-4">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">API Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage API keys for external integrations
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => toast.info("API management will be implemented soon")}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-export">Data Export Format</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose the default format for exporting data
                      </p>
                    </div>
                    <select 
                      id="data-export" 
                      className="border rounded-md px-3 py-2"
                      defaultValue="pdf"
                    >
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="language">System Language</Label>
                      <p className="text-sm text-muted-foreground">
                        Set your preferred language
                      </p>
                    </div>
                    <select 
                      id="language" 
                      className="border rounded-md px-3 py-2"
                      defaultValue="en"
                    >
                      <option value="en">English</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Management</h3>
                <div className="space-y-3">
                  <Button variant="outline" onClick={() => toast.info("Data export will be implemented soon")}>
                    Export All Data
                  </Button>
                  
                  <div className="pt-4">
                    <Button 
                      variant="destructive" 
                      onClick={() => toast.error("This feature will be implemented with additional security measures")}
                    >
                      Delete Account
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Warning: This action is irreversible and will permanently delete your account and all associated data.
                    </p>
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

export default Settings;
