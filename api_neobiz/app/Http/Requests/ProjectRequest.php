<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titre' => 'required|string|max:255',
            'client_id' => 'required|exists:clients,id',
            'description' => 'nullable|string',
            'statut' => 'required|in:\u00e0 faire,en cours,termin\u00e9',
            'priorite' => 'required|in:basse,moyenne,haute',
            'date_echeance' => 'nullable|date',
            'progression' => 'nullable|integer|min:0|max:100',
        ];
    }
}
