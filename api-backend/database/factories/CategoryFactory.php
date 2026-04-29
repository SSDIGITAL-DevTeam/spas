<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Facial Treatments',
            'Body Massages',
            'Aromatherapy',
            'Hydrotherapy',
            'Manicure & Pedicure',
            'Reflexology',
            'Sauna & Steam',
            'Hair & Scalp Treatments',
            'Yoga & Meditation',
            'Wellness Consultation'
        ];

        return [
            'name' => fake()->unique()->randomElement($categories),
        ];
    }
}
