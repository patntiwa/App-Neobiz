<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'item_description',
        'quantity',
        'unit_price',
        'total_price',
        'discount',
    ];


    /**
     * Relation avec la facture (Invoice)
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
