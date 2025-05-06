
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Upload } from 'lucide-react';

const DataAnalysis = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <BarChart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle>Analyse de Données</CardTitle>
          <p className="text-sm text-muted-foreground">Visualisez et analysez vos données</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Importez vos données pour analyse
          </p>
          <Button variant="outline" size="sm">Importer des données</Button>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Type d'analyse</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Analyse descriptive</option>
            <option>Prévisions</option>
            <option>Segmentation</option>
            <option>Corrélations</option>
          </select>
        </div>
        <Button className="w-full">Analyser</Button>
      </CardContent>
    </Card>
  );
};

export default DataAnalysis;
