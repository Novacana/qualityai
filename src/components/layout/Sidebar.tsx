
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Home, 
  Folder, 
  FileText, 
  Settings, 
  Users, 
  BookOpen, 
  HelpCircle, 
  MessageSquare,
  Shield,
  ClipboardList
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar?: () => void;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  // Handle animations for the sidebar
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navItems = [
    { label: 'Dashboard', icon: Home, path: '/' },
    { label: 'Projects', icon: Folder, path: '/projects' },
    { label: 'Documents', icon: FileText, path: '/documents' },
    { label: 'QMS Selection', icon: ClipboardList, path: '/qms-selection' },
    { label: 'Users', icon: Users, path: '/users' },
    { label: 'Documentation', icon: BookOpen, path: '/documentation' },
    { label: 'Compliance', icon: Shield, path: '/compliance' },
    { label: 'Support', icon: HelpCircle, path: '/support' },
    { label: 'AI Assistant', icon: MessageSquare, path: '/assistant' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavClick = () => {
    if (isMobile && closeSidebar) {
      closeSidebar();
    }
  };

  const sidebarClassName = `fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out border-r border-border h-screen ${
    isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16'
  }`;

  return (
    <aside className={sidebarClassName}>
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-1 pt-5">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <TooltipProvider key={item.path} delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink 
                        to={item.path}
                        onClick={handleNavClick}
                        className={({ isActive }) => 
                          `flex items-center px-3 py-2 rounded-md transition-colors group ${
                            isActive 
                              ? 'bg-primary/10 text-primary' 
                              : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                          } ${!isOpen && 'md:justify-center'}`
                        }
                      >
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''} ${!isOpen && 'md:mr-0'}`} />
                        <span className={`ml-3 font-medium text-sm ${!isOpen && 'md:hidden'}`}>
                          {item.label}
                        </span>
                      </NavLink>
                    </TooltipTrigger>
                    {!isOpen && (
                      <TooltipContent side="right" className="md:flex hidden">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </nav>
        </ScrollArea>
        
        <div className="p-4 mt-auto">
          <Separator className="mb-4" />
          <div className={`flex items-center ${!isOpen && 'md:justify-center'}`}>
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                LI
              </div>
            </div>
            <div className={`ml-3 ${!isOpen && 'md:hidden'}`}>
              <p className="text-sm font-medium">Leibniz Institute</p>
              <p className="text-xs text-muted-foreground">QM Platform</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
