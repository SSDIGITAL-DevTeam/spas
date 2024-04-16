<?php

namespace App\Http\Resources\Therapist;

use App\Http\Resources\Cover\CoverResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TherapistResource extends JsonResource
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
            'passport_finno' => $this->whenHas('passport_finno'),
            'date_of_birth' => $this->whenHas('date_of_birth'),
            'sex' => $this->whenHas('sex'),
            'contact_no' => $this->whenHas('contact_no'),
            'nationality' => $this->whenHas('nationality'),
            'date_of_issue' => $this->whenHas('date_of_issue'),
            'address' => $this->whenHas('address'),
            'address_nearest_mrt' => $this->whenHas('address_nearest_mrt'),
            'employment_history' => $this->whenHas('employment_history'),
            'professional_certs' => $this->whenHas('professional_certs'),
            'cover' => CoverResource::make($this->whenLoaded('cover')),
            'user' => UserResource::make($this->whenLoaded('user')),
        ];
    }
}
