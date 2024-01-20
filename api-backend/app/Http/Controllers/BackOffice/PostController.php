<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PostResource::collection(
            Post::with('cover', 'categories', 'tags', 'metas')
                ->latest()
                ->get()
        );
    }

    /** 
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        // return PostResource::make(Post::created($request->validated()));
        $cek = $request->validated();

        // dd($cek);

        $post = Post::create($request->only(
            [
                'title',
                'slug',
                'content',
                'status',
                'published_at'
            ]
        ));

        $post->cover()->create([
            'url' => $request->file('url')->store('post-image'),
        ]);

        // Create tags and attach them to the post
        $tags = $post->tags()->createMany($request->input('tags'));
        $post->tags()->attach(array_column($tags, 'id'));

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
        return new PostResource($post->load([
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

        try {
            $post->update($request->all());

            // Create tags and attach them to the post
            $tags = $post->tags()->createMany($request->input('tags'));
            $post->tags()->attach(array_column($tags, 'id'));

            // Create categories and attach them to the post
            $post->categories()->attach($request->input('categories'));

            // Update data di tabel cover
            $post->cover()->update($request->only(['url']));

            // Muat kembali relasi-relasi yang diperlukan
            $post->load('tags', 'categories', 'cover');

            return new PostResource($post);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update post. ' . $e->getMessage()], 500);
        }
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
