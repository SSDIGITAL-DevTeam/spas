<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return PostResource::collection(
            Post::with('cover', 'categories', 'tags', 'metas')
                ->filterPost(request(['search']))
                ->latest()
                ->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        // return PostResource::make(Post::created($request->validated()));
        $validatedData = $request->validated();

        $slug = Str::slug($request->title);

        $post = Post::create([
            'title' => $validatedData['title'],
            'slug' => $slug,
            'content' => $validatedData['content'],
            'status' => $validatedData['status'],
            'published_at' => now(),
        ]);

        $post->cover()->create([
            'url' => $request->file('url')->store('post-image')
        ]);

        // Create tags and attach them to the post
        $tags = $request->input('tags');
        $post->tags()->createMany($tags);

        // Create categories and attach them to the post
        $post->categories()->attach($request->input('categories'));

        $post->metas()->create([
            'key' => $request->key,
            'value' => $request->value,
            'content' => $request->content1,
        ]);

        return new PostResource($post->load('cover', 'categories', 'tags', 'metas'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): PostResource
    {
        return PostResource::make($post->load([
            'cover',
            'categories',
            'tags',
            'metas'
        ]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {

        $validatedData = $request->validated();

        $post->update($validatedData);

            if (array_key_exists('company_name', $validatedData)) {
                $post->slug = Str::slug($validatedData['company_name']);
                $post->save();
            }

        // Create tags and attach them to the post
        $tags = $request->input('tags');

        foreach ($tags as $tag) {
            $existingTag = Tag::where('name', $tag)->first();

            if (!$existingTag) {
                Tag::updateOrInsert(['name' => $tag], ['name' => $tag]);
            }
        }

        $post->tags()->sync(Tag::whereIn('name', $tags)->pluck('id'));


        // Create categories and attach them to the post
        $post->categories()->sync($request->input('categories'));

        // Update data di tabel cover
        $newFile = $request->file('url');
        // Lakukan update pada relasi cover
        if ($newFile) {
            $post->cover()->update(['url' => $newFile->store('post-image')]);
        }

        // Muat kembali relasi-relasi yang diperlukan
        $post->load('tags', 'categories', 'cover');

        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        try {
            $post->cover()->delete();
            $post->delete();

            return response()->json(['message' => 'Post deleted successfully'], 200);
        } catch (\Exception $e) {
            // Jika terjadi kesalahan saat menghapus halaman
            return response()->json(['error' => 'Failed to delete post. ' . $e->getMessage()], 500);
        }
    }
}
