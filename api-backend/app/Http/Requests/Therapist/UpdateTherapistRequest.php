<?php

namespace App\Http\Requests\Therapist;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTherapistRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'url' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'name' => ['nullable', 'string', 'max:255'],
            'passport_finno' => ['nullable', 'string', 'max:255'],
            'date_of_birth' => ['nullable', 'date'],
            'sex' => ['nullable', 'in:Male,Female'],
            'contact_no' => ['nullable', 'phone'],
            'nationality' => ['nullable', 'string'],
            'date_of_issue' => ['nullable', 'date'],
            'address' => ['nullable', 'string'],
            'address_nearest_mrt' => ['nullable', 'string'],
            'professional_certs' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'name_cert' => ['nullable'],
            'issuing_organization' => ['nullable'],
            'date_of_issue' => ['nullable', 'date'],
            'expired_date' => ['nullable', 'date'],
            'credential_id' => ['nullable', 'numeric'],
            'status' => ['nullable', 'in:pending,approve'],
        ];
    }
}
