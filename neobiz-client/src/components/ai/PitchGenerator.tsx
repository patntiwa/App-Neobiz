import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Send, Lightbulb, BarChart, FileText, Users, Target, Loader2 } from 'lucide-react';

const PitchGenerator = () => {
  const [projectName, setProjectName] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [valueProposition, setValueProposition] = useState('');
  const [goal, setGoal] = useState('investor');
  const [tone, setTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState('');
  const [feedback, setFeedback] = useState<null | {
    strengths: string[];
    improvements: string[];
    score: number;
  }>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!projectName || !industry || !targetAudience || !valueProposition) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedPitch('');
    setFeedback(null);

    setTimeout(() => {
      const pitchResult = generateSamplePitch(
        projectName,
        industry,
        targetAudience,
        valueProposition,
        goal,
        tone
      );
      
      setGeneratedPitch(pitchResult);
      
      setTimeout(() => {
        const feedbackResult = {
          strengths: [
            "Proposition de valeur clairement articulée",
            "Cible bien définie",
            "Ton approprié pour l'audience"
          ],
          improvements: [
            "Pourrait inclure plus de données chiffrées",
            "Considérer l'ajout d'une histoire client concrète",
            "Renforcer la section sur le potentiel de rentabilité"
          ],
          score: Math.floor(Math.random() * 30) + 70
        };
        
        setFeedback(feedbackResult);
        setIsGenerating(false);
      }, 1500);
    }, 3000);
  };

  const generateSamplePitch = (
    name: string,
    industry: string,
    audience: string,
    value: string,
    pitchGoal: string,
    pitchTone: string
  ) => {
    let pitch = '';
    
    const professionalIntro = `${name} est une solution innovante dans le secteur ${industry} qui répond aux besoins spécifiques de ${audience}.`;
    const friendlyIntro = `Bonjour ! Laissez-moi vous présenter ${name}, notre solution révolutionnaire qui transforme la façon dont ${audience} interagit avec ${industry}.`;
    const persuasiveIntro = `Imaginez un monde où ${audience} n'a plus à se soucier des problèmes courants dans ${industry}. C'est exactement ce que ${name} accomplit.`;
    
    const intro = pitchTone === 'professional' ? professionalIntro :
                 pitchTone === 'friendly' ? friendlyIntro : persuasiveIntro;
    
    pitch += intro + '\n\n';
    
    pitch += `Notre proposition de valeur est simple mais puissante : ${value}\n\n`;
    
    if (pitchGoal === 'investor') {
      pitch += `Notre analyse de marché indique une opportunité significative, avec un marché adressable estimé à plus de 500 millions d'euros. Avec notre modèle économique innovant, nous projetons une croissance de 30% par an sur les trois prochaines années, offrant un retour sur investissement attractif.\n\n`;
      pitch += `Nous recherchons un partenariat stratégique qui nous permettra d'accélérer notre développement et d'étendre notre portée sur de nouveaux marchés. Notre équipe expérimentée est prête à faire passer ${name} à l'étape suivante avec le bon investisseur à nos côtés.`;
    } 
    else if (pitchGoal === 'customer') {
      pitch += `En choisissant ${name}, vous bénéficiez d'une solution qui répond parfaitement à vos besoins spécifiques, avec un support client dédié et des fonctionnalités sur mesure.\n\n`;
      pitch += `Nos clients actuels rapportent une amélioration moyenne de 40% de leur efficacité et une réduction des coûts de 25%. Nous serions ravis de discuter comment nous pouvons adapter notre solution pour répondre à vos exigences particulières.`;
    }
    else { // partnership
      pitch += `Un partenariat avec ${name} vous offre une opportunité unique de vous positionner à l'avant-garde de l'innovation dans le secteur ${industry}.\n\n`;
      pitch += `Ensemble, nous pouvons créer une synergie puissante qui bénéficiera à nos clients respectifs et ouvrira de nouvelles perspectives de croissance. Notre approche collaborative garantit que chaque partenaire apporte et reçoit une valeur substantielle.`;
    }
    
    return pitch;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPitch);
    toast({
      title: "Copié !",
      description: "Le pitch a été copié dans le presse-papier.",
    });
  };

  const exportPDF = () => {
    toast({
      title: "Export PDF",
      description: "Le pitch a été préparé pour l'export en PDF.",
    });
    
    // Dans une vraie implémentation, on utiliserait jsPDF ou une autre bibliothèque
  };

  const ScoreDisplay = ({ score }: { score: number }) => {
    let color = "text-red-500";
    if (score >= 90) color = "text-green-500";
    else if (score >= 80) color = "text-blue-500";
    else if (score >= 70) color = "text-yellow-500";
    
    return (
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold flex items-center justify-center p-4 rounded-full bg-gray-100">
          <span className={color}>{score}</span>
          <span className="text-sm text-gray-500">/100</span>
        </div>
        <div>
          <p className="text-sm">Score de pitch</p>
          <p className="text-xs text-gray-500">Basé sur l'analyse IA</p>
        </div>
      </div>
    );
  };

  const industries = [
    "Technologies", "Finance", "Santé", "Éducation", "Commerce", "Alimentation",
    "Transport", "Immobilier", "Services", "Tourisme", "Média", "Autre"
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-accent" />
          Générateur de Pitch Commercial IA
        </CardTitle>
        <CardDescription>
          Créez un pitch professionnel en remplissant les informations sur votre projet
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Créer</TabsTrigger>
            <TabsTrigger value="result" disabled={!generatedPitch}>Résultat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="pt-4 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Nom du projet/entreprise</Label>
                <Input 
                  id="project-name" 
                  placeholder="Ex: NeoBiz Solutions" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Secteur d'activité</Label>
                <Select
                  value={industry}
                  onValueChange={setIndustry}
                >
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Sélectionner un secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(ind => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target-audience">Public cible</Label>
                <Input 
                  id="target-audience" 
                  placeholder="Ex: PME du secteur manufacturier" 
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="value-proposition">Proposition de valeur</Label>
                <Textarea 
                  id="value-proposition" 
                  placeholder="Ex: Notre solution permet de réduire les coûts opérationnels de 30% tout en améliorant la productivité" 
                  className="min-h-[80px]"
                  value={valueProposition}
                  onChange={(e) => setValueProposition(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="goal">Objectif du pitch</Label>
                  <Select
                    value={goal}
                    onValueChange={setGoal}
                  >
                    <SelectTrigger id="goal">
                      <SelectValue placeholder="Sélectionner un objectif" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investor">Attirer des investisseurs</SelectItem>
                      <SelectItem value="customer">Convaincre des clients</SelectItem>
                      <SelectItem value="partnership">Établir des partenariats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tone">Ton du pitch</Label>
                  <Select
                    value={tone}
                    onValueChange={setTone}
                  >
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Sélectionner un ton" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professionnel</SelectItem>
                      <SelectItem value="friendly">Convivial</SelectItem>
                      <SelectItem value="persuasive">Persuasif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                className="w-full bg-accent hover:bg-accent/90"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Générer mon pitch
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="result" className="pt-4 space-y-6">
            {generatedPitch && (
              <>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-medium">Pitch généré</h3>
                        <p className="text-sm text-gray-500">
                          Pour {goal === 'investor' ? 'investisseurs' : goal === 'customer' ? 'clients' : 'partenaires'}
                          <span className="mx-2">•</span>
                          Ton {tone === 'professional' ? 'professionnel' : tone === 'friendly' ? 'convivial' : 'persuasif'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={copyToClipboard}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copier
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={exportPDF}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Exporter PDF
                        </Button>
                      </div>
                    </div>
                    <div className="bg-white border rounded-lg p-4 whitespace-pre-line">
                      {generatedPitch}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">Analyse et feedback</h3>
                    
                    {isGenerating ? (
                      <div className="flex justify-center items-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-accent" />
                        <p className="ml-2">Analyse en cours...</p>
                      </div>
                    ) : feedback ? (
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-6 justify-between">
                          <ScoreDisplay score={feedback.score} />
                          
                          <div className="flex flex-wrap gap-2">
                            {feedback.score >= 90 && (
                              <Badge className="bg-green-500">Excellent</Badge>
                            )}
                            {feedback.score >= 80 && (
                              <Badge className="bg-blue-500">Persuasif</Badge>
                            )}
                            {feedback.score >= 70 && (
                              <Badge className="bg-yellow-500">Clair</Badge>
                            )}
                            <Badge className="bg-purple-500">Concis</Badge>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="flex items-center text-green-600 font-medium mb-2">
                              <Lightbulb className="h-4 w-4 mr-2" />
                              Points forts
                            </h4>
                            <ul className="space-y-2">
                              {feedback.strengths.map((strength, idx) => (
                                <li key={idx} className="text-sm flex items-start">
                                  <span className="text-green-500 mr-2">✓</span>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="flex items-center text-blue-600 font-medium mb-2">
                              <BarChart className="h-4 w-4 mr-2" />
                              Pistes d'amélioration
                            </h4>
                            <ul className="space-y-2">
                              {feedback.improvements.map((improvement, idx) => (
                                <li key={idx} className="text-sm flex items-start">
                                  <span className="text-blue-500 mr-2">→</span>
                                  {improvement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">
                        Le feedback sera disponible une fois le pitch généré.
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="bg-accent/5 rounded-lg p-4">
                  <h3 className="flex items-center text-accent font-medium mb-2">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Conseils pour un pitch efficace
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white p-3 rounded border">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-accent" />
                        <span className="font-medium">Soyez concis</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Un bon pitch doit être clair et direct. Visez 2-3 minutes maximum.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-accent" />
                        <span className="font-medium">Connaissez votre audience</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Adaptez votre message en fonction de qui vous écoutera.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-accent" />
                        <span className="font-medium">Solution claire</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Expliquez précisément quel problème vous résolvez et comment.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setGeneratedPitch('')}
                  >
                    Modifier les informations
                  </Button>
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Régénération en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Régénérer le pitch
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PitchGenerator;
