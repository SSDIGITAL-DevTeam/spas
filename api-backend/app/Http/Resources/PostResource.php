<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->whenHas('id'),
            'title' => $this->whenHas('title'),
            'slug' => $this->whenHas('slug'),
            'content' => $this->whenHas('content'),
            'status' => $this->whenHas('status'),
            'published_at' => $this->whenHas('published_at'),
            'cover' => [
                'id' => $this->cover->id,
                'url-image' => $this->cover->url,
            ],
            'category' => CategoryResource::collection($this->whenLoaded('category')),
            'tag' => TagResource::collection($this->whenLoaded('tag')),
            'meta' => MetaResource::collection($this->whenLoaded('meta'))
        ];
    }
}
