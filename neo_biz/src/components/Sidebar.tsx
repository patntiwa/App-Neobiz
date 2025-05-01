// src/components/Sidebar.tsx
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-navy dark:bg-gray-800 text-white min-h-screen p-6">
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="hover:text-turquoise">Accueil</Link>
        <Link to="/dashboard/invoices" className="hover:text-turquoise">Facturation</Link>
        <Link to="/dashboard/projects" className="hover:text-turquoise">Projets</Link>
        <Link to="/dashboard/finance" className="hover:text-turquoise">Finances</Link>
        <Link to="/dashboard/ia" className="hover:text-turquoise">Assistant IA</Link>
        <Link to="/dashboard/settings" className="hover:text-turquoise">Paramètres</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;