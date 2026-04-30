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

        $descriptions = [
            "Join industry leaders and wellness enthusiasts for an immersive experience dedicated to rejuvenation and holistic health. Discover new techniques, network with top spa professionals, and explore the latest innovations in wellness tech and organic skincare.",
            "Elevate your practice and personal wellness journey with our expert-led sessions. This exclusive event features interactive workshops, keynote speeches from renowned therapists, and exclusive product demonstrations designed to inspire and educate.",
            "Take a step back from the daily grind and immerse yourself in a transformative environment. Attendees will participate in hands-on demonstrations, learn about sustainable spa practices, and connect with a community of mindful professionals."
        ];

        $name = fake()->randomElement($events) . ' ' . fake()->year();

        return [
            'name' => $name,
            'description' => "Welcome to the " . $name . ". " . fake()->randomElement($descriptions),
            'start_date' => fake()->dateTimeBetween('+1 week', '+1 month'),
            'end_date' => fake()->dateTimeBetween('+1 month', '+2 months')
        ];
    }
}
