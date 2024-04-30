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
        return [
            'title' => $title = fake()->sentence,
            'slug' => Str::slug($title),
            'content' => fake()->paragraph,
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
