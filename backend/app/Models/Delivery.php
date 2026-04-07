<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'address',
        'landmark',
        'city',
        'pincode',
        'payment_method',
        'upi_id',
        'card_number',
        'card_expiry',
        'card_cvv',
        'cardholder_name',
        'total_amount',
        'status'
    ];

    protected $casts = [
        'status' => 'string',
        'total_amount' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
}
