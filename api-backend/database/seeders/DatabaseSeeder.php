<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\CategoryPartner;
use App\Models\Event;
use App\Models\Operator;
use App\Models\Page;
use App\Models\Post;
use App\Models\Therapist;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

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
                $operator->cover()->create([
                    'url' => 'https://source.unsplash.com/random/800x600/?spa', // Ganti dengan URL default gambar
                ]);
            } catch (\Exception $e) {
                Log::error("An error occurred while saving operator cover: " . $e->getMessage());
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
                $operator->cover()->create([
                    'url' => 'https://source.unsplash.com/random/800x600/?spa', // Ganti dengan URL default gambar
                ]);
            } catch (\Exception $e) {
                Log::error("An error occurred while saving operator cover: " . $e->getMessage());
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

        // Create 3 CategoryPartner
        CategoryPartner::factory()->count(3)->create();

        // Create Post
        Post::factory(10)->create()->each(function ($post) {
            try {
                $post->cover()->create([
                    'url' => 'https://source.unsplash.com/random/800x600/?spa', // URL gambar acak dari Unsplash
                ]);
            } catch (\Exception $e) {
                Log::error("An error occurred while saving post cover: " . $e->getMessage());
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
