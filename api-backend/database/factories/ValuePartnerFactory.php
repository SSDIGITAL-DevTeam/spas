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
        $brands = [
            'Serenity Spa Supplies', 'Zen Wellness Co', 'Aqua Pure Hydrotherapy', 
            'Aroma Bliss Essences', 'Touch of Nature Organics', 'Lotus Blossom Beauty',
            'Harmony Massage Equipments', 'Radiant Skin Solutions', 'Nirvana Essentials',
            'Pure Botanicals', 'Mindful Tech Systems', 'Oasis Care Vendors'
        ];

        $brand_name = fake()->randomElement($brands) . ' ' . fake()->companySuffix();

        return [
            'category_partner_id' => CategoryPartner::factory(),
            'brand_name' => $brand_name,
            'slug' => Str::slug($brand_name),
            'phone_number' => fake()->phoneNumber,
            'email' => fake()->unique()->safeEmail,
            'logo' => 'https://source.unsplash.com/random/800x600/?spa,wellness',
        ];
    }
}
