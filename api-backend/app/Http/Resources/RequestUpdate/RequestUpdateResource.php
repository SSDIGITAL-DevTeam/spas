<?php

namespace App\Http\Resources\RequestUpdate;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RequestUpdateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $isTherapist = $this->role === 'therapist';
        $operator = $this->role === 'operator' ? $this->operator : null;

        return [
            'id' => $this->whenHas('id'),
            'company_name' => $this->company_name ?? $operator?->company_name,
            'uen_no' => $this->uen_no ?? $operator?->uen_no,
            'brand_name' => $this->brand_name ?? $operator?->brand_name,
            'address' => $isTherapist ? $this->address_therapist : ($this->address ?? $operator?->address),
            'contact_no' => $isTherapist ? $this->contact_no_therapist : ($this->contact_no ?? $operator?->contact_no),
            'contact_person' => $this->contact_person ?? $operator?->contact_person,
            'contact_person_no' => $this->contact_person_no ?? $operator?->contact_person_no,
            'url_logo_operator' => $this->url_logo_operator ?? $operator?->cover?->url,

            'name' => $this->whenHas('name'),
            'passport_finno' => $this->whenHas('passport_finno'),
            'date_of_birth' => $this->whenHas('date_of_birth'),
            'sex' => $this->whenHas('sex'),
            'contact_no_therapist' => $this->whenHas('contact_no_therapist'),
            'nationality' => $this->whenHas('nationality'),
            'address_therapist' => $this->whenHas('address_therapist'),
            'address_nearest_mrt' => $this->whenHas('address_nearest_mrt'),
            'professional_certs' => $this->whenHas('professional_certs'),
            'name_cert' => $this->whenHas('name_cert'),
            'issuing_organization' => $this->whenHas('issuing_organization'),
            'date_of_issue' => $this->whenHas('date_of_issue'),
            'expired_date' => $this->whenHas('expired_date'),
            'credential_id' => $this->whenHas('credential_id'),
            'url_logo_therapist' => $this->whenHas('url_logo_therapist'),

            'status' => $this->whenHas('status'),
            'role' => $this->whenHas('role'),
        ];
    }
}
