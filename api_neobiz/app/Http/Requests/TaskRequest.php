<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
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
            'project_id' => 'required|exists:projects,id',  // Vérifier que le projet existe
            'title' => 'required|string|max:255',            // Titre de la tâche
            'description' => 'nullable|string|max:1000',     // Description de la tâche
            'status' => 'required|in:pending,completed,in_progress', // Statut de la tâche
            'due_date' => 'required|date|after:today',       // Date limite, doit être après aujourd'hui
        ];
    }
}
