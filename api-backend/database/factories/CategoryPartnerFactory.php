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
            'Spa Equipment Vendor',
            'Skincare & Cosmetics Supplier',
            'Aromatherapy & Essential Oils Provider',
            'Wellness Tech Partner',
            'Booking & POS System',
        ];

        $name = fake()->unique()->randomElement($categoryPartners);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
        ];
    }
}
