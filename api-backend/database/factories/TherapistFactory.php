<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Therapist>
 */
class TherapistFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $name = fake()->name,
            'slug' => Str::slug($name),
            'passport_finno' => fake()->regexify('[A-Z]{2}[0-9]{7}'), // Example pattern
            'date_of_birth' => fake()->date($format = 'Y-m-d', $max = '2003-12-31'),
            'sex' => fake()->randomElement(['male', 'female']),
            'contact_no' => fake()->phoneNumber,
            'nationality' => fake()->country,
            'address' => fake()->address,
            'address_nearest_mrt' => fake()->address,
            'professional_certs' => 'https://source.unsplash.com/random/800x600/?certificate,spa', // Simplified representation
            'name_cert' => fake()->word,
            'date_of_issue' => fake()->date($format = 'Y-m-d', $max = 'today'),
            'expired_date' => fake()->dateTimeBetween('now', '+5 years')->format('Y-m-d'),
            'issuing_organization' => fake()->company,
            'credential_id' => fake()->randomFloat(1, 20, 30),
        ];
    }
}
