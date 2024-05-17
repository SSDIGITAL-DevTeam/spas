<?php

namespace Database\Factories;

use App\Models\CategoryPartner;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ValuePartner>
 */
class ValuePartnerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'category_partner_id' => CategoryPartner::factory(),
            'brand_name' => $brand_name = fake()->company,
            'slug' => Str::slug($brand_name),
            'phone_number' => fake()->phoneNumber,
            'email' => fake()->unique()->safeEmail,
            'logo' => 'https://source.unsplash.com/random/800x600/?spa',
        ];
    }
}
