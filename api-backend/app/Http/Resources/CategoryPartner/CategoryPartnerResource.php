<?php

namespace App\Http\Resources\CategoryPartner;

use App\Http\Resources\ValuePartner\ValuePartnerCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryPartnerResource extends JsonResource
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
            'name' => $this->whenHas('name'),
            'slug' => $this->whenHas('slug'),
            'value_partner' => ValuePartnerCollection::make($this->whenLoaded('valuePartners')),
        ];
    }
}
