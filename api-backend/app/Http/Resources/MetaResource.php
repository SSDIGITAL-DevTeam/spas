<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MetaResource extends JsonResource
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
            'key' => $this->whenHas('key'),
            'value' => $this->whenHas('value'),
            'content' => $this->whenHas('content'),
            'metaable_type' => $this->whenHas('metaable_type'),
            'metaable_id' => $this->whenHas('metaable_id'),
        ];
    }
}
