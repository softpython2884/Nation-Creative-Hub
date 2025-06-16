"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Edit2, Trash2, CalendarDays, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'inprogress' | 'done' | 'notes';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Design new character models', description: 'Focus on elven race aesthetics.', status: 'inprogress', priority: 'high', dueDate: '2024-08-15' },
  { id: '2', title: 'Write quest dialogue for Act I', status: 'todo', priority: 'medium', dueDate: '2024-09-01' },
  { id: '3', title: 'Fix login bug on staging server', description: 'Users reporting intermittent failures.', status: 'inprogress', priority: 'high' },
  { id: '4', title: 'Compose main theme music', status: 'done', priority: 'high', dueDate: '2024-07-01' },
  { id: '5', title: 'Research cloud rendering solutions', status: 'notes', priority: 'low' },
  { id: '6', title: 'Outline marketing strategy for Q4', status: 'todo', priority: 'medium', dueDate: '2024-08-20' },
];

function TaskCard({ task, onEdit, onDelete }: { task: Task; onEdit: (task: Task) => void; onDelete: (taskId: string) => void; }) {
  const priorityColors = {
    low: 'bg-green-500/20 text-green-700 dark:bg-green-700/30 dark:text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-400 border-yellow-500/30',
    high: 'bg-red-500/20 text-red-700 dark:bg-red-700/30 dark:text-red-400 border-red-500/30',
  };
  const statusIcons = {
    todo: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    inprogress: <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />,
    done: <CheckCircle className="h-5 w-5 text-green-500" />,
    notes: <CalendarDays className="h-5 w-5 text-gray-500" />,
  }

  return (
    <Card className="mb-4 shadow-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          {statusIcons[task.status]}
        </div>
        {task.description && <CardDescription className="mt-1 text-sm">{task.description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-xs text-muted-foreground">
          <Badge variant="outline" className={`capitalize ${priorityColors[task.priority]}`}>{task.priority}</Badge>
        </div>
        {task.dueDate && (
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="mr-1 h-4 w-4" />
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(task)}><Edit2 className="mr-1 h-4 w-4" /> Edit</Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(task.id)}><Trash2 className="mr-1 h-4 w-4" /> Delete</Button>
      </CardFooter>
    </Card>
  );
}


export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentStatus, setCurrentStatus] = useState<Task['status']>('todo');
  const [currentPriority, setCurrentPriority] = useState<Task['priority']>('medium');
  const [currentDueDate, setCurrentDueDate] = useState('');

  const openFormForNew = () => {
    setEditingTask(null);
    setCurrentTitle('');
    setCurrentDescription('');
    setCurrentStatus('todo');
    setCurrentPriority('medium');
    setCurrentDueDate('');
    setIsFormOpen(true);
  };

  const openFormForEdit = (task: Task) => {
    setEditingTask(task);
    setCurrentTitle(task.title);
    setCurrentDescription(task.description || '');
    setCurrentStatus(task.status);
    setCurrentPriority(task.priority);
    setCurrentDueDate(task.dueDate || '');
    setIsFormOpen(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...editingTask, title: currentTitle, description: currentDescription, status: currentStatus, priority: currentPriority, dueDate: currentDueDate } : t));
    } else {
      const newTask: Task = {
        id: String(Date.now()),
        title: currentTitle,
        description: currentDescription,
        status: currentStatus,
        priority: currentPriority,
        dueDate: currentDueDate,
      };
      setTasks([...tasks, newTask]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filterTasks = (status: Task['status']) => tasks.filter(task => task.status === status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openFormForNew}>
              <PlusCircle className="mr-2 h-5 w-5" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
              <DialogDescription>
                {editingTask ? 'Update the details of your task.' : 'Fill in the details for your new task.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" value={currentDescription} onChange={(e) => setCurrentDescription(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select value={currentStatus} onValueChange={(value: Task['status']) => setCurrentStatus(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="notes">Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">Priority</Label>
                 <Select value={currentPriority} onValueChange={(value: Task['priority']) => setCurrentPriority(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                <Input id="dueDate" type="date" value={currentDueDate} onChange={(e) => setCurrentDueDate(e.target.value)} className="col-span-3" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">{editingTask ? 'Save Changes' : 'Add Task'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="todo">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todo">To Do ({filterTasks('todo').length})</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress ({filterTasks('inprogress').length})</TabsTrigger>
          <TabsTrigger value="done">Done ({filterTasks('done').length})</TabsTrigger>
          <TabsTrigger value="notes">Notes ({filterTasks('notes').length})</TabsTrigger>
        </TabsList>
        
        {['todo', 'inprogress', 'done', 'notes'].map(status => (
          <TabsContent key={status} value={status}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {filterTasks(status as Task['status']).length > 0 ? (
                filterTasks(status as Task['status']).map(task => (
                  <TaskCard key={task.id} task={task} onEdit={openFormForEdit} onDelete={handleDeleteTask} />
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center py-8">No tasks in this category.</p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
