<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'account_id',
        'client_id',
        'titre',
        'description',
        'statut',
        'priorite',
        'date_debut',
        'date_echeance',
        'budget_estimate',
        'progression',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function details()
    {
        return $this->hasOne(ProjectDetail::class);
    }
}
