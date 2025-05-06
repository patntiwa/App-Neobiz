import { LucideIcon, LayoutDashboard, FileText, Users, BarChart, Mail, Link, Settings, CreditCard, BookOpen, FileSpreadsheet, Book, File, Contact, Folder } from 'lucide-react';

export interface NavigationItem {
  title: string;
  path: string;
  icon: LucideIcon;
  submenu?: NavigationItem[];
}

export const adminNavItems: NavigationItem[] = [
  { 
    title: "Tableau de bord", 
    path: "/admin/dashboard",
    icon: LayoutDashboard
  },
  { 
    title: "Utilisateurs", 
    path: "/admin/users",
    icon: Users
  },
  { 
    title: "Statistiques", 
    path: "/admin/statistics",
    icon: BarChart
  },
  { 
    title: "Abonnements", 
    path: "/admin/subscriptions",
    icon: CreditCard
  },
  { 
    title: "Blog", 
    path: "/admin/blog",
    icon: Book
  },
  { 
    title: "Paramètres", 
    path: "/admin/settings",
    icon: Settings
  },
];

export const userNavItems: NavigationItem[] = [
  { 
    title: "Tableau de bord", 
    path: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Factures",
    path: "/dashboard/invoices",
    icon: FileText
  },
  {
    title: "Documents",
    path: "/dashboard/documents",
    icon: File,
    submenu: [
      {
        title: "Contrats",
        path: "/dashboard/documents/contracts",
        icon: Contact
      },
      {
        title: "Offres de service",
        path: "/dashboard/documents/offers",
        icon: FileText
      }
    ]
  },
  { 
    title: "AI Assistant", 
    path: "/dashboard/ai-assistant",
    icon: FileText
  },
  { 
    title: "Projets", 
    path: "/dashboard/projects",
    icon: Link
  },
  { 
    title: "Finances", 
    path: "/dashboard/finances",
    icon: BarChart
  },
  { 
    title: "Support", 
    path: "/dashboard/support",
    icon: Mail
  },
  { 
    title: "Notifications", 
    path: "/dashboard/notifications",
    icon: Mail
  },
  { 
    title: "Paramètres", 
    path: "/dashboard/settings",
    icon: Settings
  },
];
