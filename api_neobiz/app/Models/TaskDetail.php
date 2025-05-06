<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'sub_task_title',
        'sub_task_description',
        'assigned_to',
        'status',
        'due_date',
    ];

    /**
     * Relation avec la tâche (Task)
     */
    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    /**
     * Relation avec l'utilisateur assigné
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
