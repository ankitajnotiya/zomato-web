<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Add delivery details columns
            $table->string('customer_name')->after('user_id');
            $table->string('customer_phone')->after('customer_name');
            $table->string('delivery_city')->after('delivery_address');
            $table->string('delivery_pincode')->after('delivery_city');
            $table->string('delivery_landmark')->nullable()->after('delivery_pincode');
            
            // Add payment details
            $table->string('upi_id')->nullable()->after('payment_method');
            $table->string('card_last_four')->nullable()->after('upi_id');
            $table->string('cardholder_name')->nullable()->after('card_last_four');
            
            // Add order tracking
            $table->string('order_id')->unique()->after('id'); // Human readable order ID
            $table->decimal('delivery_fee', 10, 2)->default(40.00)->after('total_amount');
            $table->decimal('grand_total', 10, 2)->after('delivery_fee');
            
            // Update status enum
            $table->string('status')->default('pending')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'customer_name',
                'customer_phone', 
                'delivery_city',
                'delivery_pincode',
                'delivery_landmark',
                'upi_id',
                'card_last_four',
                'cardholder_name',
                'order_id',
                'delivery_fee',
                'grand_total'
            ]);
        });
    }
};
