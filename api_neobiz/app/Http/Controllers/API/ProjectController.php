<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;


class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->hasRole('admin') || $user->hasRole('super_admin')) {
            $projects = Project::with('account')->latest()->paginate(20);
        } else {
            $projects = $user->projects()->latest()->paginate(20);
        }

        return response()->json($projects);
    }

    public function store(ProjectRequest $request)
    {
        $project = $request->user()->projects()->create($request->validated());

        return response()->json([
            'message' => 'Projet cr\u00e9\u00e9 avec succ\u00e8s.',
            'project' => $project,
        ], 201);
    }

    public function show(Project $project)
    {
        return response()->json($project);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $project->update($request->validated());

        return response()->json([
            'message' => 'Projet mis \u00e0 jour avec succ\u00e8s.',
            'project' => $project,
        ]);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['message' => 'Projet supprim\u00e9 avec succ\u00e8s.']);
    }
}
