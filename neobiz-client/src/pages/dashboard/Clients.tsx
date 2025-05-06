import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchAllClients, createClient, updateClient, deleteClient } from '@/services/clientService';

const ClientsPage = () => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchAllClients();
        setClients(data);
      } catch (error) {
        console.error('Erreur lors du chargement des clients :', error);
      }
    };

    loadClients();
  }, []);

  const handleCreateClient = async (clientData: any) => {
    try {
      const newClient = await createClient(clientData);
      setClients((prevClients) => [...prevClients, newClient]);
    } catch (error) {
      console.error('Erreur lors de la création du client :', error);
    }
  };

  const handleUpdateClient = async (id: string, clientData: any) => {
    try {
      const updatedClient = await updateClient(id, clientData);
      setClients((prevClients) => prevClients.map((client) => (client.id === id ? updatedClient : client)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client :', error);
    }
  };

  const handleDeleteClient = async (id: string) => {
    try {
      await deleteClient(id);
      setClients((prevClients) => prevClients.filter((client) => client.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du client :', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des clients</h1>
          <Button onClick={() => console.log('Open client creation modal')}>Ajouter un client</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{client.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Email : {client.email}</p>
                <p>Entreprise : {client.company || 'N/A'}</p>
              </CardContent>
              <div className="flex justify-between p-4">
                <Button variant="outline" size="sm" onClick={() => console.log('Edit client', client.id)}>Modifier</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteClient(client.id)}>Supprimer</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientsPage;