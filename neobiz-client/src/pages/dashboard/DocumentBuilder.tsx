
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DocumentBuilder = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <h2 className="text-3xl font-bold tracking-tight flex-1">
            Générateur de documents
          </h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Création de documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Le module de génération de documents sera implémenté prochainement. Vous pourrez créer des contrats, des cahiers des charges et d'autres documents professionnels assistés par IA.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DocumentBuilder;
