<?php

namespace App\Http\Requests\EndUser\BranchOffice;

use Illuminate\Foundation\Http\FormRequest;

class StoreBranchOffice extends FormRequest
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
            'branch_name' => ['required', 'string'],
            'address' => ['required', 'string'],
            'contact_number' => ['required', 'phone'],
            'person_name' => ['required', 'string'],
            'person_contact' => ['required', 'phone'],
            'email' => ['nullable'],
        ];
    }
}
