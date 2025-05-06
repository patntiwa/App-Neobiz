
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import ChartCard, { ChartDataPoint } from '@/components/dashboard/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';

const Dashboard = () => {
  // Sample data for charts
  const salesData: ChartDataPoint[] = [
    { name: 'Jan', value: 1200 },
    { name: 'Fév', value: 1900 },
    { name: 'Mar', value: 1500 },
    { name: 'Avr', value: 2400 },
    { name: 'Mai', value: 1700 },
    { name: 'Juin', value: 2800 },
    { name: 'Juil', value: 3100 },
  ];

  const conversionData: ChartDataPoint[] = [
    { name: 'Jan', value: 35 },
    { name: 'Fév', value: 42 },
    { name: 'Mar', value: 39 },
    { name: 'Avr', value: 53 },
    { name: 'Mai', value: 48 },
    { name: 'Juin', value: 62 },
    { name: 'Juil', value: 67 },
  ];
  
  // Sample data for recent activities
  const recentActivities = [
    { 
      id: 1, 
      title: 'Facture #2023-056 payée', 
      timestamp: 'Il y a 2 heures', 
      status: 'completed' as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M12 22V8"/><path d="m5 12-2-2 2-2"/><path d="m19 12 2-2-2-2"/><path d="M5 10h14"/><path d="m15 19-3 3-3-3"/></svg>
      ) 
    },
    { 
      id: 2, 
      title: 'Nouveau projet créé: Site e-commerce', 
      timestamp: 'Hier à 15:32', 
      status: 'completed' as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2Z"/></svg>
      )
    },
    { 
      id: 3, 
      title: 'Réunion client: Présentation prototype', 
      timestamp: '23 Juin, 2024', 
      status: 'pending' as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      )
    },
    { 
      id: 4, 
      title: 'Mise à jour du forfait vers Business', 
      timestamp: '20 Juin, 2024', 
      status: 'completed' as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
      )
    },
    { 
      id: 5, 
      title: 'Échec de paiement: Facture #2023-042', 
      timestamp: '18 Juin, 2024', 
      status: 'failed' as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
      )
    },
  ];

  // Sample data for invoices
  const invoices = [
    { id: 'INV-2023-001', client: 'Dupont SAS', date: '07 Juil, 2024', amount: '1,200.00 €', status: 'Payée' },
    { id: 'INV-2023-002', client: 'Martin & Associés', date: '05 Juil, 2024', amount: '850.00 €', status: 'En attente' },
    { id: 'INV-2023-003', client: 'Tech Solutions', date: '02 Juil, 2024', amount: '3,450.00 €', status: 'Payée' },
    { id: 'INV-2023-004', client: 'Creative Design', date: '30 Juin, 2024', amount: '720.00 €', status: 'En attente' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Payée': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'En retard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="grid gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <h2 className="text-3xl font-bold tracking-tight flex-1">
            Bienvenue, Jean 👋
          </h2>
          <p className="text-sm text-muted-foreground">
            Dernière connexion: Aujourd'hui à 09:42
          </p>
        </div>
        
        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Chiffre d'affaires"
            value="8,350 €"
            trend={{ value: 12.5, isPositive: true }}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>}
          />
          <StatCard 
            title="Projets actifs"
            value="12"
            trend={{ value: 8.1, isPositive: true }}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2Z"/></svg>}
            gradientColors="from-blue-500/5 to-blue-500/10"
          />
          <StatCard 
            title="Factures impayées"
            value="3"
            trend={{ value: 2.4, isPositive: false }}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2Z"/><path d="M2 10h20"/></svg>}
            gradientColors="from-yellow-500/5 to-yellow-500/10"
          />
          <StatCard 
            title="Nouveaux clients"
            value="8"
            trend={{ value: 22.5, isPositive: true }}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>}
            gradientColors="from-green-500/5 to-green-500/10"
          />
        </div>
        
        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <ChartCard 
            title="Chiffre d'affaires mensuel" 
            data={salesData} 
            type="bar"
            colors={{ fill: "rgba(139, 92, 246, 0.6)", stroke: "#8B5CF6" }}
          />
          <ChartCard 
            title="Taux de conversion (%)" 
            data={conversionData}
            colors={{ stroke: "#0EA5E9", fill: "rgba(14, 165, 233, 0.1)" }}
          />
        </div>
        
        {/* Recent Activity and Invoices */}
        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivityCard activities={recentActivities} />
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Dernières factures</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facture</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead className="text-center">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell className="hidden md:table-cell">{invoice.date}</TableCell>
                      <TableCell className="text-right">{invoice.amount}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
