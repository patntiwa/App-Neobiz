
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload } from 'lucide-react';

const DocumentAnalysis = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle>Analyse de Documents</CardTitle>
          <p className="text-sm text-muted-foreground">Extraire des insights de vos documents</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Glissez-déposez vos documents ici ou cliquez pour sélectionner
          </p>
          <Button variant="outline" size="sm">Parcourir les fichiers</Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Formats supportés: PDF, DOCX, TXT
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentAnalysis;
