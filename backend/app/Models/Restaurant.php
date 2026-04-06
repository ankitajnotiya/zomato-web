<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'address',
        'phone',
        'cuisine_type',
        'price_range',
        'rating',
        'delivery_time',
        'delivery_fee',
        'is_active'
    ];

    protected $casts = [
        'rating' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
        'is_active' => 'boolean'
    ];

    public function menuItems()
    {
        return $this->hasMany(MenuItem::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
