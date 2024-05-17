<?php

namespace App\Http\Requests\RequestUpdate;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequestUpdateRequest extends FormRequest
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
            // operator
            'company_name' => ['nullable', 'string', 'max:255'],
            'uen_no' => ['nullable', 'string', 'max:255', 'unique:operators,uen_no'],
            'brand_name' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'contact_no' => ['nullable', 'max:255', 'phone'],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'contact_person_no' => ['nullable', 'string', 'max:255', 'phone'],
            'url_logo_operator' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],

            // therapist
            'url_logo_therapist' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'name' => ['nullable', 'string', 'max:255'],
            'passport_finno' => ['nullable', 'string', 'max:255'],
            'date_of_birth' => ['nullable', 'date'],
            'sex' => ['nullable', 'in:Male,Female'],
            'contact_no_therapist' => ['nullable', 'max:255', 'phone'],
            'nationality' => ['nullable', 'string'],
            'address_therapist' => ['nullable', 'string'],
            'professional_certs' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'email' => ['nullable', 'email', 'unique:users,email'],
            'name_cert' => ['nullable'],
            'issuing_organization' => ['nullable'],
            'date_of_issue' => ['nullable', 'date'],
            'expired_date' => ['nullable', 'date'],
            'credential_id' => ['nullable', 'numeric'],
        ];
    }
}
