<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\Tag;
use App\Traits\HttpResponses;
use Illuminate\Support\Str;

class PostController extends Controller
{
    use HttpResponses;

    public function index()
    {
        return PostResource::collection(
            Post::with(['cover', 'categories', 'tags', 'metas'])
                ->filterPost(request(['search']))
                ->latest()
                ->paginate(10)
        );
    }

    public function store(StorePostRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $post = Post::create([
                'title' => $validatedData['title'],
                'slug' => Str::slug($validatedData['title']),
                'content' => $validatedData['content'],
                'status' => $validatedData['status'],
                'published_at' => now(),
            ]);

            $post->cover()->create([
                'url' => $request->file('url')->store('post-image', 'public'),
            ]);

            $post->tags()->createMany($request->input('tags', []));

            $categoryIds = array_column($request->input('categories', []), 'category_id');
            $post->categories()->attach($categoryIds);

            $post->metas()->create([
                'key' => $request->key,
                'value' => $request->value,
                'content' => $request->content1,
            ]);

            return new PostResource($post->load(['cover', 'categories', 'tags', 'metas']));
        } catch (\Exception $e) {
            return $this->error('Failed to create post. ' . $e->getMessage(), 500);
        }
    }

    public function show(Post $post): PostResource
    {
        return PostResource::make($post->load([
            'cover',
            'categories',
            'tags',
            'metas',
        ]));
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        try {
            $validatedData = $request->validated();

            $post->update($validatedData);

            if (array_key_exists('title', $validatedData)) {
                $post->slug = Str::slug($validatedData['title']);
                $post->save();
            }

            $tagNames = array_column($request->input('tags', []), 'name');

            foreach ($tagNames as $name) {
                if (!Tag::where('name', $name)->exists()) {
                    Tag::insert(['name' => $name]);
                }
            }

            $post->tags()->sync(Tag::whereIn('name', $tagNames)->pluck('id'));

            $categoryIds = array_column($request->input('categories', []), 'category_id');
            $post->categories()->sync($categoryIds);

            $newFile = $request->file('url');
            if ($newFile) {
                $post->cover()->update(['url' => $newFile->store('post-image', 'public')]);
            }

            $post->load(['tags', 'categories', 'cover']);

            return new PostResource($post);
        } catch (\Exception $e) {
            return $this->error('Failed to update post. ' . $e->getMessage(), 500);
        }
    }

    public function destroy(Post $post)
    {
        try {
            $post->cover()->delete();
            $post->delete();

            return $this->success(null, 'Post deleted successfully.');
        } catch (\Exception $e) {
            return $this->error('Failed to delete post. ' . $e->getMessage(), 500);
        }
    }
}
