<?php

namespace App\Http\Resources\Operator;

use App\Http\Resources\Cover\CoverResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OperatorResource extends JsonResource
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
            'company_name' => $this->whenHas('company_name'),
            'slug' => $this->whenHas('slug'),
            'uen_no' => $this->whenHas('uen_no'),
            'brand_name' => $this->whenHas('brand_name'),
            'address' => $this->whenHas('address'),
            'contact_no' => $this->whenHas('contact_no'),
            'contact_person' => $this->whenHas('contact_person'),
            'contact_person_no' => $this->whenHas('contact_person_no'),
            'status' => $this->whenHas('status'),
            'cover' => CoverResource::make($this->whenLoaded('cover')),
            'payment_slip' => $this->whenHas('payment_slip'),
            'user' => UserResource::make($this->whenLoaded('user')),
        ];
    }
}
