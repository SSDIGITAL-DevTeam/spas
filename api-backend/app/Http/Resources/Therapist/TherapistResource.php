<?php

namespace App\Http\Resources\Therapist;

use App\Http\Resources\Cover\CoverResource;
use App\Http\Resources\EmploysHistory\EmploymentHistoryCollection;
use App\Http\Resources\EmploysHistory\EmploymentHistoryResource;
use App\Http\Resources\User\UserResource;
use App\Models\EmploymentHistory;
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
            'slug' => $this->whenHas('slug'),
            'passport_finno' => $this->whenHas('passport_finno'),
            'date_of_birth' => $this->whenHas('date_of_birth'),
            'sex' => $this->whenHas('sex'),
            'contact_no' => $this->whenHas('contact_no'),
            'nationality' => $this->whenHas('nationality'),
            'address' => $this->whenHas('address'),
            'address_nearest_mrt' => $this->whenHas('address_nearest_mrt'),
            'professional_certs' => $this->whenHas('professional_certs'),
            'name_cert' => $this->whenHas('name_cert'),
            'issuing_organization' => $this->whenHas('issuing_organization'),
            'date_of_issue' => $this->whenHas('date_of_issue'),
            'expired_date' => $this->whenHas('expired_date'),
            'credential_id' => $this->whenHas('credential_id'),
            'status' => $this->whenHas('status'),
            'cover' => CoverResource::make($this->whenLoaded('cover')),
            'user' => UserResource::make($this->whenLoaded('user')),
            'employHistorys' => EmploymentHistoryCollection::make($this->whenLoaded('employHistorys')),
        ];
    }
}
