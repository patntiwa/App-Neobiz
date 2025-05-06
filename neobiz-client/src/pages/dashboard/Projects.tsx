import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, ListTodo, Calendar, Timer, Search, CalendarDays } from 'lucide-react';
import { fetchAllProjects, createProject, updateProject, deleteProject } from '@/services/projectService';
import { fetchAllTasks, createTask, updateTask, deleteTask } from '@/services/taskService';

const ProjectsPage = () => {
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchAllProjects();
        setProjects(data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets :', error);
      }
    };

    const loadTasks = async () => {
      try {
        const data = await fetchAllTasks();
        setTasks(data);
      } catch (error) {
        console.error('Erreur lors du chargement des tâches :', error);
      }
    };

    loadProjects();
    loadTasks();
  }, []);

  const handleCreateTask = async (taskData: any) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
    }
  };

  const handleUpdateTask = async (id: string, taskData: any) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
    }
  };

  const getStatusColumn = (status: string) => {
    return tasks.filter(task => task.status === status);
  };
  
  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPriorityLabel = (priority: string) => {
    switch(priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return priority;
    }
  };
  
  const getProjectCardClass = (progress: number) => {
    if (progress >= 75) return 'border-l-4 border-l-green-500';
    if (progress >= 40) return 'border-l-4 border-l-yellow-500';
    return 'border-l-4 border-l-blue-500';
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion de projets</h1>
            <p className="text-muted-foreground mt-1">Organisez vos tâches et suivez vos projets</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Rechercher..." className="pl-9 w-[180px] md:w-[250px]" />
            </div>
            <Button onClick={() => setIsNewTaskDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Nouvelle tâche
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="kanban">
          <TabsList className="mb-6">
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <ListTodo className="w-4 h-4" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendrier
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Projets
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="kanban" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-medium text-sm mb-4 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  À faire ({getStatusColumn('todo').length})
                </h3>
                <div className="space-y-3">
                  {getStatusColumn('todo').map(task => (
                    <Card key={task.id} className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-3">
                        <div className="mb-2">
                          <span className={`inline-block text-xs px-2 py-1 rounded-full ${getPriorityStyle(task.priority)}`}>
                            {getPriorityLabel(task.priority)}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{task.project}</p>
                        <div className="flex items-center mt-3 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {task.dueDate}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-medium text-sm mb-4 flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  En cours ({getStatusColumn('in-progress').length})
                </h3>
                <div className="space-y-3">
                  {getStatusColumn('in-progress').map(task => (
                    <Card key={task.id} className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-3">
                        <div className="mb-2">
                          <span className={`inline-block text-xs px-2 py-1 rounded-full ${getPriorityStyle(task.priority)}`}>
                            {getPriorityLabel(task.priority)}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{task.project}</p>
                        <div className="flex items-center mt-3 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {task.dueDate}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-medium text-sm mb-4 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Terminé ({getStatusColumn('done').length})
                </h3>
                <div className="space-y-3">
                  {getStatusColumn('done').map(task => (
                    <Card key={task.id} className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-3">
                        <div className="mb-2">
                          <span className={`inline-block text-xs px-2 py-1 rounded-full ${getPriorityStyle(task.priority)}`}>
                            {getPriorityLabel(task.priority)}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{task.project}</p>
                        <div className="flex items-center mt-3 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {task.dueDate}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium">Juillet 2024</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Précédent</Button>
                    <Button variant="outline" size="sm">Aujourd'hui</Button>
                    <Button variant="outline" size="sm">Suivant</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                    <div key={day} className="text-center p-2 text-sm font-medium">
                      {day}
                    </div>
                  ))}
                  
                  {[...Array(31)].map((_, index) => (
                    <div key={index} className="border rounded-md p-2 min-h-[80px] text-sm">
                      <div className="font-medium">{index + 1}</div>
                      {index + 1 === 25 && (
                        <div className="mt-1 p-1 bg-green-100 text-green-800 rounded text-xs">
                          Optimiser images
                        </div>
                      )}
                      {index + 1 === 28 && (
                        <div className="mt-1 p-1 bg-red-100 text-red-800 rounded text-xs">
                          Finaliser maquettes
                        </div>
                      )}
                      {index + 1 === 29 && (
                        <div className="mt-1 p-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                          Analyse backlinks
                        </div>
                      )}
                      {index + 1 === 30 && (
                        <div className="mt-1 p-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                          Intégration page
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map(project => (
                <Card key={project.id} className={`hover:shadow-md transition-shadow duration-300 ${getProjectCardClass(project.progress)}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Échéance</div>
                        <div className="text-sm text-muted-foreground">{project.deadline}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progression</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              project.progress >= 75 ? 'bg-green-500' : 
                              project.progress >= 40 ? 'bg-yellow-500' : 
                              'bg-blue-500'
                            }`} 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div>{project.completedTasks} / {project.tasksCount} tâches</div>
                        <Button variant="outline" size="sm">Voir les tâches</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-medium border-2 border-white">JD</div>
                      <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-xs text-white font-medium border-2 border-white">ML</div>
                      <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white font-medium border-2 border-white">AR</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">32h</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une nouvelle tâche</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title">Titre</Label>
                  <Input id="title" placeholder="Titre de la tâche" />
                </div>
                <div>
                  <Label htmlFor="project">Projet</Label>
                  <select id="project" className="w-full h-10 px-3 py-2 border rounded-md">
                    <option value="">Sélectionnez un projet</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Statut</Label>
                    <select id="status" className="w-full h-10 px-3 py-2 border rounded-md">
                      <option value="todo">À faire</option>
                      <option value="in-progress">En cours</option>
                      <option value="done">Terminé</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priorité</Label>
                    <select id="priority" className="w-full h-10 px-3 py-2 border rounded-md">
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="dueDate">Date d'échéance</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Description de la tâche" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewTaskDialogOpen(false)}>Annuler</Button>
              <Button onClick={() => setIsNewTaskDialogOpen(false)}>Créer la tâche</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;
