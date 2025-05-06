
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit2, Trash2, Eye, Book } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BlogPage = () => {
  const [isAddArticleOpen, setIsAddArticleOpen] = useState(false);
  const { toast } = useToast();
  
  const articles = [
    { 
      id: 1, 
      title: 'Comment optimiser sa facturation ?', 
      author: 'Jean Dupont',
      category: 'Conseils',
      status: 'Publié',
      date: '15/06/2024', 
      comments: 12,
      views: 432
    },
    { 
      id: 2, 
      title: 'Les nouvelles fonctionnalités de NeoBiz', 
      author: 'Admin',
      category: 'Nouveautés',
      status: 'Publié',
      date: '02/06/2024', 
      comments: 8,
      views: 287
    },
    { 
      id: 3, 
      title: 'Guide complet sur la TVA', 
      author: 'Marie Martin',
      category: 'Guides',
      status: 'Brouillon',
      date: '28/05/2024', 
      comments: 0,
      views: 0
    },
  ];

  const categories = [
    { id: 1, name: 'Conseils', articles: 12 },
    { id: 2, name: 'Nouveautés', articles: 8 },
    { id: 3, name: 'Guides', articles: 5 },
    { id: 4, name: 'Témoignages', articles: 3 },
  ];

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddArticleOpen(false);
    toast({
      title: "Article créé",
      description: "L'article a été créé avec succès.",
    });
  };

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion du Blog</h1>
            <p className="text-muted-foreground mt-1">
              Créez et gérez les articles de votre blog
            </p>
          </div>
          <Dialog open={isAddArticleOpen} onOpenChange={setIsAddArticleOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouvel article
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Rédiger un nouvel article</DialogTitle>
                <DialogDescription>
                  Créez un nouvel article pour votre blog.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSaveArticle}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input id="title" placeholder="Titre de l'article" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <select id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">Contenu</Label>
                    <textarea
                      id="content"
                      className="min-h-52 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Contenu de l'article..."
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image de couverture</Label>
                    <Input id="image" type="file" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button">Enregistrer en brouillon</Button>
                  <Button type="submit">Publier</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="articles">
          <TabsList>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="comments">Commentaires</TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Auteur</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Vues</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell>{article.category}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            article.status === 'Publié' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {article.status}
                          </span>
                        </TableCell>
                        <TableCell>{article.date}</TableCell>
                        <TableCell>{article.views}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{category.name}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Book className="h-4 w-4 text-muted-foreground" />
                      <span>{category.articles} articles</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed hover:shadow-md transition-shadow duration-300">
                <CardContent className="flex flex-col items-center justify-center h-full py-8">
                  <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-4">Nouvelle catégorie</p>
                  <Button variant="outline">Ajouter</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Commentaires récents</CardTitle>
                <CardDescription>Gérez les commentaires des lecteurs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-6 text-muted-foreground">Aucun commentaire récent</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BlogPage;
