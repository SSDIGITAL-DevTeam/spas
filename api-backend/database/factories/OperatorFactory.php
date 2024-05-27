<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Operator>
 */
class OperatorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_name' => $companyName = fake()->company,
            'slug' => Str::slug($companyName),
            'uen_no' => fake()->unique()->numerify('######'),
            'brand_name' => fake()->companySuffix,
            'address' => fake()->address,
            'contact_no' => fake()->phoneNumber,
            'contact_person' => fake()->name,
            'contact_person_no' => fake()->phoneNumber,
            'payment_slip' => 'https://source.unsplash.com/random/1920x1080/?payment,receipt',
        ];
    }
}
