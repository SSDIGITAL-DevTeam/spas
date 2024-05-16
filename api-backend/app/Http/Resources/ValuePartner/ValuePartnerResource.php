<?php

namespace App\Http\Resources\ValuePartner;

use App\Http\Resources\CategoryPartner\CategoryPartnerResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ValuePartnerResource extends JsonResource
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
            'brand_name' => $this->whenHas('brand_name'),
            'slug' => $this->whenHas('slug'),
            'phone_number' => $this->whenHas('phone_number'),
            'email' => $this->whenHas('email'),
            'logo' => $this->whenHas('logo'),
            'category_partner' => CategoryPartnerResource::make($this->whenLoaded('categoryPartner')),
        ];
    }
}
