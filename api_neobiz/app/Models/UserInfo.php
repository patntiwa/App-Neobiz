<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'prenom',
        'nom',
        'telephone',
        'adresse',
        'sexe',
        'date_naissance',
        'photo',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
