<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'objectives',
        'deliverables',
        'milestones',
        'stakeholders',
        'resource_breakdown',
        'risk_assessment',
        'estimated_hours',
        'actual_hours',
        'budget_spent',
        'notes',
        'attachments_url',
    ];

    protected $casts = [
        'milestones' => 'array',
        'stakeholders' => 'array',
        'resource_breakdown' => 'array',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
