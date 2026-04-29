<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $events = [
            'Weekend Wellness Retreat',
            'Global Spa & Beauty Expo',
            'Aromatherapy Formulation Workshop',
            'Holistic Healing Symposium',
            'Advanced Massage Techniques Masterclass',
            'Yoga and Mindfulness Summit',
            'Therapist Networking Night',
            'Skincare Innovations Conference'
        ];

        $name = fake()->randomElement($events) . ' ' . fake()->year();

        return [
            'name' => $name,
            'description' => "Join us for the " . $name . ". " . fake()->paragraph(3) . " Don't miss out on this exclusive opportunity to improve your wellness journey and connect with top spa professionals.",
            'start_date' => fake()->dateTimeBetween('+1 week', '+1 month'),
            'end_date' => fake()->dateTimeBetween('+1 month', '+2 months')
        ];
    }
}
