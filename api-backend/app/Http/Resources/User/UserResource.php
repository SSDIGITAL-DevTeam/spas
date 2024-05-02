<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Operator\OperatorCollection;
use App\Http\Resources\Operator\OperatorResource;
use App\Http\Resources\Therapist\TherapistCollection;
use App\Http\Resources\Therapist\TherapistResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'covers' => $this->covers ?? [],
            'operator' => OperatorResource::make($this->whenLoaded('operator')),
            'therapist' => TherapistResource::make($this->whenLoaded('therapist')),
        ];
    }
}
