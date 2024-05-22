<?php

use App\Models\Operator;
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
        Schema::create('request_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Operator::class)->nullable()->constrained();
            $table->foreignIdFor(Therapist::class)->nullable()->constrained();
            $table->string('company_name')->nullable()->default(null);
            $table->string('uen_no')->nullable()->default(null);
            $table->string('brand_name')->nullable()->default(null);
            $table->string('address')->nullable()->default(null);
            $table->string('contact_no')->nullable()->default(null);
            $table->string('contact_person')->nullable()->default(null);
            $table->string('contact_person_no')->nullable()->default(null);
            $table->string('url_logo_operator')->nullable()->default(null);

            $table->string('name')->nullable()->default(null);
            $table->string('passport_finno')->nullable()->default(null);
            $table->string('date_of_birth')->nullable()->default(null);
            $table->enum('sex', ['Male', 'Female'])->nullable();
            $table->string('contact_no_therapist')->nullable()->default(null);
            $table->string('nationality')->nullable()->default(null);
            $table->string('address_therapist')->nullable()->default(null);
            $table->string('address_nearest_mrt')->nullable()->default(null);
            $table->string('professional_certs')->nullable()->default(null);
            $table->string('name_cert')->nullable()->default(null);
            $table->string('issuing_organization')->nullable()->default(null);
            $table->string('date_of_issue')->nullable()->default(null);
            $table->string('expired_date')->nullable()->default(null);
            $table->integer('credential_id')->nullable();
            $table->enum('status', ['pending', 'approve'])->default('pending');
            $table->string('url_logo_therapist')->nullable()->default(null);

            $table->enum('role', ['operator', 'therapist']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_updates');
    }
};
