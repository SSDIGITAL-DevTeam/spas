<?php

use App\Models\Operator;
use App\Models\Post;
use App\Models\Therapist;
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
        Schema::create('covers', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->foreignIdFor(Post::class)->nullable()->constrained();
            $table->foreignIdFor(Operator::class)->nullable()->constrained();
            $table->foreignIdFor(Therapist::class)->nullable()->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('covers');
    }
};
