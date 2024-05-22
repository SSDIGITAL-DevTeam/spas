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
        return [
            'id' => $this->whenHas('id'),
            'company_name' => $this->whenHas('company_name'),
            'uen_no' => $this->whenHas('uen_no'),
            'brand_name' => $this->whenHas('brand_name'),
            'address' => $this->whenHas('address'),
            'contact_no' => $this->whenHas('contact_no'),
            'contact_person' => $this->whenHas('contact_person'),
            'contact_person_no' => $this->whenHas('contact_person_no'),
            'url_logo_operator' => $this->whenHas('url_logo_operator'),

            'name' => $this->whenHas('name'),
            'passport_finno' => $this->whenHas('passport_finno'),
            'date_of_birth' => $this->whenHas('date_of_birth'),
            'sex' => $this->whenHas('sex'),
            'contact_no' => $this->whenHas('contact_no'),
            'nationality' => $this->whenHas('nationality'),
            'address' => $this->whenHas('address_therapist'),
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
