<?php

namespace Database\Seeders;

use App\Models\Therapist;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class TherapistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    { // Create Therapists
        $therapists = Therapist::factory(2)->create();

        foreach ($therapists as $therapist) {
            try {
                $therapist->cover()->create([
                    'url' => '', // Ganti dengan URL default gambar
                ]);
            } catch (\Exception $e) {
                Log::error("An error occurred while saving therapist cover: " . $e->getMessage());
            }

            // Create a user for each therapist
            $therapist->user()->create([
                'name' => $therapist->name,
                'email' => fake()->companyEmail(),
                'password' => Hash::make('therapist'),
                'role' => 'therapist',
            ]);
        }
    }
}
