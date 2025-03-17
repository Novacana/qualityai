
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Files,
  ClipboardList,
  Settings,
  Users,
  BookOpen,
  Database,
  FileText,
  Shield,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Projects", icon: Files, path: "/projects" },
    { name: "Documents", icon: FileText, path: "/documents" },
    { name: "QMS Selection", icon: Shield, path: "/qms-selection" },
    { name: "SOP Templates", icon: ClipboardList, path: "/sop-templates" },
    { name: "RSpace Integration", icon: Database, path: "/rspace-integration" },
    { name: "Documentation", icon: BookOpen, path: "/documentation" },
    { name: "User Management", icon: Users, path: "/users" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border shadow-lg transition-transform duration-300 ease-in-out md:shadow-none md:translate-x-0 md:z-0 md:top-16",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border md:hidden">
          <h2 className="text-xl font-bold">QMS Platform</h2>
          <button onClick={closeSidebar} className="p-2 rounded-md hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)] md:h-[calc(100%-1rem)]">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md group w-full",
                isActive(item.path) 
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              onClick={() => window.innerWidth < 768 && closeSidebar()}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      
      {/* Mobile sidebar toggle */}
      <button
        className="fixed bottom-4 right-4 z-30 p-3 bg-primary text-primary-foreground rounded-full shadow-lg md:hidden"
        onClick={() => !isOpen && closeSidebar()}
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
};

export default Sidebar;
