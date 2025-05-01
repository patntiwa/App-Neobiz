<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');  // Vérifie que l'utilisateur est authentifié
        $this->middleware('role:admin');  // Seulement un admin peut créer des rôles
    }

     /**
     * Afficher tous les rôles
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    /**
     * Créer un rôle
     */
    public function store(RoleRequest $request)
    {
        // Créer un rôle dans la base de données
        $role = Role::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Rôle créé avec succès.',
            'role' => $role,
        ], 201);
    }

    /**
     * Afficher un rôle spécifique
     */
    public function show($id)
    {
        $role = Role::findOrFail($id);
        return response()->json($role);
    }

    /**
     * Mettre à jour un rôle existant
     */
    public function update(RoleRequest $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Rôle mis à jour avec succès.',
            'role' => $role,
        ]);
    }

    /**
     * Supprimer un rôle
     */
    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json([
            'message' => 'Rôle supprimé avec succès.',
        ]);
    }
}
