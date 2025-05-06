
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

const SmartWriting = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle>Rédaction Intelligente</CardTitle>
          <p className="text-sm text-muted-foreground">Générez du contenu professionnel en quelques clics</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Contexte</label>
          <Textarea placeholder="Décrivez le contexte de votre rédaction..." className="min-h-[100px]" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Ton</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Professionnel</option>
            <option>Formel</option>
            <option>Décontracté</option>
            <option>Persuasif</option>
          </select>
        </div>
        <Button className="w-full">Générer le contenu</Button>
      </CardContent>
    </Card>
  );
};

export default SmartWriting;
