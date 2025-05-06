
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SettingsPage = () => {
  const [theme, setTheme] = useState('light');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [browserNotifications, setBrowserNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground mt-1">Gérez votre compte et vos préférences</p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Informations de profil</CardTitle>
                <CardDescription>Modifiez vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-4">
                      Changer la photo
                    </Button>
                  </div>
                  
                  <div className="md:w-3/4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" defaultValue="Jean" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" defaultValue="Dupont" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="jean.dupont@example.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" defaultValue="+33 6 12 34 56 78" />
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Entreprise</Label>
                      <Input id="company" defaultValue="Dupont Consulting" />
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Biographie</Label>
                      <Textarea 
                        id="bio" 
                        defaultValue="Consultant freelance spécialisé en développement web et stratégie digitale. Plus de 10 ans d'expérience dans le secteur des technologies."
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Enregistrer les modifications</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Mot de passe</CardTitle>
                <CardDescription>Changez votre mot de passe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmez le mot de passe</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Mettre à jour le mot de passe</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Thème</CardTitle>
                <CardDescription>Personnalisez l'apparence de l'interface</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${theme === 'light' ? 'border-accent' : 'border-gray-200'}`}
                        onClick={() => setTheme('light')}
                      >
                        <div className="h-20 bg-white rounded-md border mb-3"></div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Clair</span>
                          {theme === 'light' && (
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${theme === 'dark' ? 'border-accent' : 'border-gray-200'}`}
                        onClick={() => setTheme('dark')}
                      >
                        <div className="h-20 bg-gray-900 rounded-md mb-3"></div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Sombre</span>
                          {theme === 'dark' && (
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Accent de couleur</h3>
                    <div className="flex flex-wrap gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer border-2 border-purple-500"></div>
                      <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer"></div>
                      <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer"></div>
                      <div className="w-8 h-8 bg-yellow-500 rounded-full cursor-pointer"></div>
                      <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer"></div>
                      <div className="w-8 h-8 bg-pink-500 rounded-full cursor-pointer"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Disposition du tableau de bord</CardTitle>
                <CardDescription>Personnalisez votre espace de travail</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Affichage compact</div>
                      <div className="text-sm text-muted-foreground">Réduire l'espacement entre les éléments</div>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Afficher les statistiques</div>
                      <div className="text-sm text-muted-foreground">Afficher les cartes de statistiques en haut du tableau de bord</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Afficher les activités récentes</div>
                      <div className="text-sm text-muted-foreground">Afficher la liste des activités récentes</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Préférences de notifications</CardTitle>
                <CardDescription>Gérez comment et quand vous recevez des notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Canaux de notification</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Email</div>
                          <div className="text-sm text-muted-foreground">Recevoir des notifications par email</div>
                        </div>
                        <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Navigateur</div>
                          <div className="text-sm text-muted-foreground">Afficher des notifications dans le navigateur</div>
                        </div>
                        <Switch checked={browserNotifications} onCheckedChange={setBrowserNotifications} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">SMS</div>
                          <div className="text-sm text-muted-foreground">Recevoir des notifications par SMS</div>
                        </div>
                        <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Types de notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Paiements reçus</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Factures en retard</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Nouveaux commentaires</div>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Échéances de projets</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Mises à jour système</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Rapports périodiques</CardTitle>
                <CardDescription>Configurez les rapports réguliers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Rapport hebdomadaire</div>
                      <div className="text-sm text-muted-foreground">Résumé des activités de la semaine</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Rapport mensuel</div>
                      <div className="text-sm text-muted-foreground">Analyse financière mensuelle</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Alertes de trésorerie</div>
                      <div className="text-sm text-muted-foreground">Notification en cas de seuil critique</div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
