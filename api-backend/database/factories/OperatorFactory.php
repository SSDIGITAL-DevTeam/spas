<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

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
        // Attempt to download the image and save it locally.
        $imageContent = Http::get('https://source.unsplash.com/random/1920x1080?payment')->body();
        $imageName = 'payment_slips/' . $this->faker->unique()->md5 . '.jpg';
        $saved = Storage::disk('public')->put($imageName, $imageContent);

        return [
            'company_name' => fake()->company,
            'uen_no' => fake()->unique()->numerify('######'),
            'brand_name' => fake()->companySuffix,
            'address' => fake()->address,
            'contact_no' => fake()->phoneNumber,
            'contact_person' => fake()->name,
            'contact_person_no' => fake()->phoneNumber,
            'url' => fake()->url,
            'payment_slip' => $saved ? $imageName : null,
            'email' => fake()->safeEmail,
        ];
    }
}
