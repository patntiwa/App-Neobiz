
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Plus, Edit2, Trash2 } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SubscriptionsPage = () => {
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const { toast } = useToast();
  
  const plans = [
    { 
      id: 1, 
      name: 'Gratuit', 
      price: '0', 
      interval: 'month',
      features: ['5 factures par mois', 'Modèles de facture basiques', 'Support email'], 
      active: true 
    },
    { 
      id: 2, 
      name: 'Entreprise', 
      price: '29', 
      interval: 'month',
      features: ['Factures illimitées', 'Tous les modèles', 'Support prioritaire', 'Export PDF & Excel', 'Rappels automatiques'], 
      active: true 
    },
    { 
      id: 3, 
      name: 'Premium', 
      price: '49', 
      interval: 'month',
      features: ['Tout Entreprise', 'AI Assistant', 'API Accès', 'Intégrations avancées', 'Gestion multi-utilisateurs'], 
      active: true 
    }
  ];

  const [subscribers, setSubscribers] = useState([
    { id: 1, user: 'Jean Dupont', email: 'jean@example.com', plan: 'Entreprise', status: 'Actif', startDate: '01/06/2024', nextBilling: '01/07/2024' },
    { id: 2, user: 'Marie Martin', email: 'marie@example.com', plan: 'Premium', status: 'Actif', startDate: '15/05/2024', nextBilling: '15/06/2024' },
    { id: 3, user: 'Pierre Durand', email: 'pierre@example.com', plan: 'Gratuit', status: 'Inactif', startDate: '10/04/2024', nextBilling: '-' },
  ]);

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddPlanOpen(false);
    toast({
      title: "Plan ajouté",
      description: "Le nouveau plan d'abonnement a été ajouté avec succès.",
    });
  };

  const handlePublishChanges = () => {
    toast({
      title: "Modifications publiées",
      description: "Les modifications ont été publiées sur la landing page.",
    });
  };

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des abonnements</h1>
            <p className="text-muted-foreground mt-1">
              Gérez les plans d'abonnement et vos abonnés
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nouveau plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau plan</DialogTitle>
                  <DialogDescription>
                    Définissez les détails du nouveau plan d'abonnement.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSavePlan}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="plan-name" className="text-right">Nom</Label>
                      <Input id="plan-name" className="col-span-3" placeholder="Nom du plan" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="plan-price" className="text-right">Prix</Label>
                      <div className="col-span-3 flex">
                        <Input id="plan-price" type="number" min="0" step="0.01" className="rounded-r-none" placeholder="0" required />
                        <div className="flex items-center px-3 border border-l-0 rounded-r-md bg-muted">€</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="plan-interval" className="text-right">Intervalle</Label>
                      <select id="plan-interval" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="month">Mensuel</option>
                        <option value="year">Annuel</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="plan-features" className="text-right">Fonctionnalités</Label>
                      <textarea
                        id="plan-features"
                        className="col-span-3 min-h-24 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Une fonctionnalité par ligne"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button type="submit">Enregistrer</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={handlePublishChanges}>Publier les modifications</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-3xl font-bold">{plan.price}€</span>
                  <span className="text-muted-foreground mb-1">/mois</span>
                </div>
                <CardDescription>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${plan.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-sm">{plan.active ? 'Actif' : 'Inactif'}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    {plan.active ? 'Désactiver' : 'Activer'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Abonnés</CardTitle>
            <CardDescription>Liste de tous les abonnements actifs</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date de début</TableHead>
                  <TableHead>Prochaine facturation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.user}</TableCell>
                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>{subscriber.plan}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        subscriber.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {subscriber.status}
                      </span>
                    </TableCell>
                    <TableCell>{subscriber.startDate}</TableCell>
                    <TableCell>{subscriber.nextBilling}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <CreditCard className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionsPage;
