
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { MessageSquare, FileText, Search } from 'lucide-react';

const SupportPage = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?' },
  ]);
  
  const faqItems = [
    {
      question: "Comment créer une nouvelle facture ?",
      answer: "Pour créer une nouvelle facture, accédez à la section \"Facturation\" depuis votre tableau de bord, puis cliquez sur le bouton \"Nouvelle facture\" en haut à droite de l'écran. Remplissez ensuite les détails de la facture et cliquez sur \"Enregistrer\"."
    },
    {
      question: "Comment configurer des rappels automatiques pour les factures ?",
      answer: "Rendez-vous dans la section \"Facturation\", puis dans l'onglet \"Paramètres\". Vous y trouverez une option \"Rappels automatiques\" où vous pourrez configurer les délais et les modèles de messages pour les rappels."
    },
    {
      question: "Comment modifier mon profil utilisateur ?",
      answer: "Cliquez sur votre avatar en bas à gauche de l'écran, puis sélectionnez \"Paramètres\". Dans l'onglet \"Profil\", vous pourrez modifier vos informations personnelles, votre photo et vos coordonnées."
    },
    {
      question: "Comment exporter mes données financières ?",
      answer: "Dans le \"Tableau financier\", cliquez sur le bouton d'exportation (généralement représenté par une icône de téléchargement) en haut à droite du graphique ou du tableau que vous souhaitez exporter. Vous pourrez choisir le format d'exportation (PDF, CSV, Excel)."
    },
    {
      question: "Comment créer un nouveau projet ?",
      answer: "Accédez à la section \"Gestion de projets\", puis cliquez sur le bouton \"Nouveau projet\". Remplissez les détails du projet, ajoutez des membres d'équipe si nécessaire, et définissez les échéances avant de cliquer sur \"Créer\"."
    },
  ];
  
  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message to chat history
    setChatHistory([...chatHistory, { type: 'user', message: chatMessage }]);
    const userQuestion = chatMessage;
    setChatMessage('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let botResponse = "Je suis désolé, je n'ai pas de réponse spécifique à cette question. Pourriez-vous reformuler ou consulter notre documentation ?";
      
      // Simple pattern matching for common questions
      if (userQuestion.toLowerCase().includes('facture')) {
        botResponse = "Pour créer ou gérer vos factures, rendez-vous dans la section \"Facturation\" de votre tableau de bord. Vous pourrez y créer de nouvelles factures, suivre les paiements et configurer des rappels automatiques.";
      } else if (userQuestion.toLowerCase().includes('projet')) {
        botResponse = "La gestion de projets se fait depuis la section dédiée du dashboard. Vous pouvez y créer des projets, ajouter des tâches et suivre votre progression avec la vue Kanban ou le calendrier.";
      } else if (userQuestion.toLowerCase().includes('mot de passe')) {
        botResponse = "Pour changer votre mot de passe, allez dans \"Paramètres\" > \"Profil\" > \"Mot de passe\". Vous devrez entrer votre ancien mot de passe puis définir et confirmer le nouveau.";
      } else if (userQuestion.toLowerCase().includes('exporter') || userQuestion.toLowerCase().includes('export')) {
        botResponse = "L'exportation des données est disponible dans chaque section via le bouton d'export (généralement une icône de téléchargement). Vous pouvez exporter en PDF, CSV ou Excel selon vos besoins.";
      }
      
      setChatHistory(prevHistory => [...prevHistory, { type: 'bot', message: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Assistance & Support</h1>
          <p className="text-muted-foreground mt-1">Obtenez de l'aide et consultez nos ressources</p>
        </div>
        
        <Tabs defaultValue="assistant" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="assistant" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Assistant IA</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Mes tickets</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="assistant">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Assistant virtuel</CardTitle>
                <CardDescription>
                  Posez vos questions et obtenez des réponses immédiates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4 h-[400px] flex flex-col">
                  <div className="flex-1 overflow-y-auto mb-4">
                    {chatHistory.map((chat, index) => (
                      <div 
                        key={index} 
                        className={`mb-4 ${chat.type === 'user' ? 'text-right' : ''}`}
                      >
                        <div 
                          className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                            chat.type === 'user' 
                              ? 'bg-accent text-white' 
                              : 'bg-gray-100'
                          }`}
                        >
                          {chat.message}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="mb-4">
                        <div className="inline-block rounded-lg px-4 py-2 bg-gray-100">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      value={chatMessage} 
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Tapez votre message ici..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>Envoyer</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <span>Propulsé par l'IA</span>
                <Button variant="link" size="sm" className="p-0">Contacter le support humain</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Questions fréquemment posées</CardTitle>
                <CardDescription>
                  Réponses aux questions les plus courantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input 
                    placeholder="Rechercher dans la FAQ..." 
                    className="mb-6"
                  />
                </div>
                
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <details key={index} className="group">
                      <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-4 py-3 font-medium hover:bg-gray-100">
                        {item.question}
                        <svg 
                          className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="mt-2 px-4 text-muted-foreground">
                        <p>{item.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Vous ne trouvez pas votre réponse ? <Button variant="link" className="p-0">Consultez notre documentation</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="tickets">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Mes demandes de support</CardTitle>
                    <CardDescription>
                      Historique et suivi de vos tickets
                    </CardDescription>
                  </div>
                  <Button>Nouveau ticket</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4 border-b bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">En cours</div>
                        <h3 className="font-medium">Problème avec l'exportation de données</h3>
                      </div>
                      <div className="text-sm text-muted-foreground">Il y a 2 jours</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Ticket #2023-042 • Dernière réponse: Hier à 14:30
                    </div>
                  </div>
                  
                  <div className="p-4 border-b bg-white hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Résolu</div>
                        <h3 className="font-medium">Erreur lors de la création d'une facture</h3>
                      </div>
                      <div className="text-sm text-muted-foreground">Il y a 1 semaine</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Ticket #2023-039 • Fermé le 18/07/2024
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Résolu</div>
                        <h3 className="font-medium">Question sur l'intégration avec Slack</h3>
                      </div>
                      <div className="text-sm text-muted-foreground">Il y a 2 semaines</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Ticket #2023-035 • Fermé le 12/07/2024
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Nous contacter</CardTitle>
                <CardDescription>
                  Envoyez un message à notre équipe de support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Sujet</Label>
                    <Input id="subject" placeholder="Résumez votre problème" />
                  </div>
                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <select className="w-full h-10 px-3 py-2 border rounded-md">
                      <option value="">Sélectionnez une catégorie</option>
                      <option value="billing">Facturation</option>
                      <option value="technical">Problème technique</option>
                      <option value="account">Gestion de compte</option>
                      <option value="feature">Suggestion de fonctionnalité</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Décrivez votre problème en détail" 
                      rows={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="attachments">Pièces jointes (optionnel)</Label>
                    <Input id="attachments" type="file" />
                  </div>
                  <Button type="submit" className="w-full">Envoyer la demande</Button>
                </form>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Délai de réponse habituel: moins de 24 heures ouvrées
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SupportPage;
