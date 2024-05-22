<?php

namespace App\Http\Resources\BranchOffice;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BranchOfficeResource extends JsonResource
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
            'branch_name' => $this->whenHas('branch_name'),
            'address' => $this->whenHas('address'),
            'contact_number' => $this->whenHas('contact_number'),
            'person_name' => $this->whenHas('person_name'),
            'person_contact' => $this->whenHas('person_contact'),
            'email' => $this->whenHas('email'),
        ];
    }
}
