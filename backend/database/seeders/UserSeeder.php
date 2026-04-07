<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
            'phone' => '9876543210',
            'address' => '123 Test Street, Delhi'
        ]);

        User::create([
            'name' => 'Admin User',
            'email' => 'admin@zomato.com',
            'password' => Hash::make('admin123'),
            'phone' => '9876543211',
            'address' => '456 Admin Road, Mumbai'
        ]);

        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password123'),
            'phone' => '9876543212',
            'address' => '789 John Lane, Bangalore'
        ]);
    }
}
