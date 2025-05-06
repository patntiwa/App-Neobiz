<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceRequest extends FormRequest
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
            'client_id' => 'required|exists:clients,id',    // Vérifier que le client existe
            'amount' => 'required|numeric|min:0',            // Montant de la facture
            'status' => 'required|in:pending,paid,cancelled', // Statut de la facture
            'due_date' => 'required|date|after:today',       // Date d'échéance, doit être après aujourd'hui
        ];
    }
}
