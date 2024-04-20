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
        Schema::create('therapists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('passport_finno');
            $table->date('date_of_birth');
            $table->enum('sex', ['Male', 'Female']);
            $table->string('contact_no');
            $table->string('nationality');
            $table->date('date_of_issue');
            $table->string('address');
            $table->string('address_nearest_mrt');
            $table->string('professional_certs');
            $table->string('employment_history');
            $table->enum('status', ['pending', 'approve'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('therapists');
    }
};
