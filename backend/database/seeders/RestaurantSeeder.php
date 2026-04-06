<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Restaurant;
use App\Models\MenuItem;
use App\Models\MenuCategory;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $restaurant1 = Restaurant::create([
            'name' => 'Burger Palace',
            'description' => 'Best burgers in town',
            'address' => '123 Main Street, Delhi',
            'phone' => '9876543210',
            'cuisine_type' => 'American',
            'price_range' => '$$',
            'rating' => 4.5,
            'delivery_time' => 30,
            'delivery_fee' => 40.00,
            'is_active' => true
        ]);

        // Create categories for restaurant 1
        $cat1 = MenuCategory::create(['restaurant_id' => $restaurant1->id, 'name' => 'Burgers']);
        $cat2 = MenuCategory::create(['restaurant_id' => $restaurant1->id, 'name' => 'Sides']);
        $cat3 = MenuCategory::create(['restaurant_id' => $restaurant1->id, 'name' => 'Beverages']);

        MenuItem::create([
            'restaurant_id' => $restaurant1->id,
            'category_id' => $cat1->id,
            'name' => 'Classic Burger',
            'description' => 'Juicy beef patty with lettuce, tomato, and special sauce',
            'price' => 250.00,
            'is_vegetarian' => false,
            'is_available' => true
        ]);

        MenuItem::create([
            'restaurant_id' => $restaurant1->id,
            'category_id' => $cat1->id,
            'name' => 'Veggie Burger',
            'description' => 'Plant-based patty with fresh vegetables',
            'price' => 200.00,
            'is_vegetarian' => true,
            'is_available' => true
        ]);

        MenuItem::create([
            'restaurant_id' => $restaurant1->id,
            'category_id' => $cat2->id,
            'name' => 'French Fries',
            'description' => 'Crispy golden fries with sea salt',
            'price' => 120.00,
            'is_vegetarian' => true,
            'is_available' => true
        ]);

        $restaurant2 = Restaurant::create([
            'name' => 'Pizza Heaven',
            'description' => 'Authentic Italian pizza with wood-fired oven',
            'address' => '456 Park Avenue, Mumbai',
            'phone' => '9876543211',
            'cuisine_type' => 'Italian',
            'price_range' => '$$$',
            'rating' => 4.3,
            'delivery_time' => 35,
            'delivery_fee' => 50.00,
            'is_active' => true
        ]);

        // Create categories for restaurant 2
        $cat4 = MenuCategory::create(['restaurant_id' => $restaurant2->id, 'name' => 'Pizza']);
        $cat5 = MenuCategory::create(['restaurant_id' => $restaurant2->id, 'name' => 'Pasta']);

        MenuItem::create([
            'restaurant_id' => $restaurant2->id,
            'category_id' => $cat4->id,
            'name' => 'Margherita Pizza',
            'description' => 'Fresh mozzarella, tomato sauce, and basil',
            'price' => 350.00,
            'is_vegetarian' => true,
            'is_available' => true
        ]);

        MenuItem::create([
            'restaurant_id' => $restaurant2->id,
            'category_id' => $cat4->id,
            'name' => 'Pepperoni Pizza',
            'description' => 'Classic pepperoni with mozzarella',
            'price' => 400.00,
            'is_vegetarian' => false,
            'is_available' => true
        ]);
    }
}
