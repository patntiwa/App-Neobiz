
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, FilePlus, UploadCloud } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const InvoiceTemplates = () => {
  const [activePreview, setActivePreview] = useState<number | null>(null);
  const { toast } = useToast();
  
  const templates = [
    { id: 1, name: 'Standard', preview: '/placeholder.svg', selected: true },
    { id: 2, name: 'Moderne', preview: '/placeholder.svg', selected: false },
    { id: 3, name: 'Minimaliste', preview: '/placeholder.svg', selected: false },
    { id: 4, name: 'Professionnel', preview: '/placeholder.svg', selected: false },
  ];

  const handleTemplateSelect = (id: number) => {
    setActivePreview(id);
  };

  const handleImportTemplate = () => {
    toast({
      title: "Import de modèle",
      description: "L'IA va analyser et recréer votre modèle de facture.",
    });
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Modèles de facture
            </h2>
            <p className="text-muted-foreground mt-2">
              Personnalisez et gérez vos modèles de facture
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UploadCloud className="h-4 w-4" />
                Importer un modèle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Importer un modèle de facture</DialogTitle>
                <DialogDescription>
                  L'IA va analyser votre document et créer un modèle de facture similaire.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="border-2 border-dashed border-gray-200 rounded-md p-6 flex flex-col items-center justify-center gap-2">
                  <UploadCloud className="h-8 w-8 text-muted-foreground/60" />
                  <p className="text-sm text-center text-muted-foreground">
                    Glissez-déposez votre fichier PDF ici ou cliquez pour parcourir
                  </p>
                  <input type="file" className="hidden" accept=".pdf" id="template-upload" />
                  <Button variant="outline" className="mt-2" size="sm" onClick={() => document.getElementById('template-upload')?.click()}>
                    Sélectionner un fichier
                  </Button>
                </div>
                <Button onClick={handleImportTemplate}>Importer et analyser</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map(template => (
            <Card key={template.id} className="hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="aspect-[8.5/11] bg-gray-50 relative overflow-hidden border-b">
                <img 
                  src={template.preview} 
                  alt={`Template ${template.name}`} 
                  className="w-full h-full object-cover"
                  onClick={() => handleTemplateSelect(template.id)}
                />
                {template.selected && (
                  <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded text-xs font-semibold">
                    Par défaut
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{template.name}</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      ⋯
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Ajouter un nouveau modèle */}
          <Card className="hover:shadow-md transition-shadow duration-300 border-dashed overflow-hidden">
            <div className="aspect-[8.5/11] bg-gray-50 flex flex-col items-center justify-center gap-4 border-b">
              <Plus className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-muted-foreground font-medium">Nouveau modèle</p>
            </div>
            <CardContent className="p-4">
              <Button variant="outline" className="w-full gap-2">
                <FilePlus className="h-4 w-4" />
                Créer un modèle
              </Button>
            </CardContent>
          </Card>
        </div>

        {activePreview && (
          <Dialog open={activePreview !== null} onOpenChange={(open) => !open && setActivePreview(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>
                  {templates.find(t => t.id === activePreview)?.name}
                </DialogTitle>
              </DialogHeader>
              <div className="aspect-[8.5/11] bg-white border rounded-md overflow-hidden">
                <img 
                  src={templates.find(t => t.id === activePreview)?.preview} 
                  alt={`Preview of ${templates.find(t => t.id === activePreview)?.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline">Modifier</Button>
                <Button variant="default">Utiliser ce modèle</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InvoiceTemplates;
