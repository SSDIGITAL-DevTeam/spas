<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        return [
            'title' => fake()->sentence,
            'content' => fake()->paragraph,
            'status' => fake()->randomElement(['draft', 'published']),
            'published_at' => fake()->dateTimeThisYear,
            'url' => fake()->url,
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
            $post->categories()->attach($category);

            // Add a tag
            $tag = Tag::inRandomOrder()->first();
            $post->tags()->create(['name' => $tag->name]);
        });
    }
}
