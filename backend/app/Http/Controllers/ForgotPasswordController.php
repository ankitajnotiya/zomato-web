<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    /**
     * Handle forgot password request
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResetLink(Request $request)
    {
        try {
            // Validate request
            $validated = $request->validate([
                'email' => 'required|email|exists:users,email'
            ], [
                'email.exists' => 'No account found with this email address'
            ]);

            // Check user in users table (real user data)
            $user = DB::table('users')->where('email', $validated['email'])->first();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'No account found with this email address'
                ], 404);
            }

            // Generate unique reset token
            $token = Str::random(60);
            
            // Mark old tokens as used
            DB::table('password_reset_tokens')
                ->where('email', $validated['email'])
                ->where('used', false)
                ->update(['used' => true]);

            // Store new reset token
            DB::table('password_reset_tokens')->insert([
                'email' => $validated['email'],
                'token' => $token,
                'expires_at' => now()->addHour(),
                'used' => false,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            // Dummy success message (abhi email send nahi kar rahe)
            return response()->json([
                'success' => true,
                'message' => 'Password reset link has been sent to your email address',
                'reset_token' => $token, // Demo ke liye, production mein hata dena
                'expires_at' => now()->addHour()->toISOString()
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Problem sending reset link: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Verify reset token
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyToken(Request $request)
    {
        try {
            $validated = $request->validate([
                'token' => 'required|string'
            ]);

            $resetToken = DB::table('password_reset_tokens')
                ->where('token', $validated['token'])
                ->where('used', false)
                ->where('expires_at', '>', now())
                ->first();

            if (!$resetToken) {
                return response()->json([
                    'success' => false,
                    'message' => 'Token is invalid or has expired'
                ], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'Token is valid',
                'email' => $resetToken->email
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Problem verifying token: ' . $e->getMessage()
            ], 500);
        }
    }
}
