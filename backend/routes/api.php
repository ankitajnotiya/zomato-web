<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MenuItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// FORGOT PASSWORD ROUTE - TOP PRIORITY (NO MIDDLEWARE)
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

// CONTACT FORM ROUTE - NO MIDDLEWARE REQUIRED
Route::post('/contact', [AuthController::class, 'submitContact']);

// DELIVERY FORM ROUTE - NO MIDDLEWARE REQUIRED
Route::post('/delivery', [AuthController::class, 'submitDelivery']);

// PLACE ORDER ROUTE - NO MIDDLEWARE REQUIRED  
Route::post('/place-order', [AuthController::class, 'placeOrder']);

// Auth Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'register']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Public Routes
Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);
Route::get('/restaurants/{id}/menu', [MenuItemController::class, 'restaurantMenu']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    
    // Profile
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
});
