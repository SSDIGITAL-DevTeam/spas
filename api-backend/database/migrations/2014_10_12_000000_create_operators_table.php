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
        Schema::create('operators', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('uen_no');
            $table->string('brand_name');
            $table->string('address');
            $table->string('contact_no');
            $table->string('contact_person');
            $table->string('contact_person_no');
            $table->string('payment_slip');
            $table->enum('status', ['pending', 'approve'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('operators');
    }
};
