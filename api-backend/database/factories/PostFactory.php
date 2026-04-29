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

        $title = fake()->randomElement($titles);

        return [
            'title' => $title,
            'slug' => Str::slug($title . '-' . fake()->numberBetween(100, 999)),
            'content' => "In this post, we explore why wellness is vital for your daily life. " . fake()->paragraph(4) . "\n\n" . fake()->paragraph(4),
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
