<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserInfoRequest;
use App\Models\UserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserInfoController extends Controller
{
    // Nombre maximal de mises à jour autorisées
    const MAX_UPDATES = 3;

    public function update(UserInfoRequest $request)
    {
        // Récupérer l'utilisateur connecté
        $user = Auth::user();

        // Récupérer les informations de l'utilisateur
        $userInfo = $user->userInfo;

        // Initialiser le nombre d'updates limités pour certains champs
        $updateFields = ['prenom', 'nom', 'photo'];
        $updatesNeeded = 0;

        // Vérifier si l'utilisateur a déjà atteint la limite de mises à jour pour certains champs
        foreach ($updateFields as $field) {
            if ($request->has($field) && $userInfo->$field !== $request->$field) {
                $updatesNeeded++;
            }
        }

        // Vérifier si l'utilisateur a atteint la limite de mises à jour pour les champs limités
        if ($userInfo->update_count + $updatesNeeded > self::MAX_UPDATES) {
            return response()->json([
                'message' => 'Vous avez atteint le nombre maximal de mises à jour pour certains champs.',
            ], 403);
        }

        // Mettre à jour les informations utilisateur
        $userInfo->update($request->validated());

        // Incrémenter le compteur de mises à jour
        $userInfo->increment('update_count', $updatesNeeded);

        return response()->json([
            'message' => 'Vos informations ont été mises à jour avec succès.',
            'user_info' => $userInfo,
        ]);
    }
}
