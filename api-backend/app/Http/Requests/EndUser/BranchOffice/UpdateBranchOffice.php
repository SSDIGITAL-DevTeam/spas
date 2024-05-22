<?php

namespace App\Http\Requests\EndUser\BranchOffice;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBranchOffice extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'branch_name' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
            'contact_number' => ['nullable', 'phone'],
            'person_name' => ['nullable', 'string'],
            'person_contact' => ['nullable', 'phone'],
            'email' => ['nullable'],
        ];
    }
}
