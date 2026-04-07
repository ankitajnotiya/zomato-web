<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with(['items.menuItem', 'restaurant'])
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'delivery_address' => 'required|string'
        ]);

        $restaurant = \App\Models\Restaurant::findOrFail($request->restaurant_id);
        
        // Calculate total
        $totalAmount = 0;
        $orderItems = [];

        foreach ($request->items as $item) {
            $menuItem = \App\Models\MenuItem::findOrFail($item['menu_item_id']);
            $itemTotal = $menuItem->price * $item['quantity'];
            $totalAmount += $itemTotal;
            
            $orderItems[] = [
                'menu_item_id' => $item['menu_item_id'],
                'quantity' => $item['quantity'],
                'price' => $menuItem->price,
                'total_price' => $itemTotal
            ];
        }

        $finalAmount = $totalAmount + $restaurant->delivery_fee;

        // Create order
        $order = Order::create([
            'user_id' => $request->user()->id,
            'restaurant_id' => $request->restaurant_id,
            'order_number' => 'ORD' . Str::upper(Str::random(8)),
            'total_amount' => $totalAmount,
            'delivery_fee' => $restaurant->delivery_fee,
            'final_amount' => $finalAmount,
            'delivery_address' => $request->delivery_address,
            'status' => 'pending'
        ]);

        // Create order items
        foreach ($orderItems as $item) {
            $item['order_id'] = $order->id;
            OrderItem::create($item);
        }

        return response()->json([
            'order' => $order->load('items.menuItem'),
            'message' => 'Order placed successfully'
        ], 201);
    }

    public function show($id, Request $request)
    {
        $order = Order::where('user_id', $request->user()->id)
            ->with(['items.menuItem', 'restaurant'])
            ->findOrFail($id);
            
        return response()->json($order);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,preparing,delivered,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);

        return response()->json([
            'order' => $order,
            'message' => 'Order status updated successfully'
        ]);
    }
}
