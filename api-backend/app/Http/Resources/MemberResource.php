<?php

namespace App\Http\Resources;

use App\Http\Resources\Cover\CoverResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);

        return [
            'id' => $this->whenHas('id'),
            'company_name' => $this->whenHas('company_name'),
            'address' => $this->whenHas('address'),
            'nirc_work_pass' => $this->whenHas('nirc_work_pass'),
            'contact_no' => $this->whenHas('contact_no'),
            'wechat_representative_id' => $this->whenHas('wechat_representative_id'),
            'company_uen_no' => $this->whenHas('company_uen_no'),
            'company_email' => $this->whenHas('company_email'),
            'name_of_representative' => $this->whenHas('name_of_representative'),
            'designation' => $this->whenHas('designation'),
            'wechat_id' => $this->whenHas('wechat_id'),
            'cover' => $this->whenLoaded('cover', function () {
                return [
                    'id' => $this->cover->id,
                    'url' => $this->cover->url,
                ];
            }),
        ];
    }
}
