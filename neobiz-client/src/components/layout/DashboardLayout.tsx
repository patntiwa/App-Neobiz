import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { X, Menu, ChevronRight, ChevronLeft, Bell, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { adminNavItems, userNavItems } from '@/config/navigationItems';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  isAdmin = false 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { currentUser, logout } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  React.useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const navItems = isAdmin ? adminNavItems : userNavItems;

  const notifications = [
    { id: 1, message: "Nouvelle facture créée", time: "Il y a 5 min" },
    { id: 2, message: "Paiement reçu pour facture #2023-056", time: "Il y a 2h" },
    { id: 3, message: "Rappel: Échéance de facture dans 3 jours", time: "Il y a 1 jour" },
    { id: 4, message: isAdmin ? "Nouvel utilisateur inscrit" : "Votre abonnement sera renouvelé dans 7 jours", time: "Il y a 2 jours" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50/90">
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <aside 
        className={cn(
          "bg-white border-r border-gray-200 md:relative fixed inset-y-0 left-0 z-50 w-72 transition-transform transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        )}
      >
        <div className={cn(
          "flex items-center justify-between py-5",
          isSidebarOpen ? "px-6" : "px-2 justify-center"
        )}>
          {isSidebarOpen ? (
            <Link to="/" className="flex items-center">
              <span className="text-primary font-heading text-2xl font-bold">
                Neo<span className="text-accent">Biz</span>
              </span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center justify-center">
              <span className="text-primary font-heading text-xl font-bold">N</span>
            </Link>
          )}
          
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none hidden md:flex"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
          
          {isMobile && (
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none md:hidden"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        <nav className="px-2 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center py-3 px-4 rounded-lg transition-all",
                      isActive 
                        ? "bg-accent/10 text-accent" 
                        : "text-gray-600 hover:text-accent hover:bg-accent/5",
                      !isSidebarOpen && "justify-center px-2"
                    )}
                  >
                    <span className="flex-shrink-0">
                      <Icon size={20} />
                    </span>
                    {isSidebarOpen && (
                      <span className="ml-3 transition-opacity duration-300">{item.title}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-4",
          !isSidebarOpen && "flex justify-center"
        )}>
          <div className={cn(
            "flex items-center",
            !isSidebarOpen && "justify-center"
          )}>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
              U
            </div>
            {isSidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Utilisateur</p>
                <Link to="/login" className="text-xs text-gray-500 hover:text-accent">
                  Se déconnecter
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
      
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
                    {notifications.length}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100 text-center">
                  <Link to={isAdmin ? "/admin/notifications" : "/dashboard/notifications"} className="text-xs text-accent hover:underline">
                    Voir toutes les notifications
                  </Link>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative gap-2">
                  <span className="hidden sm:inline-block">{currentUser?.name || 'Utilisateur'}</span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">{(currentUser?.name || 'U').charAt(0)}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.href = '/dashboard/settings'}>
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
