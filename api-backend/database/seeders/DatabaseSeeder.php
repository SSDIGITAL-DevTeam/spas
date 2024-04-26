<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
        // \App\Models\User::factory(10)->create();

        User::create([
            'name' => 'adminSPAS',
            'operator_id' => null,
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin'),
            'role' => 'admin'
        ]);

        User::create([
            'name' => 'memberSPAS',
            'operator_id' => null,
            'email' => 'operator@gmail.com',
            'password' => Hash::make('member'),
            'role' => 'operator'
        ]);

        User::create([
            'name' => 'therapistSPAS',
            'therapist_id' => null,
            'email' => 'therapist@gmail.com',
            'password' => Hash::make('therapist'),
            'role' => 'therapist'
        ]);
    }
}
