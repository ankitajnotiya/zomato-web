<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Models\User;
use App\Models\Contact;
use App\Models\Signup;
use App\Models\Delievery;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Manual validation instead of Laravel validate to avoid HTML exceptions
            $errors = [];
            
            if (empty($request->name)) {
                $errors['name'] = 'Name is required';
            }
            
            if (empty($request->email)) {
                $errors['email'] = 'Email is required';
            } elseif (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
                $errors['email'] = 'Invalid email format';
            } elseif (DB::table('signup')->where('email', $request->email)->exists()) {
                $errors['email'] = 'Email already exists';
            }
            
            if (empty($request->password)) {
                $errors['password'] = 'Password is required';
            } elseif (strlen($request->password) < 6) {
                $errors['password'] = 'Password must be at least 6 characters';
            }
            
            if (!empty($errors)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed: ' . implode(', ', $errors)
                ], 422);
            }

            $signup = DB::table('signup')->insertGetId([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password, // Real password (not hashed)
                'phone' => $request->phone,
                'address' => $request->address
            ]);

            // Get the inserted record
            $signupData = DB::table('signup')->where('id', $signup)->first();

            return response()->json([
                'success' => true,
                'message' => 'Registration successful! Please login to continue.',
                'user' => [
                    'id' => $signupData->id,
                    'name' => $signupData->name,
                    'email' => $signupData->email
                ]
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed: ' . implode(', ', $e->errors()->all())
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        try {
            // Check signup table instead of users table (case insensitive email)
            $signup = DB::table('signup')
                ->whereRaw('LOWER(email) = ?', [strtolower($request->email)])
                ->first();
            
            if (!$signup || $signup->password !== $request->password) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid email or password'
                ], 401);
            }

            // Create token for the signup user
            $token = Str::random(60);

            return response()->json([
                'success' => true,
                'message' => 'Login successful!',
                'user' => [
                    'id' => $signup->id,
                    'name' => $signup->name,
                    'email' => $signup->email,
                    'phone' => $signup->phone,
                    'address' => $signup->address
                ],
                'token' => $token
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Login failed. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string'
        ]);

        $user = $request->user();
        $user->update($request->only('name', 'phone', 'address'));

        return response()->json([
            'user' => $user,
            'message' => 'Profile updated successfully'
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        try {
            $signup = DB::table('signup')->where('email', $request->email)->first();
            
            if (!$signup) {
                return response()->json([
                    'success' => false,
                    'message' => 'No account found with this email address'
                ], 404);
            }

            // Just return success message - no email sending for now
            return response()->json([
                'success' => true,
                'message' => 'Password reset link sent to your email'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send reset link. Please try again.'
            ], 500);
        }
    }

    /**
     * Submit Contact Form - NO MIDDLEWARE REQUIRED
     */
    public function submitContact(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string'
        ]);

        try {
            $contact = Contact::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'subject' => $request->subject,
                'message' => $request->message,
                'status' => 'pending'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Contact form submitted successfully',
                'contact_id' => $contact->id
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit contact form. Please try again.'
            ], 500);
        }
    }

    /**
     * Submit Delivery Details
     */
    public function submitDelivery(Request $request)
    {
        try {
            $delivery = DB::table('deliveries')->insertGetId([
                'name' => $request->name,
                'phone' => $request->phone,
                'address' => $request->address,
                'landmark' => $request->landmark,
                'city' => $request->city,
                'pincode' => $request->pincode,
                'payment_method' => $request->payment_method,
                'upi_id' => $request->upi_id,
                'card_number' => $request->card_number,
                'card_expiry' => $request->card_expiry,
                'card_cvv' => $request->card_cvv,
                'cardholder_name' => $request->cardholder_name,
                'total_amount' => $request->total_amount,
                'status' => 'pending'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Delivery details submitted successfully',
                'delivery_id' => $delivery
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit delivery details. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Place Order - Handle React frontend checkout
     */
    public function placeOrder(Request $request)
    {
        try {
            // Validate required fields
            $errors = [];
            
            if (empty($request->customer_name)) {
                $errors['customer_name'] = 'Customer name is required';
            }
            
            if (empty($request->customer_phone)) {
                $errors['customer_phone'] = 'Customer phone is required';
            }
            
            if (empty($request->delivery_address)) {
                $errors['delivery_address'] = 'Delivery address is required';
            }
            
            if (empty($request->delivery_city)) {
                $errors['delivery_city'] = 'City is required';
            }
            
            if (empty($request->delivery_pincode)) {
                $errors['delivery_pincode'] = 'Pincode is required';
            }
            
            if (empty($request->payment_method)) {
                $errors['payment_method'] = 'Payment method is required';
            }
            
            if (empty($request->total_amount)) {
                $errors['total_amount'] = 'Total amount is required';
            }
            
            if (empty($request->cart_items) || !is_array($request->cart_items)) {
                $errors['cart_items'] = 'Cart items are required';
            }
            
            if (!empty($errors)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed: ' . implode(', ', $errors)
                ], 422);
            }

            // Generate unique order ID
            $orderId = 'ORD' . strtoupper(Str::random(8));
            
            // Calculate grand total
            $deliveryFee = 40.00;
            $grandTotal = $request->total_amount + $deliveryFee;
            
            // Map payment_method to match database enum
            $paymentMethod = $request->payment_method;
            if ($paymentMethod === 'cod') {
                $paymentMethod = 'cash'; // Map COD to cash for database
            }
            
            // Create order
            $order = DB::table('orders')->insertGetId([
                'user_id' => 1, // Default user_id since it's required
                'restaurant_id' => $request->restaurant_id ?? 1, // Default restaurant
                'order_number' => $orderId, // Use order_number instead of order_id
                'customer_name' => $request->customer_name,
                'customer_phone' => $request->customer_phone,
                'delivery_address' => $request->delivery_address,
                'delivery_city' => $request->delivery_city,
                'delivery_pincode' => $request->delivery_pincode,
                'delivery_landmark' => $request->delivery_landmark,
                'total_amount' => $request->total_amount,
                'delivery_fee' => $deliveryFee,
                'final_amount' => $grandTotal, // Use final_amount instead of grand_total
                'payment_method' => $paymentMethod, // Use mapped payment method
                'payment_status' => 'pending',
                'upi_id' => $request->upi_id,
                'card_last_four' => $request->card_number ? substr($request->card_number, -4) : null,
                'cardholder_name' => $request->cardholder_name,
                'status' => 'pending'
            ]);

            // Create order items - match existing database structure
            foreach ($request->cart_items as $item) {
                DB::table('order_items')->insert([
                    'order_id' => $order, // Use the generated order ID
                    'menu_item_id' => 1, // Default menu item id since we don't have menu items mapping
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $item['price'] * $item['quantity']
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Order placed successfully!',
                'order' => [
                    'id' => $order,
                    'order_id' => $orderId, // Return the order_number as order_id for frontend
                    'grand_total' => $grandTotal,
                    'status' => 'pending',
                    'customer_name' => $request->customer_name,
                    'delivery_address' => $request->delivery_address,
                    'delivery_city' => $request->delivery_city,
                    'created_at' => now()->toDateTimeString()
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to place order. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed'
        ]);

        try {
            $resetToken = \DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->first();

            if (!$resetToken || !Hash::check($request->token, $resetToken->token)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid or expired reset token'
                ], 400);
            }

            $user = User::where('email', $request->email)->first();
            $user->update(['password' => Hash::make($request->password)]);

            // Delete the reset token
            \DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->delete();

            return response()->json([
                'success' => true,
                'message' => 'Password reset successful! Please login with your new password.'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Password reset failed. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
