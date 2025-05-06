
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';

const RecentSection = () => {
  const recentActivities = [
    { 
      id: 1, 
      title: 'Nouvel utilisateur inscrit: Marie Laurent', 
      timestamp: 'Il y a 45 minutes', 
      status: 'completed' as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
      ) 
    },
    { 
      id: 2, 
      title: 'Mise à jour de la plateforme v2.3.1', 
      timestamp: 'Il y a 3 heures', 
      status: 'completed' as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
      )
    },
  ];

  const recentUsers = [
    { id: 1, name: 'Marie Laurent', email: 'marie@example.com', plan: 'Business', joined: '25 Juil, 2024', status: 'Actif' },
    { id: 2, name: 'Thomas Durand', email: 'thomas@example.com', plan: 'Freelance', joined: '23 Juil, 2024', status: 'Actif' },
    { id: 3, name: 'Sophie Moreau', email: 'sophie@example.com', plan: 'Enterprise', joined: '20 Juil, 2024', status: 'Actif' },
  ];

  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'Freelance': return 'bg-blue-100 text-blue-800';
      case 'Business': return 'bg-purple-100 text-purple-800';
      case 'Enterprise': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <RecentActivityCard activities={recentActivities} />
      
      <Card className="hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Nouveaux utilisateurs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="text-center">Forfait</TableHead>
                <TableHead className="text-right">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50/50">
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground md:hidden">{user.email}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                  <TableCell align="center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(user.plan)}`}>
                      {user.plan}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentSection;
