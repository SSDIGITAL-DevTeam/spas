<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CategoryPartnerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $categoryPartners = [
            'Aircon vendor',
            'Digital partner',
            'POS system vendor',
        ];

        $name = fake()->unique()->randomElement($categoryPartners);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
        ];
    }
}
