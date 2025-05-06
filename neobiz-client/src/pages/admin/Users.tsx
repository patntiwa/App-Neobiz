
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserPlus, UserCog, Check } from 'lucide-react';
import { defaultUsers } from '@/utils/currencyUtils';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const UsersPage = () => {
  const [users, setUsers] = useState(defaultUsers);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isUserActionsOpen, setIsUserActionsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { toast } = useToast();

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Utilisateur ajouté",
      description: "Un nouvel utilisateur a été ajouté avec succès.",
    });
    setIsAddUserOpen(false);
  };

  const handleUserAction = (action: string) => {
    if (selectedUser) {
      toast({
        title: `Action exécutée: ${action}`,
        description: `L'action a été appliquée à l'utilisateur ${selectedUser.name}.`,
      });
      setIsUserActionsOpen(false);
    }
  };

  return (
    <DashboardLayout isAdmin>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
          
          {/* Dialog pour ajouter un utilisateur */}
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="w-4 h-4" />
                Ajouter un utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour créer un nouvel utilisateur sur la plateforme.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Nom</Label>
                    <Input id="name" className="col-span-3" placeholder="Nom complet" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input id="email" type="email" className="col-span-3" placeholder="email@exemple.com" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">Rôle</Label>
                    <select id="role" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Type</Label>
                    <select id="type" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="Particulier">Particulier</option>
                      <option value="Entreprise">Entreprise</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Ajouter l'utilisateur</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.type || 'Particulier'}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <Dialog open={isUserActionsOpen && selectedUser?.id === user.id} onOpenChange={(open) => {
                        setIsUserActionsOpen(open);
                        if (open) setSelectedUser(user);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                            <UserCog className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Gérer l'utilisateur : {user.name}</DialogTitle>
                            <DialogDescription>
                              Sélectionnez une action à effectuer sur cet utilisateur.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <Button 
                              variant="outline" 
                              className="flex items-center justify-start gap-2"
                              onClick={() => handleUserAction('activer')}
                            >
                              <Check className="w-4 h-4" />
                              {user.status === 'Actif' ? 'Désactiver le compte' : 'Activer le compte'}
                            </Button>
                            <Button 
                              variant="outline"
                              className="flex items-center justify-start gap-2"
                              onClick={() => handleUserAction('réinitialiser')}
                            >
                              Réinitialiser le mot de passe
                            </Button>
                            <Button 
                              variant="outline"
                              className="flex items-center justify-start gap-2"
                              onClick={() => handleUserAction('changer rôle')}
                            >
                              Changer le rôle
                            </Button>
                            <Button 
                              variant="destructive"
                              className="flex items-center justify-start gap-2"
                              onClick={() => handleUserAction('supprimer')}
                            >
                              Supprimer l'utilisateur
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
