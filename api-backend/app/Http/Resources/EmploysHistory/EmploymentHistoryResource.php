<?php

namespace App\Http\Resources\EmploysHistory;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmploymentHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->when($this->id !== null, $this->id),
            'job_title' => $this->when($this->job_title !== null, $this->job_title),
            'company_name' => $this->when($this->company_name !== null, $this->company_name),
            'start_date' => $this->when($this->start_date !== null, $this->start_date),
            'end_date' => $this->when($this->end_date !== null, $this->end_date),
            'location' => $this->when($this->location !== null, $this->location),
            'description' => $this->when($this->description !== null, $this->description),
        ];
    }
}
