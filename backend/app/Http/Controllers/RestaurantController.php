<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::where('is_active', true)
            ->with('menuItems')
            ->get();
            
        return response()->json($restaurants);
    }

    public function show($id)
    {
        $restaurant = Restaurant::with('menuItems')
            ->findOrFail($id);
            
        return response()->json($restaurant);
    }
}
