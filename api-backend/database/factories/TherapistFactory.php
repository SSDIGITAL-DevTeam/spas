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
        // Attempt to download the image and save it locally.
        try {
            $response = Http::retry(3, 100)->get('https://source.unsplash.com/random/1920x1080?payment');

            if ($response->successful()) {
                $imageContent = $response->body();
                $imageName = 'therapist-certs/' . $this->faker->unique()->md5 . '.jpg';
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
            'name' => $name = fake()->name,
            'slug' => Str::slug($name),
            'passport_finno' => fake()->regexify('[A-Z]{2}[0-9]{7}'), // Example pattern
            'date_of_birth' => fake()->date($format = 'Y-m-d', $max = '2003-12-31'),
            'sex' => fake()->randomElement(['male', 'female']),
            'contact_no' => fake()->phoneNumber,
            'nationality' => fake()->country,
            'address' => fake()->address,
            'address_nearest_mrt' => fake()->address,
            'professional_certs' => $saved ? $imageName : null, // Simplified representation
            'name_cert' => fake()->word,
            'date_of_issue' => fake()->date($format = 'Y-m-d', $max = 'today'),
            'expired_date' => fake()->dateTimeBetween('now', '+5 years')->format('Y-m-d'),
            'issuing_organization' => fake()->company,
            'credential_id' => fake()->randomFloat(1, 20, 30),
        ];
    }
}
