<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Event;
use App\Models\Operator;
use App\Models\Page;
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

        $operators = Operator::factory(6)->create();

        foreach ($operators as $operator) {
            try {
                $response = Http::retry(3, 100)->get('https://source.unsplash.com/random/800x600/?spa');

                if ($response->successful()) {
                    $imageContent = $response->body();
                    $imageName = 'operator-logo/' . uniqid() . '.jpg';
                    $saved = Storage::disk('public')->put($imageName, $imageContent);

                    if (!$saved) {
                        Log::error("Failed to save the image to storage: $imageName");
                    }

                    if ($saved) {
                        $operator->cover()->create([
                            'url' => $imageName,
                        ]);
                    }
                } else {
                    Log::error("Failed to retrieve the image from Unsplash: " . $response->status());
                }
            } catch (\Exception $e) {
                Log::error("An error occurred while fetching image from Unsplash: " . $e->getMessage());
            }

            // Create a user for the operator
            $operator->user()->create([
                'name' => $operator->company_name,
                'email' => fake()->companyEmail(),
                'password' => Hash::make('operator'),
                'role' => 'operator',
            ]);
        }


        // Create Therapists
        $therapists = Therapist::factory(6)->create();

        foreach ($therapists as $therapist) {
            try {
                $response = Http::retry(3, 100)->get('https://source.unsplash.com/random/800x600/?spa');

                if ($response->successful()) {
                    $imageContent = $response->body();
                    $imageName = 'therapist-certs/' . uniqid() . '.jpg';
                    $saved = Storage::disk('public')->put($imageName, $imageContent);

                    if (!$saved) {
                        Log::error("Failed to save the image to storage: $imageName");
                    }

                    if ($saved) {
                        $therapist->cover()->create([
                            'url' => $imageName,
                        ]);
                    }
                } else {
                    Log::error("Failed to retrieve the image from Unsplash: " . $response->status());
                }
            } catch (\Exception $e) {
                Log::error("An error occurred while fetching image from Unsplash: " . $e->getMessage());
            }

            // Create a user for each therapist
            $therapist->user()->create([
                'name' => $therapist->name,
                'email' => fake()->companyEmail(),
                'password' => Hash::make('therapist'),
                'role' => 'therapist',
            ]);
        }


        // Create 6 categories
        Category::factory()->count(5)->create();

        // Create 6 events
        Event::factory()->count(6)->create();

        // Create 6 Page
        Page::factory()->count(6)->create();

        // Create Post
        Post::factory()->count(10)->create()->each(function ($post) {
            try {
                $response = Http::retry(3, 100)->get('https://source.unsplash.com/random/800x600/?spa');

                if ($response->successful()) {
                    $imageContent = $response->body();
                    $imageName = 'post-image/' . uniqid() . '.jpg';
                    $saved = Storage::disk('public')->put($imageName, $imageContent);

                    if (!$saved) {
                        Log::error("Failed to save the image to storage: $imageName");
                    }

                    if ($saved) {
                        $post->cover()->create([
                            'url' => $imageName,
                        ]);
                    }
                } else {
                    Log::error("Failed to retrieve the image from Unsplash: " . $response->status());
                }
            } catch (\Exception $e) {
                Log::error("An error occurred while fetching image from Unsplash: " . $e->getMessage());
            }
        });


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
    }
}
