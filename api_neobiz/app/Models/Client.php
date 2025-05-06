<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'billing_address',
        'shipping_address',
        'vat_number',
        'website',
        'currency'
    ];

    public function clientDetail()
    {
        return $this->hasOne(ClientDetail::class);
    }
    
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
