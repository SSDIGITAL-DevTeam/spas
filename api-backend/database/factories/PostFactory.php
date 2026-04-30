<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        $titles = [
            'The Ultimate Guide to Relaxation through Aromatherapy',
            '5 Benefits of Deep Tissue Body Massage',
            'How Hydrotherapy Can Improve Your Wellbeing',
            'Top 10 Essential Oils for a Calming Home Spa',
            'Understanding the Healing Power of Reflexology',
            'Skincare Routine: Maintaining Your Glow After a Facial',
            'Mindfulness Tips for a Stress-Free Week',
            'Why Regular Spa Visits Are Good for Mental Health'
        ];

        $contents = [
            "Finding time to unwind is essential in today's fast-paced world. By incorporating regular massage therapy and mindfulness practices into your routine, you can significantly reduce stress levels, improve circulation, and promote better sleep. Dive into our comprehensive guide to creating a sanctuary of calm within your own home, utilizing essential oils like lavender and eucalyptus for deep relaxation.",
            "Proper skincare goes beyond surface-level treatments; it is a profound reflection of your overall health. From understanding the benefits of deep-tissue exfoliation to learning the secrets of ancient hydrotherapy techniques, treating your body with care yields restorative results. Learn how top professionals curate personalized wellness regimens for lasting vitality, inner peace, and a radiant glow.",
            "Holistic healing is about addressing the mind, body, and spirit as one connected system. Whether it is through focused reflexology that targets specific pressure points or immersive sound therapy, taking dedicated time out for self-care cannot be overstated. Explore practical, everyday techniques to bring the restorative power of a luxury spa retreat directly into your daily lifestyle."
        ];

        $title = fake()->randomElement($titles);

        return [
            'title' => $title,
            'slug' => Str::slug($title . '-' . fake()->numberBetween(100, 999)),
            'content' => fake()->randomElement($contents),
            'status' => fake()->randomElement(['2', '4']),
            'published_at' => fake()->dateTimeThisYear,
        ];
    }

    /**
     * Configure the factory to include categories and tags
     */
    public function configure()
    {
        return $this->afterCreating(function (Post $post) {
            // Attach a category
            $category = Category::inRandomOrder()->first();
            if ($category) {
                $post->categories()->attach($category);
            } else {
                // Fallback logic: Create a default category if none exist
                $defaultCategory = Category::create(['name' => 'Default Category']);
                $post->categories()->attach($defaultCategory);
            }

            // Add a tag
            $tag = Tag::inRandomOrder()->first();
            if ($tag) {
                $post->tags()->create(['name' => $tag->name]);
            } else {
                // Fallback logic: Create a default tag if none exist
                $defaultTag = Tag::create(['name' => 'Default Tag']);
                $post->tags()->create(['name' => $defaultTag->name]);
            }
        });
    }
}
