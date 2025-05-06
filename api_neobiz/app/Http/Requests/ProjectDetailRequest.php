<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectDetailRequest extends FormRequest
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
            'project_id' => 'required|exists:projects,id',
            'objectives' => 'nullable|string',
            'deliverables' => 'nullable|string',
            'milestones' => 'nullable|json',
            'stakeholders' => 'nullable|json',
            'resource_breakdown' => 'nullable|json',
            'risk_assessment' => 'nullable|string',
            'estimated_hours' => 'nullable|decimal|min:0',
            'actual_hours' => 'nullable|decimal|min:0',
            'budget_spent' => 'nullable|decimal|min:0',
            'notes' => 'nullable|string',
            'attachments_url' => 'nullable|url',
        ];
    }
}
