<?php

namespace Database\Seeders;

use App\Models\Operator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class OperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $operators = Operator::factory(2)->create();

        foreach ($operators as $operator) {
            try {
                $operator->cover()->create([
                    'url' => '', // Ganti dengan URL default gambar
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
    }
}
