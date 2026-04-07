<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:1000'
        ]);

        // Here you would typically send an email or save to database
        // For now, just return success response
        
        return response()->json([
            'success' => true,
            'message' => 'Contact form submitted successfully!'
        ]);
    }
}
