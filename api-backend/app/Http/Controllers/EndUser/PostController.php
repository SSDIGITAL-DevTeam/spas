<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return PostResource::collection(
            Post::with('cover', 'categories', 'tags', 'metas')
                ->latest()
                ->filterByCategory(request()->input('search'))
                ->paginate(10)
        );
    }

    public function show($slug): PostResource
    {
        // Find the post by slug
        $post = Post::where('slug', $slug)->first();

        // Check if the post exists
        if (!$post) {
            // Handle not found scenario, for example, return an error response
            return response()->json(['error' => 'Post not found'], 404);
        }

        // Load related data (cover, categories, tags, metas)
        $post->load([
            'cover',
            'categories',
            'tags',
            'metas'
        ]);

        // Return the post using the PostResource
        return PostResource::make($post);
    }
}
