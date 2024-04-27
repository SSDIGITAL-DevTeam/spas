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
        // Attempt to download the image and save it locally.
        try {
            $response = Http::retry(3, 100)->get('https://source.unsplash.com/random/1920x1080?payment');

            if ($response->successful()) {
                $imageContent = $response->body();
                $imageName = 'payment_slips/' . $this->faker->unique()->md5 . '.jpg';
                $saved = Storage::disk('public')->put($imageName, $imageContent);

                if (!$saved) {
                    Log::error("Failed to save the image to storage.");
                    // Optionally handle the error, e.g., by notifying the user or retrying.
                }
            } else {
                Log::error("Failed to retrieve the image from Unsplash: " . $response->status());
                // Optionally handle the failure, e.g., by providing fallback logic.
            }
        } catch (\Exception $e) {
            Log::error("An error occurred while fetching image from Unsplash: " . $e->getMessage());
            // Optionally handle exceptions, e.g., by notifying the user or retrying.
        }

        return [
            'company_name' => $companyName = fake()->company,
            'slug' => Str::slug($companyName),
            'uen_no' => fake()->unique()->numerify('######'),
            'brand_name' => fake()->companySuffix,
            'address' => fake()->address,
            'contact_no' => fake()->phoneNumber,
            'contact_person' => fake()->name,
            'contact_person_no' => fake()->phoneNumber,
            'payment_slip' => $saved ? $imageName : null,
        ];
    }
}
