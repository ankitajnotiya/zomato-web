<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'restaurant_id',
        'order_id',
        'customer_name',
        'customer_phone',
        'delivery_address',
        'delivery_city',
        'delivery_pincode',
        'delivery_landmark',
        'total_amount',
        'delivery_fee',
        'grand_total',
        'payment_method',
        'payment_status',
        'upi_id',
        'card_last_four',
        'cardholder_name',
        'status'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
        'grand_total' => 'decimal:2'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
