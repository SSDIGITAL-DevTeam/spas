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
use App\Models\ValuePartner;
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
        $this->call([
            TherapistSeeder::class,
            OperatorSeeder::class,
        ]);

        // Create 6 categories
        Category::factory()->count(5)->create();

        // Create 6 events
        Event::factory()->count(6)->create();

        // Create 6 Page
        Page::factory()->count(6)->create();

        // Create 3 CategoryPartner
        CategoryPartner::factory()->count(3)->create();

        $categoryPartnerIds = CategoryPartner::all()->pluck('id');

        foreach ($categoryPartnerIds as $categoryPartnerId) {
            ValuePartner::factory()->count(5)->create([
                'category_partner_id' => $categoryPartnerId,
            ]);
        }

        // Create Post
        Post::factory(10)->create()->each(function ($post) {
            try {
                $post->cover()->create([
                    'url' => '', // URL gambar acak dari Unsplash
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
