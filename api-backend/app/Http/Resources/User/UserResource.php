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
        // Base user data
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'cover' => $this->cover_url,
        ];

        // Conditionally add operator data if present
        if ($this->operator) {
            $data['operator'] = [
                'id' => $this->operator->id,
                'company_name' => $this->operator->company_name,
                'slug' => $this->operator->slug,
                'uen_no' => $this->operator->uen_no,
                'brand_name' => $this->operator->brand_name,
                'address' => $this->operator->address,
                'contact_no' => $this->operator->contact_no,
                'contact_person' => $this->operator->contact_person,
                'contact_person_no' => $this->operator->contact_person_no,
                'status' => $this->operator->status,
                'payment_slip' => $this->operator->payment_slip,
            ];
        }

        // Conditionally add therapist data if present
        if ($this->therapist) {
            $data['therapist'] = [
                'id' => $this->therapist->id,
                'name' => $this->therapist->name,
                'slug' => $this->therapist->slug,
                'passport_finno' => $this->therapist->passport_finno,
                'date_of_birth' => $this->therapist->date_of_birth,
                'sex' => $this->therapist->sex,
                'contact_no' => $this->therapist->contact_no,
                'nationality' => $this->therapist->nationality,
                'address' => $this->therapist->address,
                'address_nearest_mrt' => $this->therapist->address_nearest_mrt,
                'professional_certs' => $this->therapist->professional_certs,
                'name_cert' => $this->therapist->name_cert,
                'issuing_organization' => $this->therapist->issuing_organization,
                'date_of_issue' => $this->therapist->date_of_issue,
                'expired_date' => $this->therapist->expired_date,
                'credential_id' => $this->therapist->credential_id,
                'status' => $this->therapist->status,
            ];
        }

        return $data;
    }
}
