<?php

namespace App\Http\Controllers\EndUser;

use App\Enums\PostStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        // $status = $request->input('status');

        $status = PostStatusEnum::tryFrom($request->integer('status', PostStatusEnum::PUBLISHED->value));

        if (!$status) {
            return new JsonResponse([
                'status' => false,
                'message' => 'Invalid post status.',
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        return PostResource::collection(
            Post::with('cover', 'categories', 'tags', 'metas')
                ->where('status', $status)
                ->latest()
                ->filterByCategory($request->input('search'))
                ->paginate(3)
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
