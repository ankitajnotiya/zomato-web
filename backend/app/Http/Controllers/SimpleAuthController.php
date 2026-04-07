<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SimpleAuthController extends Controller
{
    // User Login - Simple without Laravel Auth
    public function login(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        
        if ($request->isMethod('OPTIONS')) {
            return response('', 200);
        }
        
        $data = $request->json()->all();
        
        if (empty($data['email']) || empty($data['password'])) {
            return response()->json([
                'success' => false,
                'message' => 'Email and password are required'
            ], 400);
        }
        
        $user = DB::table('login')
            ->where('email', $data['email'])
            ->first();
            
        if ($user && Hash::check($data['password'], $user->password)) {
            unset($user->password);
            
            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'data' => [
                    'user' => $user,
                    'token' => Str::random(60)
                ]
            ]);
        }
        
        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }
    
    // User Signup - Simple without Laravel Auth
    public function signup(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        
        if ($request->isMethod('OPTIONS')) {
            return response('', 200);
        }
        
        $data = $request->json()->all();
        
        $required = ['name', 'email', 'password', 'phone'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                return response()->json([
                    'success' => false,
                    'message' => "$field is required"
                ], 400);
            }
        }
        
        // Check if email exists
        if (DB::table('login')->where('email', $data['email'])->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Email already exists'
            ], 422);
        }
        
        $user = [
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'phone' => $data['phone'],
            'address' => $data['address'] ?? '',
            'created_at' => now(),
            'updated_at' => now()
        ];
        
        $userId = DB::table('signup')->insertGetId($user);
        
        // Generate verification token
        $token = Str::random(32);
        DB::table('email_verifications')->insert([
            'user_id' => $userId,
            'email' => $data['email'],
            'token' => $token,
            'expires_at' => now()->addHours(24),
            'created_at' => now()
        ]);
        
        unset($user['password']);
        $user['id'] = $userId;
        
        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'data' => [
                'user' => $user,
                'verification_token' => $token
            ]
        ]);
    }
}
