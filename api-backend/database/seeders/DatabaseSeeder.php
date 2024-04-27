<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Event;
use App\Models\Operator;
use App\Models\Post;
use App\Models\Therapist;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        try {
            $response = Http::retry(3, 100)->get('https://source.unsplash.com/random/1920x1080');

            if ($response->successful()) {
                $imageContent = $response->body();
                $imageName = 'operator-logo/' . uniqid() . '.jpg';
                $saved = Storage::disk('public')->put($imageName, $imageContent);

                if (!$saved) {
                    Log::error("Failed to save the image to storage: $imageName");
                }
            } else {
                Log::error("Failed to retrieve the image from Unsplash: " . $response->status());
            }
        } catch (\Exception $e) {
            Log::error("An error occurred while fetching image from Unsplash: " . $e->getMessage());
        }

        Operator::factory()->count(5)->create()->each(function ($operator) use ($saved, $imageName) {
            if ($saved) {
                $operator->cover()->create([
                    'url' => $imageName,
                ]);
            }
        });

        // Create Therapist
        Therapist::factory()->count(5)->create();

        User::create([
            'name' => 'adminSPAS',
            'operator_id' => null,
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin'),
            'role' => 'admin'
        ]);

        User::create([
            'name' => 'OperatorSPAS',
            'operator_id' => 1,
            'email' => 'operator@gmail.com',
            'password' => Hash::make('operator'),
            'role' => 'operator'
        ]);

        User::create([
            'name' => 'TherapistSPAS',
            'therapist_id' => 1,
            'email' => 'therapist@gmail.com',
            'password' => Hash::make('therapist'),
            'role' => 'therapist'
        ]);

        // Create 6 categories
        Category::factory()->count(6)->create();

        // Create 6 events
        Event::factory()->count(6)->create();

        // Create Post
        Post::factory()->count(10)->create();
    }
}
