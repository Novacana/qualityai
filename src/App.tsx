
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QMSSelection from "./pages/QMSSelection";
import Projects from "./pages/Projects";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import UserManagement from "./pages/UserManagement";
import ProjectDetails from "./pages/ProjectDetails";
import Documentation from "./pages/Documentation";
import RSpaceIntegration from "./pages/RSpaceIntegration";
import SOPTemplates from "./pages/SOPTemplates";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/qms-selection" element={<QMSSelection />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/rspace-integration" element={<RSpaceIntegration />} />
          <Route path="/sop-templates" element={<SOPTemplates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
