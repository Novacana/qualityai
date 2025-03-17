
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Documentation from './pages/Documentation';
import Documents from './pages/Documents';
import SOPTemplates from './pages/SOPTemplates';
import Settings from './pages/Settings';
import RSpaceIntegration from './pages/RSpaceIntegration';
import UserManagement from './pages/UserManagement';
import NotFound from './pages/NotFound';
import QMSSelection from './pages/QMSSelection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/sop-templates" element={<SOPTemplates />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/rspace-integration" element={<RSpaceIntegration />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/QMSSelection" element={<QMSSelection />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
