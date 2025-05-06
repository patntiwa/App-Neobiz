import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchAllTasks, createTask, updateTask, deleteTask } from '@/services/taskService';

const TasksPage = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchAllTasks();
        setTasks(data);
      } catch (error) {
        console.error('Erreur lors du chargement des tâches :', error);
      }
    };

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

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des tâches</h1>
          <Button onClick={() => console.log('Open task creation modal')}>Ajouter une tâche</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Projet : {task.project}</p>
                <p>Priorité : {task.priority}</p>
                <p>Statut : {task.status}</p>
                <p>Échéance : {task.dueDate}</p>
              </CardContent>
              <div className="flex justify-between p-4">
                <Button variant="outline" size="sm" onClick={() => console.log('Edit task', task.id)}>Modifier</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteTask(task.id)}>Supprimer</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TasksPage;