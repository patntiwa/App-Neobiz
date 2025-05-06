
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChartCard, { ChartDataPoint } from '@/components/dashboard/ChartCard';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';

const FinancialDashboardPage = () => {
  // Sample data for charts
  const monthlyRevenueData: ChartDataPoint[] = [
    { name: 'Jan', value: 4500 },
    { name: 'Fév', value: 5200 },
    { name: 'Mar', value: 4800 },
    { name: 'Avr', value: 6300 },
    { name: 'Mai', value: 5700 },
    { name: 'Juin', value: 7800 },
    { name: 'Juil', value: 8300 },
  ];

  const monthlyExpensesData: ChartDataPoint[] = [
    { name: 'Jan', value: 2800 },
    { name: 'Fév', value: 3200 },
    { name: 'Mar', value: 3100 },
    { name: 'Avr', value: 3500 },
    { name: 'Mai', value: 2900 },
    { name: 'Juin', value: 3700 },
    { name: 'Juil', value: 3400 },
  ];

  const cashFlowData: ChartDataPoint[] = [
    { name: 'Jan', value: 1700 },
    { name: 'Fév', value: 2000 },
    { name: 'Mar', value: 1700 },
    { name: 'Avr', value: 2800 },
    { name: 'Mai', value: 2800 },
    { name: 'Juin', value: 4100 },
    { name: 'Juil', value: 4900 },
  ];

  // Sample data for revenue breakdown
  const revenueBreakdown = [
    { category: 'Services de conseil', amount: 4200, percentage: 50.6 },
    { category: 'Développement web', amount: 2700, percentage: 32.5 },
    { category: 'Maintenance', amount: 850, percentage: 10.2 },
    { category: 'Formation', amount: 550, percentage: 6.7 },
  ];

  // Sample data for expenses breakdown
  const expensesBreakdown = [
    { category: 'Salaires', amount: 1800, percentage: 52.9 },
    { category: 'Location bureau', amount: 800, percentage: 23.5 },
    { category: 'Marketing', amount: 450, percentage: 13.2 },
    { category: 'Logiciels', amount: 350, percentage: 10.4 },
  ];

  // Sample data for upcoming payments
  const upcomingPayments = [
    { id: 'INV-2023-058', client: 'Dupont SAS', dueDate: '02 Août, 2024', amount: '1,800.00 €', status: 'pending' },
    { id: 'INV-2023-062', client: 'Tech Solutions', dueDate: '05 Août, 2024', amount: '2,400.00 €', status: 'pending' },
    { id: 'INV-2023-064', client: 'Creative Design', dueDate: '10 Août, 2024', amount: '950.00 €', status: 'pending' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'paid': return 'Payée';
      case 'pending': return 'En attente';
      case 'overdue': return 'En retard';
      default: return status;
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tableau financier</h1>
            <p className="text-muted-foreground mt-1">Analyse des revenus et dépenses</p>
          </div>
          <Tabs defaultValue="monthly" className="w-[300px] md:w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monthly">Mensuel</TabsTrigger>
              <TabsTrigger value="quarterly">Trimestriel</TabsTrigger>
              <TabsTrigger value="yearly">Annuel</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Chiffre d'affaires (Juil)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,350 €</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="inline-flex items-center text-green-600">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +7.2% par rapport à juin
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Dépenses (Juil)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,400 €</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="inline-flex items-center text-red-600">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  +8.1% par rapport à juin
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Bénéfice net (Juil)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,950 €</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="inline-flex items-center text-green-600">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +6.5% par rapport à juin
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Prévision (Août)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9,100 €</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="inline-flex items-center text-green-600">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +9.0% par rapport à juillet
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 mt-6 md:grid-cols-2">
          <ChartCard 
            title="Revenus mensuels (€)" 
            data={monthlyRevenueData} 
            type="bar"
            colors={{ fill: "rgba(34, 197, 94, 0.6)", stroke: "#22c55e" }}
          />
          <ChartCard 
            title="Dépenses mensuelles (€)" 
            data={monthlyExpensesData}
            colors={{ fill: "rgba(239, 68, 68, 0.6)", stroke: "#ef4444" }}
          />
        </div>

        <div className="mt-6">
          <ChartCard 
            title="Flux de trésorerie (€)" 
            data={cashFlowData}
            colors={{ stroke: "#3b82f6", fill: "rgba(59, 130, 246, 0.1)" }}
          />
        </div>

        {/* Breakdown & Upcoming Payments */}
        <div className="grid gap-6 mt-6 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow duration-300 md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Répartition des revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueBreakdown.map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{item.category}</span>
                      <span className="text-sm font-medium">{item.amount} €</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right text-muted-foreground mt-1">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-300 md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Répartition des dépenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expensesBreakdown.map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{item.category}</span>
                      <span className="text-sm font-medium">{item.amount} €</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right text-muted-foreground mt-1">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-300 md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Paiements à venir</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facture</TableHead>
                    <TableHead className="hidden md:table-cell">Client</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingPayments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell className="hidden md:table-cell">{payment.client}</TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell className="text-right">{payment.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Financial Alerts */}
        <Card className="hover:shadow-md transition-shadow duration-300 mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Alertes financières</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
                <div className="p-2 bg-yellow-100 rounded-full mr-4">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">TVA à payer avant le 15 août</h4>
                  <p className="text-sm text-muted-foreground mt-1">Montant estimé : 1,250 €</p>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                <div className="p-2 bg-green-100 rounded-full mr-4">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Objectif trimestriel presque atteint</h4>
                  <p className="text-sm text-muted-foreground mt-1">18,300 € sur 20,000 € (91.5%)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FinancialDashboardPage;
