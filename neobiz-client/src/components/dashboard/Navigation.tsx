
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/config/navigationItems';
import { ChevronDown } from 'lucide-react';

interface NavigationProps {
  items: NavigationItem[];
  isSidebarOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ items, isSidebarOpen }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedItems.includes(item.path);

    return (
      <li key={item.path}>
        <div className="relative">
          <Link
            to={hasSubmenu ? "#" : item.path}
            onClick={hasSubmenu ? () => toggleSubmenu(item.path) : undefined}
            className={cn(
              "flex items-center py-3 px-4 rounded-lg transition-all",
              isActive 
                ? "bg-accent/10 text-accent" 
                : "text-gray-600 hover:text-accent hover:bg-accent/5",
              !isSidebarOpen && "justify-center px-2",
              level > 0 && "ml-4"
            )}
          >
            <span className="flex-shrink-0">
              <Icon size={20} />
            </span>
            {isSidebarOpen && (
              <>
                <span className="ml-3 transition-opacity duration-300">{item.title}</span>
                {hasSubmenu && (
                  <ChevronDown 
                    className={cn(
                      "ml-auto h-4 w-4 transition-transform",
                      isExpanded && "transform rotate-180"
                    )} 
                  />
                )}
              </>
            )}
          </Link>
        </div>
        {hasSubmenu && isExpanded && isSidebarOpen && (
          <ul className="mt-1 space-y-1">
            {item.submenu.map(subItem => renderNavigationItem(subItem, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className="space-y-2">
      {items.map(item => renderNavigationItem(item))}
    </ul>
  );
};

export default Navigation;
