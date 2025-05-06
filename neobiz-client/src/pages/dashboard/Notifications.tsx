
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Bell, FileText, Calendar, Users, Settings, FileCheck, AlertTriangle, Clock, MessageSquare } from 'lucide-react';

const NotificationsPage = () => {
  const allNotifications = [
    {
      id: 1,
      type: 'payment',
      title: 'Paiement reçu',
      message: 'Facture #2023-056 payée par Dupont SAS (1,200.00 €)',
      date: 'Il y a 2 heures',
      read: false,
      icon: <FileCheck className="w-4 h-4 text-green-500" />
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Échéance facture',
      message: 'La facture #2023-062 pour Tech Solutions arrivera à échéance dans 3 jours',
      date: 'Aujourd\'hui à 9:30',
      read: false,
      icon: <Clock className="w-4 h-4 text-yellow-500" />
    },
    {
      id: 3,
      type: 'system',
      title: 'Maintenance système',
      message: 'Une maintenance système est prévue demain de 2h à 4h du matin',
      date: 'Hier à 15:40',
      read: true,
      icon: <Settings className="w-4 h-4 text-blue-500" />
    },
    {
      id: 4,
      type: 'payment',
      title: 'Paiement en retard',
      message: 'Facture #2023-048 en retard de 7 jours (Martin & Associés)',
      date: '23 Juil, 2024',
      read: true,
      icon: <AlertTriangle className="w-4 h-4 text-red-500" />
    },
    {
      id: 5,
      type: 'project',
      title: 'Échéance projet',
      message: 'Le projet "Refonte site web" atteindra sa date d\'échéance dans 5 jours',
      date: '22 Juil, 2024',
      read: true,
      icon: <Calendar className="w-4 h-4 text-purple-500" />
    },
    {
      id: 6,
      type: 'system',
      title: 'Nouvelle fonctionnalité',
      message: 'Découvrez notre nouvelle fonctionnalité de prévision de trésorerie',
      date: '20 Juil, 2024',
      read: true,
      icon: <Bell className="w-4 h-4 text-blue-500" />
    },
    {
      id: 7,
      type: 'client',
      title: 'Nouveau message',
      message: 'Sophie Moreau a laissé un commentaire sur le projet "Développement app"',
      date: '19 Juil, 2024',
      read: true,
      icon: <MessageSquare className="w-4 h-4 text-green-500" />
    },
    {
      id: 8,
      type: 'client',
      title: 'Nouveau client',
      message: 'Global Services a été ajouté à votre liste de clients',
      date: '17 Juil, 2024',
      read: true,
      icon: <Users className="w-4 h-4 text-blue-500" />
    }
  ];
  
  const filterNotifications = (type: string | null) => {
    if (!type) return allNotifications;
    return allNotifications.filter(notification => notification.type === type);
  };
  
  const unreadCount = allNotifications.filter(n => !n.read).length;

  const renderNotification = (notification: any) => (
    <div 
      key={notification.id}
      className={`p-4 border-b last:border-0 ${notification.read ? '' : 'bg-accent/5'}`}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-1">{notification.icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`font-medium ${!notification.read ? 'text-accent' : ''}`}>{notification.title}</h3>
            <span className="text-xs text-muted-foreground">{notification.date}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount 
                ? `Vous avez ${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}` 
                : 'Toutes vos notifications sont lues'}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline">Marquer tout comme lu</Button>
            <Button variant="outline">Paramètres</Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Toutes
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Paiements
            </TabsTrigger>
            <TabsTrigger value="client" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="project" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Projets
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Système
            </TabsTrigger>
          </TabsList>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-0">
              <CardTitle>
                <div className="flex justify-between items-center">
                  <span className="text-lg">
                    <TabsContent value="all">Toutes les notifications</TabsContent>
                    <TabsContent value="payment">Notifications de paiement</TabsContent>
                    <TabsContent value="client">Notifications client</TabsContent>
                    <TabsContent value="project">Notifications projet</TabsContent>
                    <TabsContent value="system">Notifications système</TabsContent>
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TabsContent value="all" className="border-t mt-4">
                {filterNotifications(null).map(renderNotification)}
              </TabsContent>
              
              <TabsContent value="payment" className="border-t mt-4">
                {filterNotifications('payment').length > 0 
                  ? filterNotifications('payment').map(renderNotification) 
                  : <div className="p-6 text-center text-muted-foreground">Aucune notification de paiement</div>
                }
              </TabsContent>
              
              <TabsContent value="client" className="border-t mt-4">
                {filterNotifications('client').length > 0 
                  ? filterNotifications('client').map(renderNotification) 
                  : <div className="p-6 text-center text-muted-foreground">Aucune notification client</div>
                }
              </TabsContent>
              
              <TabsContent value="project" className="border-t mt-4">
                {filterNotifications('project').length > 0 
                  ? filterNotifications('project').map(renderNotification) 
                  : <div className="p-6 text-center text-muted-foreground">Aucune notification projet</div>
                }
              </TabsContent>
              
              <TabsContent value="system" className="border-t mt-4">
                {filterNotifications('system').length > 0 
                  ? filterNotifications('system').map(renderNotification) 
                  : <div className="p-6 text-center text-muted-foreground">Aucune notification système</div>
                }
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
        
        <div className="mt-6">
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Suggestions IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-accent/5 flex items-start">
                  <div className="mr-4 p-2 bg-accent/10 rounded-full">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Relancer le paiement de la facture #2023-048</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Cette facture est en retard de 7 jours. Envoyez un rappel pour accélérer le paiement.
                    </p>
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="mr-2">Ignorer</Button>
                      <Button size="sm">Envoyer un rappel</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md bg-accent/5 flex items-start">
                  <div className="mr-4 p-2 bg-accent/10 rounded-full">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Planifier une réunion d'avancement pour le projet "Refonte site web"</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ce projet approche de sa date d'échéance. Une réunion pourrait aider à confirmer que tout est en bonne voie.
                    </p>
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="mr-2">Plus tard</Button>
                      <Button size="sm">Planifier</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md bg-accent/5 flex items-start">
                  <div className="mr-4 p-2 bg-accent/10 rounded-full">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Suivre avec le nouveau client Global Services</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Vous n'avez pas eu d'interaction avec ce client depuis son ajout il y a une semaine. Un suivi pourrait être approprié.
                    </p>
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="mr-2">Ignorer</Button>
                      <Button size="sm">Envoyer un email</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
