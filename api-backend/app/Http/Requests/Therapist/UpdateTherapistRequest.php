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
            'url' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'name' => ['required', 'string', 'max:255'],
            'passport_finno' => ['required', 'string', 'max:255'],
            'date_of_birth' => ['required', 'date'],
            'sex' => ['required', 'in:Male,Female'],
            'contact_no' => ['required', 'string'],
            'nationality' => ['required', 'string'],
            'date_of_issue' => ['required', 'date'],
            'address' => ['required', 'string'],
            'address_nearest_mrt' => ['required', 'string'],
            'professional_certs' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'employment_history' => ['required', 'string'],
        ];
    }
}
