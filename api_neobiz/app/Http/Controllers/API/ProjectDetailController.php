<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectDetailRequest;
use App\Models\ProjectDetail;

class ProjectDetailController extends Controller
{
    public function show(ProjectDetail $projectDetail)
    {
        return response()->json($projectDetail);
    }

    public function store(ProjectDetailRequest $request)
    {
        $projectDetail = ProjectDetail::create($request->validated());

        return response()->json([
            'message' => 'Détails du projet ajoutés avec succès.',
            'project_detail' => $projectDetail,
        ], 201);
    }

    public function update(ProjectDetailRequest $request, ProjectDetail $projectDetail)
    {
        $projectDetail->update($request->validated());

        return response()->json([
            'message' => 'Détails du projet mis à jour avec succès.',
            'project_detail' => $projectDetail,
        ]);
    }

    public function destroy(ProjectDetail $projectDetail)
    {
        $projectDetail->delete();

        return response()->json(['message' => 'Détails du projet supprimés avec succès.']);
    }
}
