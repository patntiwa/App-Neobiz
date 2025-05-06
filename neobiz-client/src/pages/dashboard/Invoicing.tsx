import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Plus, FileText, FileCheck, Clock, AlertTriangle, FileSpreadsheet, FileDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { fetchInvoices, fetchInvoiceStats } from "@/services/invoiceService";

const InvoicingPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [invoices, setInvoices] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        console.error("Erreur lors du chargement des factures :", error);
      }
    };

    loadInvoices();
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await fetchInvoiceStats();
        console.log("Invoice Stats:", stats);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques des factures :", error);
      }
    };

    loadStats();
  }, []);

  const filteredInvoices = activeTab === 'all' 
    ? invoices 
    : invoices.filter(invoice => invoice.status === activeTab);

  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'paid':
        return { 
          label: 'Payée', 
          className: 'bg-green-100 text-green-800',
          icon: <FileCheck className="w-4 h-4" />
        };
      case 'pending':
        return { 
          label: 'En attente', 
          className: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="w-4 h-4" />
        };
      case 'overdue':
        return { 
          label: 'En retard', 
          className: 'bg-red-100 text-red-800',
          icon: <AlertTriangle className="w-4 h-4" />
        };
      default:
        return { 
          label: status, 
          className: 'bg-gray-100 text-gray-800',
          icon: <FileText className="w-4 h-4" />
        };
    }
  };

  const handleExport = (type: string) => {
    toast({
      title: `Exportation en ${type}`,
      description: `Les factures ont été exportées au format ${type}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des factures</h1>
            <p className="text-muted-foreground mt-1">Créez, suivez et gérez vos factures</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <div className="dropdown-menu flex gap-2">
              <Button variant="outline" onClick={() => handleExport('pdf')} className="gap-2">
                <FileDown className="w-4 h-4" />
                <span className="hidden sm:inline">Exporter en PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
              <Button variant="outline" onClick={() => handleExport('excel')} className="gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span className="hidden sm:inline">Exporter en Excel</span>
                <span className="sm:hidden">Excel</span>
              </Button>
            </div>
            <Button className="flex gap-2 items-center" onClick={() => navigate('/dashboard/create-invoice')}>
              <Plus className="w-4 h-4" />
              <span>Nouvelle facture</span>
            </Button>
          </div>
        </div>

        {/* Rappels automatiques */}
        <Card className="mb-6 animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rappels automatiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-sm">Premier rappel</p>
                  <p className="text-xs text-muted-foreground">7 jours après échéance</p>
                </div>
                <Button variant="outline" size="sm">Modifier</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-sm">Second rappel</p>
                  <p className="text-xs text-muted-foreground">14 jours après échéance</p>
                </div>
                <Button variant="outline" size="sm">Modifier</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-sm">Rappel final</p>
                  <p className="text-xs text-muted-foreground">30 jours après échéance</p>
                </div>
                <Button variant="outline" size="sm">Modifier</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="paid">Payées</TabsTrigger>
            <TabsTrigger value="overdue">En retard</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {activeTab === 'all' ? 'Toutes les factures' : 
               activeTab === 'pending' ? 'Factures en attente' :
               activeTab === 'paid' ? 'Factures payées' : 'Factures en retard'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Facture</TableHead>
                    <TableHead className="hidden md:table-cell">Client</TableHead>
                    <TableHead className="hidden md:table-cell">Date d'émission</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead className="text-center">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => {
                    const statusInfo = getStatusInfo(invoice.status);
                    return (
                      <TableRow key={invoice.id} className="hover:bg-gray-50/50 cursor-pointer" onClick={() => navigate(`/dashboard/invoices/${invoice.id}`)}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell className="hidden md:table-cell">{invoice.client}</TableCell>
                        <TableCell className="hidden md:table-cell">{invoice.date}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell className="text-right">{invoice.amount}</TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}>
                              {statusInfo.icon}
                              {statusInfo.label}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 mt-6 md:grid-cols-2 xl:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Factures payées</span>
                    <span className="font-medium">8,350 €</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>En attente</span>
                    <span className="font-medium">2,720 €</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>En retard</span>
                    <span className="font-medium">1,450 €</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Modèles de facturation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Personnalisez vos templates de factures</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-[8/11] border rounded-md p-2 flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5">
                  <div className="w-full h-2/3 bg-gray-100 mb-2 rounded"></div>
                  <p className="text-xs font-medium">Standard</p>
                </div>
                <div className="aspect-[8/11] border rounded-md p-2 flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5">
                  <div className="w-full h-2/3 bg-gray-100 mb-2 rounded"></div>
                  <p className="text-xs font-medium">Moderne</p>
                </div>
                <div className="aspect-[8/11] border rounded-md p-2 flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5">
                  <div className="w-full h-2/3 bg-gray-100 mb-2 rounded"></div>
                  <p className="text-xs font-medium">Minimaliste</p>
                </div>
                <Link to="/dashboard/invoice-templates" className="aspect-[8/11] border border-dashed rounded-md p-2 flex flex-col items-center justify-center cursor-pointer hover:border-accent">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                  <p className="text-xs font-medium mt-2">Voir tous</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvoicingPage;
