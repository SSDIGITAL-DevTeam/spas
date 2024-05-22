<?php

use App\Models\Operator;
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
        Schema::create('branch_offices', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Operator::class)->constrained();
            $table->string('branch_name');
            $table->string('address');
            $table->string('contact_number');
            $table->string('person_name');
            $table->string('person_contact');
            $table->string('email')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branch_offices');
    }
};
