import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages publiques
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import Blog from "./pages/Blog";

// Pages Dashboard utilisateur
import Dashboard from "./pages/Dashboard";
import Invoicing from "./pages/dashboard/Invoicing";
import CreateInvoice from "./pages/dashboard/CreateInvoice";
import InvoiceTemplates from "./pages/dashboard/InvoiceTemplates";
import AIAssistant from "./pages/dashboard/AIAssistant";
import DocumentBuilder from "./pages/dashboard/DocumentBuilder";
import Projects from "./pages/dashboard/Projects";
import FinancialDashboard from "./pages/dashboard/FinancialDashboard";
import Settings from "./pages/dashboard/Settings";
import Support from "./pages/dashboard/Support";
import Notifications from "./pages/dashboard/Notifications";

// Pages Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/admin/Users";
import AdminStatistics from "./pages/admin/Statistics";
import AdminSettings from "./pages/admin/Settings";
import AdminSubscriptions from "./pages/admin/Subscriptions";
import AdminBlog from "./pages/admin/Blog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
          <Route path="/blog" element={<Blog />} />

          {/* Routes protégées pour les utilisateurs standard */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/invoices" element={<Invoicing />} />
            <Route path="/dashboard/create-invoice" element={<CreateInvoice />} />
            <Route path="/dashboard/invoice-templates" element={<InvoiceTemplates />} />
            <Route path="/dashboard/ai-assistant" element={<AIAssistant />} />
            <Route path="/dashboard/document-builder" element={<DocumentBuilder />} />
            <Route path="/dashboard/projects" element={<Projects />} />
            <Route path="/dashboard/finances" element={<FinancialDashboard />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/support" element={<Support />} />
            <Route path="/dashboard/notifications" element={<Notifications />} />
          </Route>

          {/* Routes protégées pour les administrateurs */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/statistics" element={<AdminStatistics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
          </Route>

          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
