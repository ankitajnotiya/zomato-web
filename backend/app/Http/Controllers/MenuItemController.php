<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MenuItem;
use App\Models\Restaurant;

class MenuItemController extends Controller
{
    public function restaurantMenu($restaurantId)
    {
        $restaurant = Restaurant::findOrFail($restaurantId);
        $menuItems = MenuItem::where('restaurant_id', $restaurantId)
            ->where('is_available', true)
            ->get();
            
        return response()->json([
            'restaurant' => $restaurant,
            'menu_items' => $menuItems
        ]);
    }
}
