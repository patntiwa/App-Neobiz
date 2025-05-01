<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'prenom' => 'nullable|string|max:255',
            'nom' => 'nullable|string|max:255',
            'telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string',
            'sexe' => 'nullable|in:Masculin,Feminin,autre',
            'date_naissance' => 'nullable|date',
            'photo' => 'nullable|image|max:2048', // Limiter la taille de l'image à 2MB
        ];
    }
}
