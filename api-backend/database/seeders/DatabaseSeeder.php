<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Event;
use App\Models\Operator;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Operator
        Operator::factory()->count(1)->create();

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
            'therapist_id' => null,
            'email' => 'therapist@gmail.com',
            'password' => Hash::make('therapist'),
            'role' => 'therapist'
        ]);

        // Create 6 categories
        Category::factory()->count(6)->create();

        // Create 6 events
        Event::factory()->count(6)->create();

        // Create Post
        Post::factory()->count(12)->create();
    }
}
