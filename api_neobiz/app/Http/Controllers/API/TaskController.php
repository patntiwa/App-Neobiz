<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\TaskDetail;
use App\Http\Requests\TaskRequest;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json(Task::with('taskDetails')->get()); // Charger les détails avec les tâches
    }

    public function store(TaskRequest $request)
    {
        $task = Task::create($request->validated());

        // Ajouter les détails de la tâche si existants
        if ($request->has('task_details')) {
            foreach ($request->task_details as $detail) {
                TaskDetail::create([
                    'task_id' => $task->id,
                    'sub_task_title' => $detail['sub_task_title'],
                    'sub_task_description' => $detail['sub_task_description'],
                    'assigned_to' => $detail['assigned_to'] ?? null,
                    'status' => $detail['status'],
                    'due_date' => $detail['due_date'],
                ]);
            }
        }

        return response()->json(['message' => 'Tâche créée avec succès.', 'task' => $task], 201);
    }

    public function show($id)
    {
        $task = Task::with('taskDetails')->findOrFail($id);
        return response()->json($task);
    }

    public function update(TaskRequest $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->validated());

        // Mettre à jour ou ajouter les détails de tâche
        if ($request->has('task_details')) {
            foreach ($request->task_details as $detail) {
                $taskDetail = TaskDetail::find($detail['id']);
                if ($taskDetail) {
                    $taskDetail->update([
                        'sub_task_title' => $detail['sub_task_title'],
                        'sub_task_description' => $detail['sub_task_description'],
                        'assigned_to' => $detail['assigned_to'] ?? null,
                        'status' => $detail['status'],
                        'due_date' => $detail['due_date'],
                    ]);
                }
            }
        }

        return response()->json(['message' => 'Tâche mise à jour avec succès.', 'task' => $task]);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Tâche supprimée avec succès']);
    }
}

