<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ClientRequest;
use App\Models\Client;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user(); // récupère l'utilisateur connecté

        if ($user->hasRole('admin') || $user->hasRole('super_admin')) {
            // Admins peuvent voir tous les clients
            $clients = \App\Models\Client::with('account')->latest()->paginate(20);
        } else {
            // Autres rôles voient uniquement leurs clients
            $clients = $user->clients()->latest()->paginate(20);
        }

        return response()->json($clients);
    }
    public function store(ClientRequest $request)
    {
        $client = $request->user()->clients()->create($request->validated());

        return response()->json([
            'message' => 'Client ajouté avec succès.',
            'client' => $client,
        ], 201);
    }

    public function show(Client $client)
    {
        // Afficher un client spécifique
        return response()->json($client);
    }

    public function update(ClientRequest $request, Client $client)
    {
        // Mettre à jour un client existant
        $client->update($request->validated());
        return response()->json(['message' => 'Client mis à jour', 'client' => $client]);
    }

    public function destroy(Client $client)
    {
        // Supprimer un client
        $client->delete();
        return response()->json(['message' => 'Client supprimé']);
    }
}
