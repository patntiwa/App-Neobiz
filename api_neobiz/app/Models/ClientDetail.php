<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'client_id',
        'preferred_language',
        'timezone',
        'default_payment_terms',
        'credit_limit',
        'risk_level',
        'notes',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

}
