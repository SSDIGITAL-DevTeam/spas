<?php

use App\Models\CategoryPartner;
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
        Schema::create('value_partners', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(CategoryPartner::class);
            $table->string('brand_name');
            $table->string('slug');
            $table->string('phone_number');
            $table->string('email');
            $table->string('logo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('value_partners');
    }
};
